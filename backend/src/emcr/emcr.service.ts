import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Brackets } from 'typeorm';
import {
  UpdateEmcrPersonnelDTO,
  EmcrPersonnelExperienceDTO,
  CreatePersonnelEmcrDTO,
  GetEmcrPersonnelDTO,
} from './dto';
import { EmcrRO } from './ro';
import { Role, Program } from '../auth/interface';
import { Status } from '../common/enums';
import { TravelPreference } from '../common/enums/travel-preference.enum';
import {
  EmcrPersonnelEntity,
  EmcrExperienceEntity,
  EmcrTrainingEntity,
  EmcrFunctionEntity,
} from '../database/entities/emcr';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelDTO } from '../personnel';
import { PersonnelService } from '../personnel/personnel.service';

@Injectable()
export class EmcrService {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    @InjectRepository(EmcrPersonnelEntity)
    private readonly emcrPersonnelRepository: Repository<EmcrPersonnelEntity>,
    @InjectRepository(EmcrExperienceEntity)
    private readonly experiencesRepository: Repository<EmcrExperienceEntity>,
    @InjectRepository(EmcrTrainingEntity)
    private readonly trainingRepository: Repository<EmcrTrainingEntity>,
    @InjectRepository(EmcrFunctionEntity)
    private readonly functionRepository: Repository<EmcrFunctionEntity>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(EmcrService.name);
  }

  /**
   * Find personnel by id
   * @param id
   * @returns
   */

  async updatePersonnelAfterRecommitment(id: string, status: Status) {
    const qb =
      this.emcrPersonnelRepository.createQueryBuilder('emcr_personnel');
    qb.update(EmcrPersonnelEntity)
      .set({ status })
      .where('personnel_id = :id', { id })
      .execute();
  }

  /**
   * Update a personnel entity
   * @param id
   * @param personnel
   * @returns
   */
  async updateEmcrPersonnel(
    id: string,
    personnel: UpdateEmcrPersonnelDTO & UpdatePersonnelDTO,
  ) {
    /**
     * update personnel/bcws personnel
     * @param id
     * @param personnel
     * @param role
     * @returns
     */
    this.logger.log(`Updating personnel ${id}`);
    personnel.emcr = {
      ...personnel.emcr,
      experiences: personnel.experiences,
      firstNationExperienceLiving: personnel?.firstNationExperienceLiving,
      firstNationExperienceWorking: personnel?.firstNationExperienceWorking,
      peccExperience: personnel?.peccExperience,
      preocExperience: personnel?.preocExperience,
      emergencyExperience: personnel?.emergencyExperience,
      icsTraining: personnel?.icsTraining,
      firstAidLevel: personnel?.firstAidLevel,
      firstAidExpiry: personnel?.firstAidExpiry,
      psychologicalFirstAid: personnel?.psychologicalFirstAid,
      trainings: personnel.trainings,
      logisticsNotes: personnel.logisticsNotes,
      coordinatorNotes: personnel.coordinatorNotes,
      approvedBySupervisor: personnel.approvedBySupervisor,
      dateApproved: personnel.dateApproved,
      status: personnel.status,
      firstChoiceSection: personnel.firstChoiceSection,
      secondChoiceSection: personnel.secondChoiceSection,
      thirdChoiceSection: personnel.thirdChoiceSection,
      travelPreference: personnel.travelPreference,
    };
    Object.keys(personnel.emcr).forEach((key) => {
      if (personnel.emcr[key] === undefined) {
        delete personnel.emcr[key];
      }
    });

    return await this.personnelService.updatePersonnelDatabase(id, personnel);
  }

  /**
   * Update Personnel Experiences
   * @param id
   * @param experiences
   * @param role
   * @returns
   */
  async updatePersonnelExperiences(
    id: string,
    experiences: EmcrPersonnelExperienceDTO[],
    role: Role[],
  ) {
    const experienceEntities = experiences.map((e) => ({
      functionId: e.id,
      personnelId: id,
      experienceType: e.experienceType,
    }));
    try {
      await this.experiencesRepository.delete({ personnelId: id });
      await this.experiencesRepository.save(experienceEntities);
      return this.getEmcrPersonnelById(role, id);
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Create EMCR personnel data
   * @param emcrPersonnel
   * @param id
   * @returns
   */
  async createEmcerPersonnel(
    emcrPersonnel: CreatePersonnelEmcrDTO,
    id: string,
  ): Promise<EmcrPersonnelEntity> {
    emcrPersonnel.personnelId = id;

    return await this.emcrPersonnelRepository.save(
      this.emcrPersonnelRepository.create(
        new EmcrPersonnelEntity(emcrPersonnel),
      ),
    );
  }

  /**
   * Get EMCR Personnel
   * Given specific queries, get associated personnel and their function experiences
   * @param query Includes pagination query, ie. page and number of rows
   * @returns {EmcrPersonnelEntity[]} List of personnel
   * @returns {number} Count of total personnel search applies to
   */
  async getEmcrPersonnel(query: GetEmcrPersonnelDTO): Promise<{
    personnel: EmcrPersonnelEntity[];
    count: {
      [Status.ACTIVE]: number;
      [Status.INACTIVE]: number;
      [Status.PENDING]: number;
    };
  }> {
    const qb =
      this.emcrPersonnelRepository.createQueryBuilder('emcr_personnel');
    this.logger.log(`Query: ${JSON.stringify(query)}`);
    qb.leftJoinAndSelect('emcr_personnel.personnel', 'personnel');
    qb.leftJoinAndSelect('emcr_personnel.experiences', 'experiences');
    qb.leftJoinAndSelect('emcr_personnel.trainings', 'trainings');
    qb.leftJoinAndSelect('experiences.function', 'function');
    qb.leftJoinAndSelect('personnel.homeLocation', 'location');
    qb.leftJoinAndSelect('personnel.recommitment', 'recommitment');
    qb.leftJoinAndSelect('recommitment.recommitmentCycle', 'recommitmentCycle');

    await this.personnelService.addQueryBuilderCommonFilters(
      qb,
      query.name,
      query.availabilityType,
      query.availabilityFromDate,
      query.availabilityToDate,
      query.availableStatus,
      Program.EMCR,
    );

    if (query.region?.length && !query.location?.length) {
      qb.andWhere('location.region IN (:...regions)', {
        regions: query.region,
      });
    } else if (query.location?.length) {
      if (!query.includeTravel) {
        qb.andWhere('location.locationName IN (:...homeLocations)', {
          homeLocations: query.location,
        });
      } else {
        qb.andWhere('emcr_personnel.travelPreference != :remoteOnly', {
          remoteOnly: TravelPreference.REMOTE_ONLY,
        });
        qb.andWhere(
          new Brackets((inner) => {
            inner.orWhere('location.locationName IN (:...homeLocations)', {
              homeLocations: query.location,
            });
            inner.orWhere('emcr_personnel.travelPreference = :travelAnywhere', {
              travelAnywhere: TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
            });
            inner.orWhere(
              '(emcr_personnel.travelPreference = :travelRegion AND location.region IN (:...regions))',
              {
                travelRegion: TravelPreference.WILLING_TO_TRAVEL_REGION,
                regions: query.region,
              },
            );
          }),
        );
      }
    }

    if (query.function) {
      if (query.experience) {
        qb.andWhere('experiences.experienceType = :experienceType', {
          experienceType: query.experience,
        });
      }
      qb.andWhere('function.name = :function', {
        function: query.function,
      });
    }

    const { personnel, count } =
      await this.personnelService.getPersonnelForProgram<EmcrPersonnelEntity>(
        Program.EMCR,
        qb,
        query.rows,
        query.page,
        query.status,
      );
    personnel.forEach((person) => {
      if (person.personnel.recommitment) {
        person.personnel.recommitment = person?.personnel?.recommitment?.filter(
          (itm) => itm.program === Program.EMCR,
        );
      }
    });
    return { personnel, count };
  }
  /**
   * Get Personnel By ID
   * Returns a default availability range of 31 days for a single personnel
   * @returns {EmcrPersonnelEntity} Single personnel
   */
  async getEmcrPersonnelById(
    role: Role[],
    id: string,
  ): Promise<Record<string, EmcrRO>> {
    const person = await this.personnelService.findOne(id);
    const emcr = await this.emcrPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: [
        'experiences',
        'experiences.function',
        'trainings',
        'personnel',
        'personnel.languages',
        'personnel.tools',
        'personnel.certifications',
        'personnel.recommitment',
        'personnel.recommitment.recommitmentCycle',
      ],
    });

    const lastDeployed = await this.personnelService.getLastDeployedDate(id);
    emcr.personnel = person;

    return emcr.toResponseObject(role, lastDeployed);
  }
  async getTrainingsByNames(names: string[]): Promise<EmcrTrainingEntity[]> {
    const trainings = await this.trainingRepository.find({
      where: { name: In(names) },
    });
    if (trainings.length !== names.length) {
      throw new NotFoundException({
        message: 'Not all training names exist in our database',
      });
    }
    return trainings;
  }

  /**
   * Get all functions
   * No query parameters for now
   * @returns {EmcrFunctionEntity[]} List of functions
   */
  async getFunctions(): Promise<EmcrFunctionEntity[]> {
    return this.functionRepository.find();
  }
}
