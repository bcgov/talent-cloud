import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, eachDayOfInterval, parse } from 'date-fns';
import {
  Brackets,
  DeleteResult,
  In,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { UpdatePersonnelDTO } from './dto';
import { CreateBcwsPersonnelLanguagesDTO, CreatePersonnelBcwsDTO } from './dto/bcws';
import { GetBcwsPersonnelDTO } from './dto/bcws/get-bcws-personnel.dto';
import { UpdateBcwsPersonnelDTO } from './dto/bcws/update-bcws-personnel.dto';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import {
  CreatePersonnelEmcrDTO,
  EmcrPersonnelExperienceDTO,
  GetEmcrPersonnelDTO,
  UpdateEmcrPersonnelDTO,
} from './dto/emcr';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';

import { BcwsRO } from './ro/bcws';
import { EmcrRO } from './ro/emcr';
import { Program, Role } from '../auth/interface';
import { AvailabilityType } from '../common/enums/availability-type.enum';
import { Status } from '../common/enums/status.enum';
import { datePST } from '../common/helpers';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { BcwsPersonnelEntity, LanguageEntity } from '../database/entities/bcws';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import {
  EmcrPersonnelEntity,
  EmcrExperienceEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
    @InjectRepository(BcwsPersonnelEntity)
    private bcwsPersonnelRepository: Repository<BcwsPersonnelEntity>,
    @InjectRepository(EmcrPersonnelEntity)
    private emcrPersonnelRepository: Repository<EmcrPersonnelEntity>,
    @InjectRepository(AvailabilityEntity)
    private availabilityRepository: Repository<AvailabilityEntity>,
    @InjectRepository(EmcrExperienceEntity)
    private experiencesRepository: Repository<EmcrExperienceEntity>,
    @InjectRepository(EmcrTrainingEntity)
    private trainingRepository: Repository<EmcrTrainingEntity>,
    @InjectRepository(BcwsToolsEntity)
    private toolsRepository: Repository<BcwsToolsEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    @InjectRepository(BcwsCertificationEntity)
    private cetificationRepository: Repository<BcwsCertificationEntity>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PersonnelService.name);
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
    const person = await this.personnelRepository.findOne({ where: { id } });
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
      await this.personnelRepository.save(person);
      await this.emcrPersonnelRepository.save(emcr);

      return this.getEmcrPersonnelById(role, id);
    } catch (e) {
      console.log(e);
    }
  }

    /**
   * update personnel/bcws personnel 
   * @param id 
   * @param personnel 
   * @param role 
   * @returns 
   */
    async updateBcwsPersonnel(
      id: string,
      personnel: UpdateBcwsPersonnelDTO & UpdatePersonnelDTO,
      role: Role
    ){
      this.logger.log(`Updating personnel ${id}`);
      const person = await this.personnelRepository.findOne({ where: { id } });
      const bcws = await this.bcwsPersonnelRepository.findOne({
        where: { personnel: { id } },
      });
  
      this.logger.log(`${JSON.stringify(personnel)}`);
      if (personnel.tools?.[0]?.hasOwnProperty('tool')) {
        const allTools = await this.toolsRepository.find();
        const personnelTools = personnel.tools.map((t) => ({
          toolId: allTools.find((at) => at.name === t.tool).id,
          proficiencyLevel: t.proficiencyLevel,
        }));
        personnel.tools = personnelTools;
      }

      if (personnel.languages) {
        const currentLanguages = await this.languageRepository.find({ where: { personnel: { personnelId: id } } });
        const updatedLanguageNames = personnel.languages.map((l) => l.language);
        const deletedLanguagesIds = currentLanguages.filter((cl) => !updatedLanguageNames.includes(cl.language)).map((cl) => cl.id);
        if (deletedLanguagesIds.length) {
          await this.languageRepository.delete(deletedLanguagesIds);
        }

        const currentLanguagesNames = currentLanguages.map((cl) => cl.language);
        const newLanguages = personnel.languages.filter((l) => !currentLanguagesNames.includes(l.language)).map((l) => ({
          personnelId: bcws.personnelId,
          ...l,
        }));
        await this.languageRepository.save(newLanguages);
        delete personnel.languages;
      }

      if (personnel.certifications?.[0]?.hasOwnProperty('name')) {
        const allCertifications = await this.cetificationRepository.find();
        const personnelCerts = personnel.certifications.map((c) => ({
          certificationId: allCertifications.find((ac) => ac.name === c.name).id,
          expiry: c.expiry,
        }));
        personnel.certifications = personnelCerts;
      }

      

      Object.keys(personnel).forEach((key) => {
        person[key] = personnel[key];
        bcws[key] = personnel[key];
      });
  
      try {
        // This is a 'save' rather than 'update' to allow for updating many-to-many relations
        await this.personnelRepository.save(person);
        await this.bcwsPersonnelRepository.save(bcws);
  
        return this.getBcwsPersonnelById(role, id);
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
   * create a personnel entity
   * @param personnel
   * @returns
   */
  async createPersonnel(personnel: CreatePersonnelDTO[]) {
    try {
      return await Promise.all(
        personnel.map((person: CreatePersonnelDTO) =>
          this.personnelRepository.save(
            this.personnelRepository.create(new PersonnelEntity(person)),
          ),
        ),
      );
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * create a personnel entity
   * @param personnel
   * @returns
   */
  async createOnePerson(personnel: CreatePersonnelDTO, emcrPersonnel?: CreatePersonnelEmcrDTO, bcwsPersonnel?: CreatePersonnelBcwsDTO): Promise<PersonnelEntity> {
    try {
      const alreadyExists = await this.personnelRepository.findOne({ where: { email: personnel.email } });

      if (alreadyExists) {
        this.logger.log(`Personnel with email ${personnel.email} already exists`);
        throw new BadRequestException(`Personnel with email ${personnel.email} already exists`);
      }

      const person = await this.personnelRepository.save(this.personnelRepository.create(new PersonnelEntity(personnel)))

      if(emcrPersonnel){
        const emcr = await this.createEmcerPersonnel(emcrPersonnel, person.id)
        if (emcr){
          this.logger.log(`EMCR Personnel created successfully. Personnel id: ${emcr.personnelId}`);
        }
      }

      if(bcwsPersonnel){
          const bcws  = await this.createBcwsPersonnel(bcwsPersonnel, person.id)
          if(bcws){
            this.logger.log(`BCWS Personnel created successfully. Personnel id: ${bcws.personnelId}`);
          }
        }


      return person;


    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
/**
 * Create EMCR personnel data
 * @param emcrPersonnel 
 * @param id 
 * @returns 
 */
  async createEmcerPersonnel(emcrPersonnel: CreatePersonnelEmcrDTO, id: string): Promise<EmcrPersonnelEntity> {

    emcrPersonnel.personnelId = id

    return await this.emcrPersonnelRepository.save(this.emcrPersonnelRepository.create(new EmcrPersonnelEntity((emcrPersonnel))));
  }

/**
 * Create BCWS Personnel Data
 * @param bcwsPersonnel 
 * @param id 
 * @returns 
 */
  async createBcwsPersonnel(bcwsPersonnel: CreatePersonnelBcwsDTO, id: string): Promise<BcwsPersonnelEntity> {

    bcwsPersonnel.personnelId = id;

    const languages = this.parseLanguages(bcwsPersonnel.languages, id);
    bcwsPersonnel.languages = languages;

    return await this.bcwsPersonnelRepository.save(this.bcwsPersonnelRepository.create(new BcwsPersonnelEntity((bcwsPersonnel))));
  }

/**
 * Format Languages for saving in the database
 * @param languages 
 * @param personnelId 
 * @returns 
 */
  parseLanguages(languages: Partial<CreateBcwsPersonnelLanguagesDTO>[], personnelId: string): CreateBcwsPersonnelLanguagesDTO[] {
    return languages.map(itm => ({
      personnelId,
      language: itm.language,
      level: itm.level,
      type: itm.type,
    }))
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

    this.addQueryBuilderCommonFilters(
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
      qb.andWhere(
        'location.locationName IN (:...homeLocations)',
        {
          homeLocations: query.location,
        },
      );
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
      await this.getPersonnelForProgram<EmcrPersonnelEntity>(
        Program.EMCR,
        qb,
        query.rows,
        query.page,
        query.status,
      );

    return { personnel, count };
  }

  /**
   * Get BCWS Personnel
   * Given specific queries, get associated personnel and their function experiences
   * @param query Includes pagination query, ie. page and number of rows
   * @returns {BcwsPersonnelEntity[]} List of personnel
   * @returns {number} Count of total personnel search applies to
   */
  async getBcwsPersonnel(query: GetBcwsPersonnelDTO): Promise<{
    personnel: BcwsPersonnelEntity[];
    count: {
      [Status.ACTIVE]: number;
      [Status.INACTIVE]: number;
      [Status.PENDING]: number;
    };
  }> {
    this.logger.log(`Query: ${JSON.stringify(query)}`);
    const qb =
      this.bcwsPersonnelRepository.createQueryBuilder('bcws_personnel');
    qb.leftJoinAndSelect('bcws_personnel.personnel', 'personnel');
    qb.leftJoinAndSelect('bcws_personnel.roles', 'roles');
    qb.leftJoinAndSelect('roles.role', 'role');
    qb.leftJoinAndSelect('personnel.homeLocation', 'location');

    this.addQueryBuilderCommonFilters(
      qb,
      query.name,
      query.availabilityType,
      query.availabilityFromDate,
      query.availabilityToDate,
    );

    if (query.fireCentre?.length) {
      qb.andWhere(
        'location.fireCentre IN (:...fireCentres)',
        {
          fireCentres: query.fireCentre,
        },
      );
    }
    if (query.location?.length) {
      qb.andWhere(
        'location.locationName IN (:...homeLocations)',
        {
          homeLocations: query.location,
        },
      );
    }

    if (query.role) {
      qb.andWhere('role.name = :role', {
        role: query.role,
      });
    }

    const { personnel, count } =
      await this.getPersonnelForProgram<BcwsPersonnelEntity>(
        Program.BCWS,
        qb,
        query.rows,
        query.page,
        query.status,
      );
    return { personnel, count };
  }

  /**
   * With query builder, add clauses for common fields
   * @returns {SelectQueryBuilder} Query builder with added clauses
   */
  addQueryBuilderCommonFilters<T>(
    queryBuilder: SelectQueryBuilder<T>,
    name?: string,
    availabilityType?: AvailabilityType,
    availabilityFromDate?: string,
    availabilityToDate?: string,
  ): SelectQueryBuilder<T> {
    if (name) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(personnel.firstName) LIKE LOWER(:name)', {
            name: `${name}%`,
          }).orWhere('LOWER(personnel.lastName) LIKE LOWER(:name)', {
            name: `${name}%`,
          });
        }),
      );
    }

    /**
     * If we have an availability type and a date range, we will use the date range + type
     */
    if (availabilityType) {
      queryBuilder.leftJoinAndSelect('personnel.availability', 'availability');
      queryBuilder.andWhere(
        'availability.availabilityType = :availabilityType',
        {
          availabilityType: availabilityType,
        },
      );
      if (availabilityFromDate && availabilityToDate) {
        this.logger.log(
          `Availability From Date: ${availabilityFromDate} Availability To Date: ${availabilityToDate}`,
        );

        queryBuilder.andWhere(
          'availability.date >= :from AND availability.date <= :to',
          {
            from: availabilityFromDate,
            to: availabilityToDate,
          },
        );
      } else {
        queryBuilder.andWhere('availability.date = :date', {
          date: datePST(new Date()),
        });
      }
    } else {
      queryBuilder.leftJoinAndSelect(
        'personnel.availability',
        'availability',
        'availability.date = :date',
        { date: datePST(new Date()) },
      );
    }
    return queryBuilder;
  }

  /**
   * From query builder, get personnel and counts of each status
   * @returns {T[]} List of personnel
   * @returns {number} Count of total personnel search applies to
   */
  async getPersonnelForProgram<T>(
    program: Program.EMCR | Program.BCWS,
    queryBuilder: SelectQueryBuilder<T>,
    rows: number,
    page: number,
    status: Status,
  ): Promise<{
    personnel: T[];
    count: {
      [Status.ACTIVE]: number;
      [Status.INACTIVE]: number;
      [Status.PENDING]: number;
    };
  }> {
    if (program === Program.BCWS) {
      if (status === Status.PENDING) {
        queryBuilder.orderBy('bcws_personnel.dateApplied', 'ASC');
        queryBuilder.addOrderBy('personnel.lastName', 'ASC');
        queryBuilder.addOrderBy('personnel.firstName', 'ASC');
      } else {
        queryBuilder.orderBy('bcws_personnel.dateApproved', 'DESC');
        queryBuilder.addOrderBy('personnel.lastName', 'ASC');
        queryBuilder.addOrderBy('personnel.firstName', 'ASC');
      }
    }

    if (program === Program.EMCR) {
      if (status === Status.PENDING) {
        queryBuilder.orderBy('emcr_personnel.dateApplied', 'ASC');
        queryBuilder.addOrderBy('personnel.lastName', 'ASC');
        queryBuilder.addOrderBy('personnel.firstName', 'ASC');
      } else {
        queryBuilder.orderBy('emcr_personnel.dateApproved', 'DESC');
        queryBuilder.addOrderBy('personnel.lastName', 'ASC');
        queryBuilder.addOrderBy('personnel.firstName', 'ASC');
      }
    }

    const tableName =
      program === Program.BCWS ? 'bcws_personnel' : 'emcr_personnel';
    const personnel = await queryBuilder
      .take(rows)
      .skip((page - 1) * rows)
      .andWhere(`${tableName}.status = :status`, {
        status: status,
      })
      .getMany();
    const activeCount = await queryBuilder
      .andWhere(`${tableName}.status = :status`, {
        status: Status.ACTIVE,
      })
      .getCount();
    const inactiveCount = await queryBuilder
      .andWhere(`${tableName}.status = :status`, {
        status: Status.INACTIVE,
      })
      .getCount();
    const pendingCount = await queryBuilder
      .andWhere(`${tableName}.status = :status`, {
        status: Status.PENDING,
      })
      .getCount();

    const count = {
      [Status.ACTIVE]: activeCount,
      [Status.INACTIVE]: inactiveCount,
      [Status.PENDING]: pendingCount,
    };

    return { personnel, count };
  }

  async getLastDeployedDate(id: string): Promise<string | undefined> {
    const qb = this.availabilityRepository.createQueryBuilder('availability');
    qb.where('availability.personnel = :id', { id });
    qb.andWhere('availability.availabilityType = :type', {
      type: AvailabilityType.DEPLOYED,
    });
    qb.andWhere('availability.date <= :date', { date: datePST(new Date()) });
    qb.orderBy('availability.date', 'DESC');
    qb.take(1);
    const lastDeployed = await qb.getOne();
    return lastDeployed?.date;
  }

  /**
   * Get Personnel By ID
   * Returns a default availability range of 31 days for a single personnel
   * @returns {EmcrPersonnelEntity} Single personnel
   */
  async getBcwsPersonnelById(
    role: Role,
    id: string): Promise<Record<string, BcwsRO>> {
    const person = await this.bcwsPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: ['personnel', 'roles', 'roles.role',  'certifications', 'certifications.certification',
        'tools', 'tools.tool'
      ]
    });

    const languages = await this.languageRepository.find({ where: { personnel: { personnelId: id } } });
    person.languages = languages;
    const lastDeployed = await this.getLastDeployedDate(id);
    const personnel = person.toResponseObject(role, lastDeployed);

    if (role === Role.LOGISTICS) {
      delete personnel.coordinatorNotes;
    }

    return personnel;
  }

  /**
   * Get Personnel By ID
   * Returns a default availability range of 31 days for a single personnel
   * @returns {EmcrPersonnelEntity} Single personnel
   */
  async getEmcrPersonnelById(
    role: Role,
    id: string): Promise<Record<string, EmcrRO>> {

    const person = await this.emcrPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: ['experiences', 'experiences.function', 'trainings']
    });

    const lastDeployed = await this.getLastDeployedDate(id);

    const personnel = person.toResponseObject(role, lastDeployed);
    if (role === Role.LOGISTICS) {
      delete personnel.coordinatorNotes;
    }
    return personnel;
  }

  /**
   * Get the availability of a personnel for a specific date range
   * @param id
   * @param dateRange
   * @returns
   */
  async getAvailability(
    id: string,
    query: GetAvailabilityDTO,
  ): Promise<AvailabilityEntity[]> {
    const qb = this.availabilityRepository.createQueryBuilder('availability');

    const start = parse(query.from, 'yyyy-MM-dd', new Date());

    const end = parse(query.to, 'yyyy-MM-dd', new Date());

    // We are always returning the full month, so set the start date to the first of the month and the end date to the last day of the month
    start.setDate(1);

    const endDate = new Date(end.getFullYear(), end.getMonth() + 1, 0);

    qb.where('availability.personnel = :id', { id });
    qb.andWhere(
      'availability.date >= :start AND availability.date <= :endDate',
      { start, endDate },
    );

    const availability = await qb.getMany();

    const dates = eachDayOfInterval({ start, end: endDate });

    const availableDates: AvailabilityEntity[] = dates.map(
      (date) =>
        availability.find((itm) => itm.date === format(date, 'yyyy-MM-dd')) ??
        new AvailabilityEntity({
          date: format(date, 'yyyy-MM-dd'),
          availabilityType: AvailabilityType.NOT_INDICATED,
          deploymentCode: '',
        }),
    );

    return availableDates;
  }

  async getEventStartDate(
    personnelId: string,
    date: AvailabilityEntity,
  ): Promise<string> {
    const start = await this.availabilityRepository.query(
      'SELECT get_last_status_date_prior($1, $2, $3) as start_date',
      [personnelId, date.date, date.availabilityType],
    );
    return format(start[0].start_date, 'yyyy-MM-dd');
  }

  async getEventEndDate(
    personnelId: string,
    date: AvailabilityEntity,
  ): Promise<string> {
    const end = await this.availabilityRepository.query(
      'SELECT get_last_status_date_after($1, $2, $3) as end_date',
      [personnelId, date.date, date.availabilityType],
    );
    return format(end[0].end_date, 'yyyy-MM-dd');
  }

  /**
   * Update the availability of a personnel for a specific date range for a specific avaiilability type
   * @param id
   * @param availability
   * @returns
   */
  async updateAvailability(
    id: string,
    availability: UpdateAvailabilityDTO,
  ): Promise<{
    updates: (UpdateResult | AvailabilityEntity)[];
    deleted?: DeleteResult;
  }> {
    const { from, to, type, deploymentCode, removeFrom, removeTo } =
      availability;

    const startDate = parse(from, 'yyyy-MM-dd', new Date());
    const endDate = parse(to, 'yyyy-MM-dd', new Date());

    const getQb = this.availabilityRepository
      .createQueryBuilder('availability')
      .andWhere('date >= :startDate', { startDate: from })
      .andWhere('date <= :endDate', { endDate: to })
      .andWhere('personnel = :id', { id })
      .addOrderBy('availability.date', 'ASC');
    const existingAvailability = await getQb.getMany();

    if (availability.type !== AvailabilityType.NOT_INDICATED) {
      const availabilityDates: Partial<AvailabilityEntity>[] = [];
      for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        const date = format(i, 'yyyy-MM-dd');
        const fromExisting = existingAvailability.find((a) => a.date === date);
        if (fromExisting) {
          availabilityDates.push({
            ...fromExisting,
            availabilityType: AvailabilityType[type],
            deploymentCode: deploymentCode || null,
          });
        } else {
          availabilityDates.push(
            this.availabilityRepository.create({
              date,
              availabilityType: AvailabilityType[type],
              deploymentCode: deploymentCode || null,
              personnel: { id },
            }),
          );
        }
      }

      const updatedAvail = await this.availabilityRepository.save(
        availabilityDates,
      );
      let deleted: DeleteResult;
      if (removeFrom || removeTo) {
        let deleteQb = this.availabilityRepository.createQueryBuilder();
        deleteQb = deleteQb.andWhere('personnel = :id', { id });
        deleteQb.andWhere(
          new Brackets((qb) => {
            qb.where('date < :from AND date >= :removeFrom', {
              from,
              removeFrom: removeFrom || from,
            }).orWhere('date > :to AND date <= :removeTo', {
              to,
              removeTo: removeTo || to,
            });
          }),
        );
        deleted = await deleteQb.delete().execute();
      }

      return {
        updates: updatedAvail,
        deleted,
      };
    } else {
      // Not Indicated means to delete these values
      const deleted = await this.availabilityRepository.delete(
        existingAvailability.map((a) => a.id),
      );
      return {
        updates: [],
        deleted,
      };
    }
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
   * Gets all approved BCWS members for e-diaries to pull daily
   */
  async getApprovedBCWSMembers(): Promise<
    { employeeId: number; firstName: string; lastName: string }[]
  > {
    const qb = this.personnelRepository
      .createQueryBuilder('personnel')
      .innerJoinAndSelect('personnel.bcws', 'bcws')
      .select(['personnel.firstName', 'personnel.lastName', 'bcws.employeeId'])
      .andWhere('bcws.status = :status', { status: Status.ACTIVE });
    const personnel = await qb.getMany();
    return personnel.map((p) => ({
      employeeId: p.bcws.employeeId,
      firstName: p.firstName,
      lastName: p.lastName,
    }));
  }
}
