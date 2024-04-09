import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, eachDayOfInterval, parse } from 'date-fns';
import { Brackets, DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { PersonnelExperienceDTO } from './dto/personnel-experiences.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { UpdatePersonnelDTO } from './dto/update-personnel.dto';
import { PersonnelRO } from './ro/personnel.ro';
import { Role } from '../auth/interface';
import { AvailabilityType, Status } from '../common/enums';
import { datePST } from '../common/helpers';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { ExperienceEntity } from '../database/entities/personnel-function-experience.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { TrainingEntity } from 'src/database/entities/training.entity';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
    @InjectRepository(AvailabilityEntity)
    private availabilityRepository: Repository<AvailabilityEntity>,
    @InjectRepository(ExperienceEntity)
    private experiencesRepository: Repository<ExperienceEntity>,
    @InjectRepository(TrainingEntity)
    private trainingRepository: Repository<TrainingEntity>,
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
  async updatePersonnel(id: string, personnel: UpdatePersonnelDTO, role: Role) {
    this.logger.log(`Updating personnel ${id}`);
    const person = await this.personnelRepository.findOne({ where: { id } });
    this.logger.log(`${JSON.stringify(personnel)}`);

    if (
      personnel?.workLocation &&
      personnel?.workLocation?.locationName === ''
    ) {
      personnel.workLocation = {
        locationName: null,
        region: null,
      };
    }

    Object.keys(personnel).forEach((key) => {
      person[key] = personnel[key];
    });

    try {
      // This is a 'save' rather than 'update' to allow for updating many-to-many relations
      await this.personnelRepository.save(person);
      return this.getPersonnelById(role, id);
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
    experiences: PersonnelExperienceDTO[],
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
      return this.getPersonnelById(role, id);
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
   * Get Personnel
   * Given specific queries, get associated personnel and their function experiences
   * @param query Includes pagination query, ie. page and number of rows
   * @returns {PersonnelEntity[]} List of personnel
   * @returns {number} Count of total personnel search applies to
   */
  async getPersonnel(
    query: GetPersonnelDTO,
  ): Promise<{
    personnel: PersonnelEntity[]; count: {
      [Status.ACTIVE]: number;
      [Status.INACTIVE]: number;
      [Status.PENDING]: number;
    }
  }> {
    const qb = this.personnelRepository.createQueryBuilder('personnel');
    this.logger.log(`Query: ${JSON.stringify(query)}`);


    qb.leftJoinAndSelect('personnel.experiences', 'experiences');
    qb.leftJoinAndSelect('experiences.function', 'function');
    qb.leftJoinAndSelect('personnel.homeLocation', 'location');
    qb.leftJoinAndSelect('personnel.trainings', 'trainings');

    if (query.name) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(personnel.firstName) LIKE LOWER(:name)', {
            name: `${query.name}%`,
          }).orWhere('LOWER(personnel.lastName) LIKE LOWER(:name)', {
            name: `${query.name}%`,
          });
        }),
      );
    }

    if (query.region?.length) {
      qb.andWhere('personnel.homeLocation.region IN (:...regions)', {
        regions: query.region,
      });
    }
    if (query.location?.length) {
      qb.andWhere(
        'personnel.homeLocation.locationName IN (:...homeLocations)',
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

    /**
     * If we have an availability type and a date range, we will use the date range + type
     */

    if (query.availabilityType) {
      qb.leftJoinAndSelect('personnel.availability', 'availability');
      qb.andWhere('availability.availabilityType = :availabilityType', {
        availabilityType: query.availabilityType,
      });
      if (query.availabilityFromDate && query.availabilityToDate) {
        this.logger.log(
          `Availability From Date: ${query.availabilityFromDate} Availability To Date: ${query.availabilityToDate}`,
        );

        qb.andWhere('availability.date >= :from AND availability.date <= :to', {
          from: query.availabilityFromDate,
          to: query.availabilityToDate,
        });
      } else {
        qb.andWhere('availability.date = :date', {
          date: datePST(new Date()),
        });
      }
    } else {
      qb.leftJoinAndSelect(
        'personnel.availability',
        'availability',
        'availability.date = :date',
        { date: datePST(new Date()) },
      );
    }


    if (query.status === Status.PENDING) {
      qb.orderBy('personnel.applicationDate', 'DESC');
      qb.addOrderBy('personnel.lastName', 'ASC');
      qb.addOrderBy('personnel.firstName', 'ASC');
    } else {
      qb.orderBy('personnel.dateJoined', 'DESC');
      qb.addOrderBy('personnel.lastName', 'ASC');
      qb.addOrderBy('personnel.firstName', 'ASC');
    }

    const personnel = await qb.take(query.rows).skip((query.page - 1) * query.rows).andWhere('personnel.status = :status', {
      status: query.status,
    }).getMany();
    const activeCount = await qb.andWhere('personnel.status = :status', {
      status: Status.ACTIVE,
    }).getCount();
    const inactiveCount = await qb.andWhere('personnel.status = :status', {
      status: Status.INACTIVE,
    }).getCount();
    const pendingCount = await qb.andWhere('personnel.status = :status', {
      status: Status.PENDING,
    }).getCount();

    const count = {
      [Status.ACTIVE]: activeCount,
      [Status.INACTIVE]: inactiveCount,
      [Status.PENDING]: pendingCount,
    }

    return { personnel, count }
  };


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
   * @returns {PersonnelEntity} Single personnel
   */
  async getPersonnelById(
    role: Role,
    id: string,
  ): Promise<Record<string, PersonnelRO>> {
    const person = await this.personnelRepository.findOne({
      where: { id },
      relations: ['experiences', 'experiences.function', 'trainings'],
    });
    const lastDeployed = await this.getLastDeployedDate(id);
    const personnel = person.toResponseObject(role, lastDeployed);

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

  async getTrainingsByNames(names: string[]): Promise<TrainingEntity[]> {
    const trainings = await this.trainingRepository.find({ where: { name: In(names) }});
    if (trainings.length !== names.length) {
      throw new NotFoundException({
        message: 'Not all training names exist in our database',
      });
    }
    return trainings;
  }
}
