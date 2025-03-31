import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Brackets, UpdateResult } from 'typeorm';
import {
  CreatePersonnelEmcrDTO,
  GetEmcrPersonnelDTO,
  UpdateEmcrPersonnelDTO,
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
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelService } from '../personnel/personnel.service';
import { UpdateEmcrExperiencesDTO } from './dto/update-emcr-experiences.dto';
import { LocationEntity } from '../database/entities/location.entity';

@Injectable()
export class EmcrService {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    @InjectRepository(EmcrPersonnelEntity)
    private readonly emcrPersonnelRepository: Repository<EmcrPersonnelEntity>,
    @InjectRepository(EmcrTrainingEntity)
    private readonly trainingRepository: Repository<EmcrTrainingEntity>,
    @InjectRepository(EmcrFunctionEntity)
    private readonly functionRepository: Repository<EmcrFunctionEntity>,
    @InjectRepository(AvailabilityEntity)
    private readonly availabilityRepository: Repository<AvailabilityEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(EmcrService.name);
  }

  /**
   * Update personnel after recommitment
   * @param id
   * @param status
   */
  async updatePersonnelAfterRecommitment(
    ids: string[],
    status: Status,
  ): Promise<UpdateResult> {
    return await this.emcrPersonnelRepository
      .createQueryBuilder()
      .update(EmcrPersonnelEntity)
      .set({ status })
      .where('personnel_id IN (:...ids)', { ids })
      .execute();
  }
  /**
   *
   * @param trainings
   * @param id
   * @returns
   */
  async updateTraining(
    trainings: Partial<EmcrTrainingEntity>[],
    id: string,
  ): Promise<EmcrTrainingEntity[]> {
    const emcrPerson = await this.emcrPersonnelRepository.findOneByOrFail({
      personnelId: id,
    });
    emcrPerson.trainings = trainings.map(
      (training) => new EmcrTrainingEntity(training),
    );
    const updatedPerson = await this.emcrPersonnelRepository.save(emcrPerson);
    return updatedPerson.trainings;
  }
  /**
   * Update EMCR Personnel
   * @param emcrPerson
   * @param id
   */
  async updateEmcrPersonnel(
    emcrPerson: UpdateEmcrPersonnelDTO,
    id: string,
  ): Promise<UpdateResult> {
    return await this.emcrPersonnelRepository.update(id, emcrPerson);
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
    experiences: UpdateEmcrExperiencesDTO[],
  ): Promise<EmcrExperienceEntity[]> {
    const experienceEntities = experiences.map(
      (e) =>
        new EmcrExperienceEntity({
          functionId: e.id,
          personnelId: id,
          experienceType: e.experienceType,
        }),
    );

    const personnel = await this.emcrPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: ['experiences'],
    });
    personnel.experiences = experienceEntities;
    try {
      await this.emcrPersonnelRepository.save(personnel);
      return personnel.experiences;
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
   * Get EMCR Personnel for CSV Export
   * Extracts full raw JSON list of all EMCR-flagged personnel
   * and associated table columns for export to CSV file
   * @returns {Entity[]} Merged TypeORM list of personnel, converted to JSON string
   */
  async getEmcrPersonnelForExport(): Promise<EmcrPersonnelEntity[]> {
    const qb =
      this.emcrPersonnelRepository.createQueryBuilder('emcr_personnel');
    qb.leftJoinAndSelect('emcr_personnel.personnel', 'personnel');
    qb.leftJoinAndSelect(
      'personnel.recommitment',
      'recommitment',
      `recommitment.program = 'emcr'`,
    );
    qb.leftJoinAndSelect('recommitment.recommitmentCycle', 'recommitmentCycle');

    const personnel = await qb.getRawMany();

    const lastDeployeds = await this.availabilityRepository.query(`SELECT 
    personnel,
    MAX(date) AS last_deployed_date
    FROM 
        availability
    WHERE 
        availability_type = 'DEPLOYED'
    GROUP BY 
    personnel;`);

    const locations = await this.locationRepository
      .createQueryBuilder('location')
      .getRawMany();

    const lastDeployedMap = lastDeployeds.reduce(
      (
        acc: Record<string, Date>,
        entry: { personnel: string; last_deployed_date: Date },
      ) => {
        acc[entry.personnel] = entry.last_deployed_date;
        return acc;
      },
      {},
    );
    const locationMap = locations.reduce(
      (acc: Record<number, Omit<LocationEntity, 'id'>>, location) => {
        const { location_id, ...rest } = location;
        acc[location_id] = rest;
        return acc;
      },
      {},
    );
    const mappedPersonnel = personnel.map((p) => ({
      ...p,
      last_deployed: lastDeployedMap[p.personnel_id],
      home_loc_location_name:
        locationMap[p.personnel_home_location]?.['location_location_name'] ||
        '',
      home_loc_region:
        locationMap[p.personnel_home_location]?.['location_region'] || '',
      work_loc_location_name:
        locationMap[p.personnel_work_location]?.['location_location_name'] ||
        '',
      work_loc_region:
        locationMap[p.personnel_work_location]?.['location_region'] || '',
    }));

    return mappedPersonnel;
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
