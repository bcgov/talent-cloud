import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, eachDayOfInterval, parse, differenceInDays } from 'date-fns';
import {
  Brackets,
  DeleteResult,
  In,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { AvailabilityRO, PersonnelRO } from './ro';
import { Program, RequestWithRoles } from '../auth/interface';
import {
  AvailabilityType,
  AvailabilityTypeLabel,
} from '../common/enums/availability-type.enum';
import { Status } from '../common/enums/status.enum';
import { datePST } from '../common/helpers';
import { CreatePersonnelLanguagesDTO } from './dto/create-personnel-languages.dto';
import { Ministry } from '../common/enums';
import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { EmcrExperienceEntity } from '../database/entities/emcr';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { AppLogger } from '../logger/logger.service';

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
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    @InjectRepository(EmcrExperienceEntity)
    private experiencesRepository: Repository<EmcrExperienceEntity>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PersonnelService.name);
  }
  /**
   * Find personnel by id
   * @param id
   * @returns
   */

  async updatePersonnelSupervisorInformation(personnel, supervisorInformation) {
    const qb = this.personnelRepository.createQueryBuilder('personnel');

    qb.update(PersonnelEntity)
      .set({
        ...supervisorInformation,
      })
      .where('id = :id', { id: personnel.id })
      .execute();
  }

  async findOne(id: string): Promise<PersonnelEntity> {
    const person = await this.personnelRepository.findOneOrFail({
      where: { id },
      relations: [
        'certifications',
        'certifications.certification',
        'tools',
        'tools.tool',
        'homeLocation',
        'bcws',
        'emcr',
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

  async updatePersonnelDatabase(
    id: string,
    personnel: Partial<CreatePersonnelDTO>,
  ): Promise<PersonnelEntity> {
    const person = await this.findOneById(id);

    if (!!personnel.supervisorEmail) {
      personnel.supervisorEmail = personnel.supervisorEmail.toLowerCase();
    }

    if (personnel.tools?.[0]?.hasOwnProperty('tool')) {
      const allTools = await this.toolsRepository.find();
      const personnelTools = personnel.tools.map((t) => ({
        toolId: allTools.find((at) => at.name === t.tool).id,
        proficiencyLevel: t.proficiencyLevel,
      }));
      personnel.tools = personnelTools;
    } else {
      delete person.tools;
    }

    if (personnel.languages?.length) {
      const currentLanguages = await this.languageRepository.find({
        where: { personnel: { id: person.id } },
      });
      const updatedLanguageNames = personnel.languages.map((l) => l.language);
      const deletedLanguagesIds = currentLanguages
        .filter((cl) => !updatedLanguageNames.includes(cl.language))
        .map((cl) => cl.id);
      if (deletedLanguagesIds.length) {
        await this.languageRepository.delete({
          id: In(deletedLanguagesIds),
          personnelId: person.id,
        });
      }

      const currentLanguagesNames = currentLanguages.map((cl) => cl.language);
      const newLanguages = personnel.languages
        .filter((l) => !currentLanguagesNames.includes(l.language))
        .map((l) => ({
          personnelId: person.id,
          ...l,
        }));
      await this.languageRepository.save(newLanguages);
      delete personnel.languages;
    } else {
      delete person.languages;
    }

    if (personnel.certifications?.[0]?.hasOwnProperty('name')) {
      const allCertifications = await this.certificationRepository.find();
      const personnelCerts = personnel.certifications.map((c) => ({
        certificationId: allCertifications.find((ac) => ac.name === c.name).id,
        expiry: c.expiry,
      }));
      personnel.certifications = personnelCerts;
    } else {
      delete person.certifications;
    }

    if (personnel.bcws?.roles?.length) {
      personnel.bcws.roles = personnel.bcws.roles.map((r) => ({
        roleId: r.roleId,
        expLevel: r.expLevel,
      }));
    }

    if (personnel.emcr?.experiences?.length) {
      await this.experiencesRepository.delete({ personnelId: person.id });
      personnel.emcr.experiences = personnel.emcr.experiences.map((e) => ({
        functionId: e.id,
        experienceType: e.experienceType,
        id: e.id,
      }));
    }

    Object.keys(personnel).forEach((key) => {
      if (['bcws', 'emcr'].includes(key)) {
        return;
      }
      person[key] = personnel[key];
    });

    if (personnel.bcws && person.bcws) {
      Object.keys(personnel.bcws).forEach((key) => {
        person.bcws[key] = personnel.bcws[key];
      });
    }
    if (personnel.emcr && person.emcr) {
      Object.keys(personnel.emcr).forEach((key) => {
        person.emcr[key] = personnel.emcr[key];
      });
    }
    return await this.personnelRepository.save(person);
  }

  async updatePersonnel(
    personnel: Partial<CreatePersonnelDTO>,
    req: RequestWithRoles,
  ): Promise<Record<string, PersonnelRO>> {
    this.logger.log(`${JSON.stringify(personnel)}`);
    const person = await this.personnelRepository.findOneOrFail({
      where: { email: req.idir },
    });

    await this.updatePersonnelDatabase(person.id, personnel);
    return this.getPersonnel(req);
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
    availableStatus?: string,
    program?: Program,
  ): Promise<SelectQueryBuilder<T>> {
    if (availableStatus && availableStatus === 'New') {
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
    }
    if (availableStatus && availableStatus === 'Recommitted') {
      queryBuilder.andWhere('recommitment.program = :program', {
        program,
      });
      queryBuilder.andWhere('recommitment.status = :recommitment_status', {
        recommitment_status: RecommitmentStatus.SUPERVISOR_APPROVED,
      });
      queryBuilder.andWhere('recommitment.year = :year', {
        year: new Date().getFullYear(),
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

        queryBuilder.andWhere(
          `personnel.id not IN (${allAvailable.getQuery()})`,
          allAvailable.getParameters(),
        );

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

        queryBuilder.where(
          `personnel.id not IN (${allAvailable.getQuery()})`,
          allAvailable.getParameters(),
        );
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
          availabilityType: AvailabilityTypeLabel.AVAILABLE,
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

  async getPersonnel(
    req: RequestWithRoles,
  ): Promise<Record<string, PersonnelRO>> {
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

    qb.where('LOWER(personnel.email) = :email', { email: req.idir.toLowerCase() });

    const personnelData = await qb.getOne();
    this.logger.log(`User is a member`);
    return personnelData?.toResponseObject(req.roles);
  }

  async verifyMemberOrSupervisor(
    email: string,
  ): Promise<{ isMember: boolean; isSupervisor: boolean }> {
    const qb = this.personnelRepository.createQueryBuilder('personnel');
    qb.where('LOWER(personnel.email) = :email', { email: email.toLowerCase() }).orWhere(
      'LOWER(personnel.supervisorEmail) = :supervisorEmail',
      { supervisorEmail: email.toLowerCase() }, 
    );
    const people = await qb.getMany();
    const isMember = people.map((itm) => itm.email.toLowerCase()).includes(email.toLowerCase());
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
}
