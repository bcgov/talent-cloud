import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, eachDayOfInterval, parse } from 'date-fns';
import {
  Brackets,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';

import { MemberProfileRO } from './ro/member-profile.ro';
import { Program, RequestWithRoles } from '../auth/interface';
import { AvailabilityType } from '../common/enums/availability-type.enum';
import { Status } from '../common/enums/status.enum';
import { datePST } from '../common/helpers';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
    @InjectRepository(AvailabilityEntity)
    private availabilityRepository: Repository<AvailabilityEntity>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PersonnelService.name);
  }
  /**
   * Find personnel by id
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<PersonnelEntity> {
    return this.personnelRepository.findOne({ where: { id } });
  }

  /**
   * Find personnel by id
   * @param id
   * @returns
   */
  async findOneByEmail(email: string): Promise<PersonnelEntity> {
    return this.personnelRepository.findOne({ where: { email } });
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

  async getPersonnel(req: RequestWithRoles): Promise<MemberProfileRO> {
    const qb = this.personnelRepository
      .createQueryBuilder('personnel')
      .leftJoinAndSelect('personnel.bcws', 'bcws')
      .leftJoinAndSelect('personnel.emcr', 'emcr');

    qb.where('personnel.email = :email', { email: req.idir });
    const personnelData = await qb.getOne();
    const memberProfile: MemberProfileRO = new MemberProfileRO(personnelData);
    return memberProfile;
  }

  async verifyMember(email: string): Promise<boolean> {
    const person = await this.personnelRepository.find({ where: { email } });

    if (person.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async verifySupervisor(email: string): Promise<boolean> {
    const supervisor = await this.personnelRepository.findOneBy({
      supervisorEmail: email,
    });

    this.logger.log(`Supervisor: ${supervisor}`);
    if (!supervisor) {
      return false;
    }
    return true;
  }
}
