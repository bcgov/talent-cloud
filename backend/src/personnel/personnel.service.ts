import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { format, eachDayOfInterval, parse, differenceInDays } from 'date-fns';
import {
  Brackets,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { UpdatePersonnelDTO } from './dto';
import { GetAvailabilityDTO } from './dto/availability/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/availability/update-availability.dto';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { AvailabilityRO, PersonnelRO } from './ro';
import { UpdatePreferencesDTO } from './update-preferences.dto';
import { Program, RequestWithRoles } from '../auth/interface';
import { sampleData, sampleTrainingData } from '../common/chips/sample-data';
import { ChipsMinistryName, Ministry, Section } from '../common/enums';
import {
  AvailabilityType,
  AvailabilityTypeLabel,
} from '../common/enums/availability-type.enum';
import { AvailabilityTypeStatus, Status } from '../common/enums/status.enum';
import { datePST } from '../common/helpers';
import { CreatePersonnelLanguagesDTO } from './dto/skills/create-personnel-languages.dto';
import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { EmcrExperienceEntity } from '../database/entities/emcr';
import { UpdatePersonnelDetailsDTO } from './dto/details/update-personnel-details.dto';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { AppLogger } from '../logger/logger.service';
import { UpdateSkillsDTO } from './dto/skills/update-personnel-skills.dto';
import { UpdateSupervisorInformationDTO } from './dto/supervisor/update-supervisor.dto';
import {
  ChipsResponse,
  mapToChipsResponse,
  mapToChipsTrainingResponse,
} from '../common/chips/chips-response';
import { RegionsAndLocationsService } from '../region-location/region-location.service';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
    @InjectRepository(AvailabilityEntity)
    private availabilityRepository: Repository<AvailabilityEntity>,
    @InjectRepository(ToolsEntity)
    private toolsRepository: Repository<ToolsEntity>,
    @InjectRepository(CertificationEntity)
    private certificationRepository: Repository<CertificationEntity>,
    @Inject(RegionsAndLocationsService)
    private regionsAndLocationsService: RegionsAndLocationsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PersonnelService.name);
  }
  /**
   * Update Supervisor Information
   * @param id
   * @returns
   */

  async updatePersonnelSupervisorInformation(
    id: string,
    supervisorInformation: UpdateSupervisorInformationDTO,
  ): Promise<UpdateResult> {
    return await this.personnelRepository.update(id, supervisorInformation);
  }
  /**
   * Find personnel by id
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<PersonnelEntity> {
    const person = await this.personnelRepository.findOneOrFail({
      where: { id },
      relations: [
        'certifications',
        'certifications.certification',
        'tools',
        'tools.tool',
        'homeLocation',
        'workLocation',
        'recommitment',
        'recommitment.recommitmentCycle',
        'languages',
      ],
    });

    return person;
  }

  /**
   * Find personnel by id
   * @param id
   * @returns
   */
  async findOneByEmail(email: string): Promise<PersonnelEntity> {
    return this.personnelRepository.findOne({
      where: { email },
      relations: ['emcr', 'bcws'],
    });
  }

  async findOneById(id: string): Promise<PersonnelEntity> {
    return this.personnelRepository.findOne({
      where: { id },
      relations: ['emcr', 'bcws'],
    });
  }

  /**
   * Save personnel data
   * @param person
   * @returns
   */
  async save(person: PersonnelEntity) {
    return await this.personnelRepository.save(person);
  }

  /**
   * create a personnel entity
   * @param personnel
   * @returns
   */
  async createPersonnel(personnel: CreatePersonnelDTO[]) {
    try {
      return await Promise.all(
        personnel.map((person: CreatePersonnelDTO) => {
          const personEntity = this.personnelRepository.create(
            new PersonnelEntity(person),
          );
          const languages = this.parseLanguages(
            person.languages,
            personEntity.id,
          );

          this.personnelRepository.save({ ...personEntity, languages });
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }

  async updatePersonnelSkills(
    updateDTO: UpdateSkillsDTO,
    id: string,
  ): Promise<PersonnelEntity> {
    const person = await this.personnelRepository.findOne({
      where: { id },
      relations: {
        languages: updateDTO.languages ? true : false,
        certifications: updateDTO.certifications ? true : false,
        tools: updateDTO.tools ? true : false,
      },
    });

    if (updateDTO.certifications) {
      const certs = await this.certificationRepository.find();
      updateDTO.certifications = updateDTO.certifications.map((itm) => ({
        certificationId: certs.find((cert) => itm.name === cert.name).id,
        personnelId: person.id,
        expiry: itm.expiry,
      }));
    }

    if (updateDTO.tools) {
      const tools = await this.toolsRepository.find();
      updateDTO.tools = updateDTO.tools.map((itm) => ({
        proficiencyLevel: itm.proficiencyLevel,
        toolId: tools.find((tool) => itm.tool === tool.name).id,
        personnelId: person.id,
      }));
    }

    if (updateDTO.languages) {
      updateDTO.languages = updateDTO.languages.map(
        (itm) => new LanguageEntity(itm),
      );
    }
    return await this.personnelRepository.save({ ...person, ...updateDTO });
  }

  async updatePersonnelPreferences(
    preferences: UpdatePreferencesDTO,
    req: RequestWithRoles,
  ): Promise<PersonnelEntity> {
    const person = await this.personnelRepository.findOne({
      where: { email: req.idir },
      relations: {
        bcws: preferences.bcws?.roles
          ? {
              roles: true,
            }
          : false,
        emcr: preferences.emcr?.experiences
          ? {
              experiences: true,
            }
          : false,
      },
    });

    if (preferences?.bcws) {
      preferences.bcws.roles = preferences.bcws.roles.map((role) => ({
        ...role,
        roleId: role.roleId,
        personnelId: person.id,
      }));

      preferences.bcws.firstChoiceSection =
        Section[preferences.bcws.firstChoiceSection as keyof typeof Section] ??
        null;
      preferences.bcws.secondChoiceSection =
        Section[preferences.bcws.secondChoiceSection as keyof typeof Section] ??
        null;
      preferences.bcws.thirdChoiceSection =
        Section[preferences.bcws.thirdChoiceSection as keyof typeof Section] ??
        null;
    }

    if (preferences?.emcr) {
      preferences.emcr.experiences = preferences.emcr.experiences.map(
        (e) =>
          new EmcrExperienceEntity({
            functionId: e.id,
            personnelId: person.id,
            experienceType: e.experienceType,
          }),
      );

      preferences.emcr.firstChoiceSection =
        preferences.emcr.firstChoiceSection ?? null;
      preferences.emcr.secondChoiceSection =
        preferences.emcr.secondChoiceSection ?? null;
      preferences.emcr.thirdChoiceSection =
        preferences.emcr.thirdChoiceSection ?? null;
    }

    const bcwsPerson = { ...person.bcws, ...preferences.bcws };
    const emcrPerson = { ...person.emcr, ...preferences.emcr };
    if (person.emcr && person.bcws) {
      return await this.personnelRepository.save({
        ...person,
        bcws: bcwsPerson,
        emcr: emcrPerson,
      });
    } else if (person.bcws && !person.emcr) {
      return await this.personnelRepository.save({
        ...person,
        bcws: bcwsPerson,
      });
    } else if (person.emcr && !person.bcws) {
      return await this.personnelRepository.save({
        ...person,
        emcr: emcrPerson,
      });
    }
  }

  async updatePersonnelDetails(
    updateDTO: UpdatePersonnelDetailsDTO,
    id: string,
  ): Promise<UpdateResult> {
    const person = await this.personnelRepository.findOne({
      where: { id },
      relations: {
        homeLocation: updateDTO.homeLocation ? true : false,
        workLocation: updateDTO.workLocation ? true : false,
      },
    });

    return await this.personnelRepository.update(person.id, updateDTO);
  }

  async updatePersonnel(
    updateDTO: UpdatePersonnelDTO,
    req: RequestWithRoles,
    id: string,
  ): Promise<Record<'Member', PersonnelRO>> {
    const person = await this.personnelRepository.findOne({
      where: { id },
      relations: {
        bcws: updateDTO.bcws ? true : false,
        emcr: updateDTO.emcr
          ? {
              trainings: true,
            }
          : false,
        homeLocation: updateDTO.homeLocation ? true : false,
        workLocation: updateDTO.workLocation ? true : false,
      },
    });

    await this.personnelRepository.save({
      ...person,
      ...updateDTO,
    });

    return await this.findOneById(id).then((person) =>
      person.toResponseObject(req.roles),
    );
  }
  /**
   * Format Languages for saving in the database
   * @param languages
   * @param personnelId
   * @returns
   */
  parseLanguages(
    languages: Partial<CreatePersonnelLanguagesDTO>[],
    personnelId: string,
  ): CreatePersonnelLanguagesDTO[] {
    return languages.map((itm) => ({
      personnelId,
      language: itm.language,
      level: itm.level,
      type: itm.type,
    }));
  }
  /**
   * create a personnel entity
   * @param personnel
   * @returns
   */
  async createOnePerson(
    personnel: CreatePersonnelDTO,
  ): Promise<PersonnelEntity> {
    try {
      const alreadyExists = await this.personnelRepository.findOne({
        where: { email: personnel.email },
      });

      if (alreadyExists) {
        this.logger.log(
          `Personnel with email ${personnel.email} already exists`,
        );
        throw new BadRequestException(
          `Personnel with email ${personnel.email} already exists`,
        );
      }

      const person = await this.personnelRepository.save(
        this.personnelRepository.create(new PersonnelEntity(personnel)),
      );

      return person;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * With query builder, add clauses for common fields
   * @returns {SelectQueryBuilder} Query builder with added clauses
   */
  async addQueryBuilderCommonFilters<T>(
    queryBuilder: SelectQueryBuilder<T>,
    name?: string,
    availabilityType?: AvailabilityTypeLabel,
    availabilityFromDate?: string,
    availabilityToDate?: string,
    availableStatus?: AvailabilityTypeStatus,
    program?: Program,
  ): Promise<SelectQueryBuilder<T>> {
    if (availableStatus && availableStatus === AvailabilityTypeStatus.NEW) {
      if (program === Program.BCWS) {
        queryBuilder.andWhere(
          `bcws_personnel.dateApproved > current_date - interval '5' day `,
        );
      } else if (program === Program.EMCR) {
        queryBuilder.andWhere(
          `emcr_personnel.dateApproved > current_date - interval '5' day`,
        );
      } else {
        queryBuilder.andWhere(
          `bcws_personnel.dateApproved > current_date - interval '5' day OR emcr_personnel.dateApproved > current_date - interval '5' day`,
        );
      }
    } else if (
      availableStatus &&
      availableStatus === AvailabilityTypeStatus.MISSED
    ) {
      queryBuilder.andWhere('recommitment.program = :program', {
        program,
      });
      queryBuilder.andWhere('recommitment.year = :year', {
        year: new Date().getFullYear(),
      });
      queryBuilder.andWhere('recommitment.status in (:...recommitmentStatus)', {
        recommitmentStatus: [
          RecommitmentStatus.MEMBER_NO_RESPONSE,
          RecommitmentStatus.SUPERVISOR_NO_RESPONSE,
        ],
      });
    } else if (
      availableStatus &&
      availableStatus === AvailabilityTypeStatus.NOT_RETURNING
    ) {
      queryBuilder.andWhere('recommitment.program = :program', {
        program,
      });
      queryBuilder.andWhere('recommitment.year = :year', {
        year: new Date().getFullYear(),
      });
      queryBuilder.andWhere('recommitment.status in (:...recommitmentStatus)', {
        recommitmentStatus: [
          RecommitmentStatus.SUPERVISOR_DENIED,
          RecommitmentStatus.MEMBER_DENIED,
        ],
      });
    } else if (
      availableStatus &&
      availableStatus !== AvailabilityTypeStatus.ALL
    ) {
      queryBuilder.andWhere('recommitment.program = :program', {
        program,
      });
      queryBuilder.andWhere('recommitment.year = :year', {
        year: new Date().getFullYear(),
      });
      queryBuilder.andWhere('recommitment.status = :availableStatus', {
        availableStatus:
          RecommitmentStatus[
            availableStatus as keyof typeof RecommitmentStatus
          ],
      });
    }

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
    this.logger.log(`Availability Type: ${availabilityType}`);
    /**
     * If we have an availability type and a date range, we will use the date range + type
     */

    if (
      [
        AvailabilityTypeLabel.UNAVAILABLE,
        AvailabilityTypeLabel.DEPLOYED,
      ].includes(availabilityType)
    ) {
      queryBuilder.leftJoinAndSelect('personnel.availability', 'availability');
      queryBuilder.andWhere(
        'availability.availabilityType = :availabilityType',
        {
          availabilityType:
            AvailabilityType[availabilityType as keyof typeof AvailabilityType],
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
    } else if (availabilityType === AvailabilityTypeLabel.AVAILABLE) {
      const start = parse(availabilityFromDate, 'yyyy-MM-dd', new Date());
      const end = parse(availabilityToDate, 'yyyy-MM-dd', new Date());

      this.logger.log(`Availability From Date: ${start}`);
      this.logger.log(`Availability From Date: ${end}`);
      this.logger.log(
        `Difference In Days: ${differenceInDays(
          availabilityToDate,
          availabilityFromDate,
        )}`,
      );

      if (differenceInDays(availabilityToDate, availabilityFromDate) >= 1) {
        const allAvailable =
          this.availabilityRepository.createQueryBuilder('availability');
        allAvailable.select('personnel');
        allAvailable.where(
          'availability.date >= :from AND availability.date <= :to',
          {
            from: start,
            to: end,
          },
        );
        allAvailable.groupBy('personnel');

        // If we are searching for 6 days, exclude anyone who is unavailable for half (6/2 = 3) days or more of the 6 days searched
        // differenceInDays + 1 because the function does not seem inclusive of the last day; makes sense if it's 00:00
        allAvailable.having('count(*) >= :numDays', {
          numDays: differenceInDays(availabilityToDate, availabilityFromDate),
        });

        queryBuilder
          .andWhere(
            `personnel.id not IN (${allAvailable.getQuery()})`,
            allAvailable.getParameters(),
          )
          .andWhere('personnel.availability_confirmed_until > :date', {
            date: end,
          });

        queryBuilder.leftJoinAndSelect(
          'personnel.availability',
          'availability',
          'availability.date >= :from AND availability.date <= :to',
          {
            from: start,
            to: end,
          },
        );
      } else {
        this.logger.log('Availability Query - Available - Today');
        const allAvailable =
          this.availabilityRepository.createQueryBuilder('availability');
        allAvailable.select('personnel');
        allAvailable.andWhere('availability.date = :date', {
          date: start,
        });

        queryBuilder
          .where(
            `personnel.id not IN (${allAvailable.getQuery()})`,
            allAvailable.getParameters(),
          )
          .andWhere('personnel.availabilityConfirmedUntil > :date', {
            date: end,
          });
      }
    } else {
      this.logger.log('Availability Query - No Type Specified');
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
      } else if (status === Status.ACTIVE) {
        queryBuilder.addSelect(
          `CASE WHEN bcws_personnel.dateApproved > current_date - interval '5' day THEN bcws_personnel.dateApproved ELSE null END`,
          'new_member',
        );
        queryBuilder.addOrderBy('new_member', 'ASC');
        queryBuilder.addOrderBy('personnel.lastName', 'ASC');
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
      } else if (status === Status.ACTIVE) {
        queryBuilder.addSelect(
          `CASE WHEN emcr_personnel.dateApproved > current_date - interval '5' day THEN emcr_personnel.dateApproved ELSE null END`,
          'new_member',
        );
        queryBuilder.addOrderBy('new_member', 'ASC');
        queryBuilder.addOrderBy('personnel.lastName', 'ASC');
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
   * Get the availability of a personnel for a specific date range
   * @param id
   * @param dateRange
   * @returns
   */
  async getAvailability(
    id: string,
    query: GetAvailabilityDTO,
  ): Promise<AvailabilityRO[]> {
    const personnel = await this.personnelRepository.findOneByOrFail({ id });
    const qb = this.availabilityRepository.createQueryBuilder('availability');

    const start = parse(query.from, 'yyyy-MM-dd', new Date());
    this.logger.log(`Availability From Date: ${start}`);
    const end = parse(query.to, 'yyyy-MM-dd', new Date());
    this.logger.log(`Availability From Date: ${end}`);
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

    const availableDates: AvailabilityRO[] = dates.map(
      (date) =>
        availability
          .find((itm) => itm.date === format(date, 'yyyy-MM-dd'))
          ?.toResponseObject() ?? {
          date: format(date, 'yyyy-MM-dd'),
          availabilityType:
            new Date(personnel.availabilityConfirmedUntil) >= new Date(date)
              ? AvailabilityTypeLabel.AVAILABLE
              : AvailabilityTypeLabel.NOT_INDICATED,
          deploymentCode: '',
        },
    );
    return availableDates;
  }

  async getEventStartDate(
    personnelId: string,
    date: AvailabilityRO,
  ): Promise<string> {
    const start = await this.availabilityRepository.query(
      'SELECT get_last_status_date_prior($1, $2, $3) as start_date',
      [personnelId, date.date, date.availabilityType],
    );
    return format(start[0].start_date, 'yyyy-MM-dd');
  }

  async getEventEndDate(
    personnelId: string,
    date: AvailabilityRO,
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

    if (type) {
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

  /**
   * Gets all approved BCWS members for e-diaries to pull daily
   */
  async getApprovedBCWSMembers(): Promise<
    { employeeId: string; firstName: string; lastName: string }[]
  > {
    const qb = this.personnelRepository
      .createQueryBuilder('personnel')
      .innerJoinAndSelect('personnel.bcws', 'bcws')
      .select([
        'personnel.firstName',
        'personnel.lastName',
        'personnel.employeeId',
      ])
      .andWhere('bcws.status = :status', { status: Status.ACTIVE });
    const personnel = await qb.getMany();
    return personnel.map((p) => ({
      employeeId: p.employeeId,
      firstName: p.firstName,
      lastName: p.lastName,
    }));
  }
  /**
   * Returns the personnel data for the profile view
   * @param req
   * @returns
   */
  async getPersonnel(
    req: RequestWithRoles,
  ): Promise<Record<'Member', PersonnelRO>> {
    const qb = this.personnelRepository
      .createQueryBuilder('personnel')
      .leftJoinAndSelect('personnel.workLocation', 'workLocation')
      .leftJoinAndSelect('personnel.homeLocation', 'homeLocation')
      .leftJoinAndSelect('personnel.languages', 'languages')
      .leftJoinAndSelect('personnel.certifications', 'certifications')
      .leftJoinAndSelect('certifications.certification', 'certification')
      .leftJoinAndSelect('personnel.tools', 'tools')
      .leftJoinAndSelect('tools.tool', 'tool')
      .leftJoinAndSelect('personnel.recommitment', 'recommitment')
      .leftJoinAndSelect('recommitment.recommitmentCycle', 'recommitmentCycle')
      .leftJoinAndSelect('personnel.bcws', 'bcws')
      .leftJoinAndSelect('bcws.roles', 'roles')

      .leftJoinAndSelect('roles.role', 'role')
      .leftJoinAndSelect('personnel.emcr', 'emcr')
      .leftJoinAndSelect('emcr.experiences', 'experiences')

      .leftJoinAndSelect('experiences.function', 'function');

    qb.where('LOWER(personnel.email) = :email', {
      email: req.idir.toLowerCase(),
    });

    const personnelData = await qb.getOne();
    this.logger.log(`User is a member`);
    return personnelData?.toResponseObject(req.roles);
  }

  async verifyMemberOrSupervisor(
    email: string,
  ): Promise<{ isMember: boolean; isSupervisor: boolean }> {
    const qb = this.personnelRepository.createQueryBuilder('personnel');
    qb.where('LOWER(personnel.email) = :email', {
      email: email.toLowerCase(),
    }).orWhere('LOWER(personnel.supervisorEmail) = :supervisorEmail', {
      supervisorEmail: email.toLowerCase(),
    });
    const people = await qb.getMany();
    const isMember = people
      .map((itm) => itm.email.toLowerCase())
      .includes(email.toLowerCase());
    const isSupervisor = people
      .map((itm) => itm.supervisorEmail?.toLowerCase())
      .includes(email.toLowerCase());

    return {
      isMember,
      isSupervisor,
    };
  }

  /**
   * Returns certifications that are not OFA I, II, or III
   * Used by CHEFS form
   * @returns {CertificationEntity[]} List of certifications
   *
   */
  async getCertificates(
    filterCommonCerts: boolean,
  ): Promise<CertificationEntity[]> {
    const certificates = await this.certificationRepository.find();
    if (!filterCommonCerts) {
      return certificates;
    } else {
      // filter out the OFA I, II, and III certifications and the PFA certification as these are listed separately on the CHEFS form
      return certificates.filter((itm) => ![2, 8, 9, 10].includes(itm.id));
    }
  }

  /**
   * Returns all tools
   * Used by CHEFS form
   * @returns {ToolsEntity[]} List of tools
   */
  async getTools(): Promise<ToolsEntity[]> {
    return this.toolsRepository.find();
  }

  async getSupervisorPersonnel(
    req: RequestWithRoles,
    rows: number,
    page: number,
  ): Promise<{ personnel: PersonnelEntity[]; count: number }> {
    const qb = this.personnelRepository.createQueryBuilder('personnel');

    qb.leftJoinAndSelect('personnel.recommitment', 'recommitment');
    qb.leftJoinAndSelect('recommitment.recommitmentCycle', 'recommitmentCycle');
    qb.where('LOWER(personnel.supervisorEmail) = :email', { email: req.idir });
    qb.andWhere('recommitment.status is not null');
    qb.orderBy('personnel.lastName', 'ASC');
    qb.addOrderBy('personnel.firstName', 'ASC');

    const count = await qb.getCount();
    const personnel = await qb
      .take(rows)
      .skip((page - 1) * rows)
      .getMany();

    this.logger.log(`FOUND: ${count} for supervisor ${req.idir}`);
    this.logger.log(
      `Returning: ${personnel.length} for supervisor ${req.idir}`,
    );

    return { personnel, count };
  }
  /**
   * Member confirmation of availability
   * @param date
   * @param id
   * @returns {UpdateResult}
   */
  async confirmAvailability(date: Date, id: string): Promise<UpdateResult> {
    return await this.personnelRepository.update(id, {
      availabilityConfirmedUntil: date,
      availabilityConfirmedOn: new Date(),
    });
  }

  async findActivePersonnel(ministry?: string): Promise<{
    emcr: PersonnelEntity[];
    bcws: PersonnelEntity[];
    ministry?: Ministry;
  }> {
    const activeEmcrPersonnelQb =
      this.personnelRepository.createQueryBuilder('personnel');
    activeEmcrPersonnelQb.innerJoin(
      'personnel.emcr',
      'emcr',
      'emcr.status = :status',
      { status: Status.ACTIVE },
    );
    if (!!ministry) {
      activeEmcrPersonnelQb.andWhere('personnel.ministry = :ministry', {
        ministry,
      });
    }
    const activeEmcrPersonnel = await activeEmcrPersonnelQb.getMany();

    const activeBcwsPersonnelQb =
      this.personnelRepository.createQueryBuilder('personnel');
    activeBcwsPersonnelQb.innerJoin(
      'personnel.bcws',
      'bcws',
      'bcws.status = :status',
      { status: Status.ACTIVE },
    );
    if (!!ministry) {
      activeBcwsPersonnelQb.andWhere('personnel.ministry = :ministry', {
        ministry,
      });
    }
    const activeBcwsPersonnel = await activeBcwsPersonnelQb.getMany();

    return { emcr: activeEmcrPersonnel, bcws: activeBcwsPersonnel };
  }

  async getChipsPersonnelToUpdate(): Promise<PersonnelEntity[]> {
    const qb = this.personnelRepository.createQueryBuilder('personnel');
    qb.leftJoin('personnel.emcr', 'emcr');
    qb.leftJoin('personnel.bcws', 'bcws');
    qb.leftJoinAndSelect('personnel.workLocation', 'workLocation');
    qb.leftJoinAndSelect('personnel.homeLocation', 'homeLocation');
    qb.andWhere('(bcws.status = :status OR emcr.status = :status)', {
      status: Status.ACTIVE,
    });
    qb.andWhere('personnel.chipsProfileMissing = false');
    qb.andWhere(
      '(personnel.chipsLastPing < current_date OR personnel.chipsLastPing IS NULL)',
    );
    qb.limit(10);
    return qb.getMany();
  }

  async updatePersonnelChipsMeta(
    personnel: PersonnelEntity,
    personnelMissing?: boolean,
  ) {
    const update: Partial<PersonnelEntity> = {
      chipsLastPing: new Date(),
      updatedAt: personnel.updatedAt,
    };
    if (personnelMissing === true) {
      update.chipsProfileMissing = true;
    }
    await this.personnelRepository.update(personnel.id, update);
  }

  async updatePersonnelChipsData(
    personnel: PersonnelEntity,
    data: ChipsResponse,
  ) {
    const issues: { [key: string]: string } = {};
    let ministry;
    if (ChipsMinistryName[data.organization.trim()]) {
      ministry = ChipsMinistryName[data.organization.trim()];
    } else {
      // Add to issues
      issues.ministry = `${data.organization} not found in CORE ministries`;
      ministry = personnel.ministry;
    }

    const allLocations =
      await this.regionsAndLocationsService.getAllLocations();
    let workLocation = allLocations.find(
      (l) => l.locationName === data.workCity?.trim(),
    );
    let homeLocation = allLocations.find(
      (l) => l.locationName === data.homeCity?.trim(),
    );
    if (!homeLocation) {
      // Add to issues
      issues.homeLocation = `${data.homeCity} not found in CORE list of cities`;
      homeLocation = personnel.homeLocation;
    }
    if (!workLocation) {
      // Add to issues
      issues.workLocation = `${data.workCity} not found in CORE list of cities`;
      workLocation = personnel.workLocation;
    }

    if (data.name.split(',').length !== 2) {
      issues.name = `Unable to parse name "${data.name}" from CHIPS.`;
    }

    const personnelUpdates: Partial<PersonnelEntity> = {
      ...personnel,
      employeeId: data.emplId, // Ensure format
      lastName: data.name.split(',')[0]?.trim() || personnel.firstName,
      firstName: data.name.split(',')[1]?.trim() || personnel.lastName,
      division: data.levelOne,
      jobTitle: data.currentPositionTitle || personnel.jobTitle,
      ministry,
      workLocation,
      homeLocation,
      paylistId: data.deptId,
      supervisorLastName: data.currentSupervisorName.split(',')[0],
      supervisorFirstName: data.currentSupervisorName.split(',')[1],
      supervisorEmail: data.currentSupervisorEmail,
      chipsLastPing: new Date(),
      chipsLastActionDate: data.actionDate,
      chipsIssues: issues,
    };

    const differences: { [key: string]: string | object } = {};
    for (const key in personnelUpdates) {
      if (key.includes('chips')) {
        continue;
      } else if (key.includes('Location')) {
        if (personnelUpdates[key]['id'] !== personnel[key]['id']) {
          differences[key] = personnel[key];
        }
      } else if (personnelUpdates[key] !== personnel[key]) {
        differences[key] = personnel[key];
      }
    }
    personnelUpdates.chipsLastUpdatedProperties = differences;
    const trainingData = await this.getChipsTrainingData(
      personnelUpdates.employeeId,
    );
    personnelUpdates.chipsTrainingData = trainingData;

    await this.personnelRepository.update(personnel.id, personnelUpdates);
  }

  async getChipsMemberData(memberEmail: string): Promise<
    | {
        success: boolean;
        data: ChipsResponse | undefined;
      }
    | undefined
  > {
    if (process.env.TEST_CHIPS_RESPONSE === 'true') {
      return {
        success: true,
        data: mapToChipsResponse(sampleData),
      };
    }
    const response = await axios.get(
      `${process.env.CHIPS_API}/Datamart_COREProg_dbo_vw_report_CoreProg_EmployeeData(Work_Email='${memberEmail}')`,
      {
        headers: {
          'x-cdata-authtoken': process.env.CHIPS_API_KEY,
        },
      },
    );
    if (response?.data) {
      return {
        success: true,
        data: mapToChipsResponse(response.data),
      };
    } else if (response?.status === 200) {
      // Successful request, no data returned, no profile on chips
      return {
        success: true,
        data: undefined,
      };
    } else {
      this.logger.error(`No CHIPS profile for ${memberEmail}`);
      return undefined;
    }
  }

  async getChipsTrainingData(employeeId: string) {
    if (process.env.TEST_CHIPS_RESPONSE === 'true') {
      return sampleTrainingData.map((course) =>
        mapToChipsTrainingResponse(course),
      );
    }
    const response = await axios.get(
      `${process.env.CHIPS_API}/Datamart_COREProg_dbo_vw_report_CoreProg_LearningData(EMPLID='${employeeId}')`,
      {
        headers: {
          'x-cdata-authtoken': process.env.CHIPS_API_KEY,
        },
      },
    );
    if (response?.data) {
      const dataString = `[${response.data}]`;
      const jsonData = JSON.parse(dataString);
      return jsonData.value.map((course) => mapToChipsTrainingResponse(course));
    } else {
      this.logger.error(`No Training Data for ${employeeId}`);
      return [];
    }
  }
}
