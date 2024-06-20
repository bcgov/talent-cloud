import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  UpdateEmcrPersonnelDTO,
  EmcrPersonnelExperienceDTO,
  CreatePersonnelEmcrDTO,
  GetEmcrPersonnelDTO,
} from './dto';
import { EmcrRO } from './ro';
import { Role, Program } from '../auth/interface';
import { Status } from '../common/enums';
import {
  EmcrPersonnelEntity,
  EmcrExperienceEntity,
  EmcrTrainingEntity,
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
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(EmcrService.name);
  }

  /**
   * Update a personnel entity
   * @param id
   * @param personnel
   * @returns
   */
  async updatePersonnel(
    id: string,
    personnel: UpdateEmcrPersonnelDTO & UpdatePersonnelDTO,
    role: Role,
  ) {
    this.logger.log(`Updating personnel ${id}`);
    const person = await this.personnelService.findOne(id);
    const emcr = await this.emcrPersonnelRepository.findOne({
      where: { personnel: { id } },
    });

    this.logger.log(`${JSON.stringify(personnel)}`);

    Object.keys(personnel).forEach((key) => {
      person[key] = personnel[key];
      emcr[key] = personnel[key];
    });

    try {
      // This is a 'save' rather than 'update' to allow for updating many-to-many relations
      await this.personnelService.save(person);
      await this.emcrPersonnelRepository.save(emcr);

      return this.getEmcrPersonnelById(role, id);
    } catch (e) {
      console.log(e);
    }
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
    role: Role,
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

    this.personnelService.addQueryBuilderCommonFilters(
      qb,
      query.name,
      query.availabilityType,
      query.availabilityFromDate,
      query.availabilityToDate,
    );

    if (query.region?.length) {
      qb.andWhere('location.region IN (:...regions)', {
        regions: query.region,
      });
    }
    if (query.location?.length) {
      qb.andWhere('location.locationName IN (:...homeLocations)', {
        homeLocations: query.location,
      });
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

    return { personnel, count };
  }
  /**
   * Get Personnel By ID
   * Returns a default availability range of 31 days for a single personnel
   * @returns {EmcrPersonnelEntity} Single personnel
   */
  async getEmcrPersonnelById(
    role: Role,
    id: string,
  ): Promise<Record<string, EmcrRO>> {
    const person = await this.emcrPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: ['experiences', 'experiences.function', 'trainings'],
    });

    const lastDeployed = await this.personnelService.getLastDeployedDate(id);

    return person.toResponseObject(role, lastDeployed);
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
}
