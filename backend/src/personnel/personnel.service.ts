import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, parse } from 'date-fns';
import { Brackets, Repository, UpdateResult } from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { UpdatePersonnelDTO } from './dto/update-personnel.dto';
import { PersonnelRO } from './ro/personnel.ro';
import { Role } from '../auth/interface';
import { AvailabilityType, Status } from '../common/enums';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
    @InjectRepository(AvailabilityEntity)
    private availabilityRepository: Repository<AvailabilityEntity>,
  ) {}
  /**
   * Update a personnel entity
   * @param id
   * @param personnel
   * @returns
   */
  async updatePersonnel(id: string, personnel: UpdatePersonnelDTO) {
    const person = await this.personnelRepository.findOne({ where: { id } });

    Object.keys(personnel).forEach((key) => {
      person[key] = personnel[key];
    });

    try {
      return await this.personnelRepository.update(id, { ...person });
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
  ): Promise<{ personnel: PersonnelEntity[]; count: number }> {
    const qb = this.personnelRepository.createQueryBuilder('personnel');
    qb.leftJoinAndSelect('personnel.experiences', 'experiences');
    qb.leftJoinAndSelect('experiences.function', 'function');
    qb.leftJoinAndSelect('personnel.availability', 'availability');

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
    if (query.showInactive) {
      qb.andWhere('personnel.status In (:...status)', {
        status: [Status.NEW, Status.INACTIVE, Status.ACTIVE],
      });
    } else {
      qb.andWhere('personnel.status = :status', { status: Status.ACTIVE });
    }
    if (query.region?.length) {
      qb.andWhere('personnel.region IN (:...regions)', {
        regions: query.region,
      });
    }
    if (query.location?.length) {
      qb.andWhere('personnel.workLocation IN (:...workLocations)', {
        workLocations: query.location,
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
    /**
     * If availabilityStatus is defined, check if availabilityStartDate and availabilityEndDate are defined - if not then, default to today's date, and return all peronnel with the availabilityStatus
     */
    if (query.availabilityType ) {
      if (!query.availabilityFrom && !query.availabilityTo) {
        qb.andWhere('availability.date =:date', {
          date: format(new Date(), 'yyyy-MM-dd'),
        });
        qb.andWhere('availability.availabilityType = :availabilityType', {
          availabilityType: query.availabilityType,
        });
      } else {
        qb.andWhere('availability.availabilityType = :availabilityType', {
          availabilityType: query.availabilityType,
        });
        qb.andWhere('availability.date BETWEEN :from AND :to', {
          from: query.availabilityFrom,
          to: query.availabilityTo,
        });
      }
    }
    /**
     * If availabilityStatus is not defined, check if availabilityStartDate and availabilityEndDate are defined - if not then, default to today's date, and return all peronnel with all availabilityStatus.
     */
    if (!query.availabilityType) {
      // This is the default view on pageload - all personnel and all status on today's date (if not indicated then the defualt status of not indicated is returned)
      if (!query.availabilityFrom || !query.availabilityTo) {
        qb.andWhere('availability.date =:date', {
          date: format(new Date(), 'yyyy-MM-dd'),
        });
      } else {
        // This query is not very meaningful without a status - returns all personnel with any status within the date range - we shoudl enforce a status to be selecred if searching by date range
        qb.andWhere('availability.date BETWEEN :from AND :to', {
          from: query.availabilityFrom,
          to: query.availabilityTo,
        });
      }
    }

    if (query.showInactive) {
      qb.orderBy('personnel.status', 'DESC');
      qb.addOrderBy('personnel.lastName', 'ASC');
      qb.addOrderBy('personnel.firstName', 'ASC');
    } else {
      qb.orderBy('personnel.lastName', 'ASC');
      qb.addOrderBy('personnel.firstName', 'ASC');
    }

    qb.take(query.rows);
    qb.skip((query.page - 1) * query.rows);

    const [personnel, count] = await qb.getManyAndCount();
    return { personnel, count };
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
    const person = await this.personnelRepository.findOneBy({ id: id });

    return person.toResponseObject(role);
  }
  /**
   * Get the availability of a personnel for a specific date range
   * @param id
   * @param dateRange
   * @returns
   */
  async getAvailability(
    id: string,
    numberOfMonths: number,
    query?: GetAvailabilityDTO,
  ) {
    const currentDate = new Date();

    const qb = this.availabilityRepository.createQueryBuilder('availability');

    const start = query.from
      ? parse(query.from, 'yyyy-MM-dd', new Date())
      : new Date();

    const end = query.to
      ? parse(query.to, 'yyyy-MM-dd', new Date())
      : new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + numberOfMonths,
          currentDate.getDate(),
        );
    // We are always returning the full month, so set the start date to the first of the month and the end date to the last day of the month
    start.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);

    qb.where('availability.personnel = :id', { id });
    qb.andWhere('availability.date BETWEEN :start AND :end', { start, end });

    return await qb.getMany();
  }
  /**
   * Update the availability of a personnel for a specific date range for a specific avaiilability type
   * @param id
   * @param availability
   * @returns
   */
  async updateAvailability(id: string, availability: UpdateAvailabilityDTO) {
    const { from, to, type, deploymentCode } = availability;

    const startDate = parse(from, 'yyyy-MM-dd', new Date());
    const endDate = parse(to, 'yyyy-MM-dd', new Date());

    const dates = [];

    for (let i = startDate; i < endDate; i.setDate(i.getDate() + 1)) {
      dates.push(format(i, 'yyyy-MM-dd'));
    }

    const updatedAvail: (UpdateResult | AvailabilityEntity)[] =
      await Promise.all(
        dates.map(async (date) => {
          const avail: AvailabilityEntity =
            await this.availabilityRepository.findOne({
              where: { date, personnel: { id } },
            });
          if (avail) {
            return await this.availabilityRepository.update(
              { id: avail.id },
              {
                date,
                availabilityType: AvailabilityType[type],
                deploymentCode,
              },
            );
          } else {
            return await this.availabilityRepository.save(
              this.availabilityRepository.create({
                date,
                availabilityType: AvailabilityType[type],
                deploymentCode,
                personnel: { id },
              }),
            );
          }
        }),
      );

    return updatedAvail;
  }
}
