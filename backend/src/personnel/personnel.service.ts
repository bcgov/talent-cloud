import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, parse } from 'date-fns';
import { Brackets, Repository, UpdateResult } from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { UpdatePersonnelDTO } from './dto/update-personnel.dto';
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
    let qb = this.personnelRepository.createQueryBuilder('personnel');
    qb = qb.leftJoinAndSelect('personnel.experiences', 'experiences');
    qb = qb.leftJoinAndSelect('experiences.function', 'function');
    if (query.name) {
      qb = qb.andWhere(
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
      qb = qb.andWhere('personnel.status In (:...status)', {
        status: [Status.NEW, Status.INACTIVE, Status.ACTIVE],
      });
    } else {
      qb = qb.andWhere('personnel.status = :status', { status: Status.ACTIVE });
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
      qb = qb.andWhere('function.name = :function', {
        function: query.function,
      });
    }
    qb = qb.take(query.rows);
    qb = qb.skip((query.page - 1) * query.rows);

    if (query.showInactive) {
      qb = qb.orderBy('personnel.status', 'DESC');
      qb = qb.addOrderBy('personnel.lastName', 'ASC');
      qb.addOrderBy('personnel.firstName', 'ASC');
    } else {
      qb = qb.orderBy('personnel.lastName', 'ASC');
      qb.addOrderBy('personnel.firstName', 'ASC');
    }

    const [personnel, count] = await qb.getManyAndCount();
    const personnelWithAvailability: PersonnelEntity[] = await Promise.all(
      personnel.map(
        async (person) =>
          ({
            ...person,
            availability: await this.getAvailability(person.id, {
              start: new Date(Date.now()),
              end: new Date(Date.now()),
            }),
          }) as PersonnelEntity,
      ),
    );

    return { personnel: personnelWithAvailability, count };
  }

  /**
   * Get Personnel By ID
   * Returns a default availability range of 31 days for a single personnel
   * @returns {PersonnelEntity} Single personnel
   */
  async getPersonnelById(id: string): Promise<PersonnelEntity> {
    const defaultStartDate = new Date(Date.now());

    const defaultEndDate = new Date(
      defaultStartDate.getFullYear(),
      defaultStartDate.getMonth(),
      defaultStartDate.getDate() + 31,
    );

    const person = await this.personnelRepository.findOneBy({ id: id });

    person.availability = await this.getAvailability(id, {
      start: defaultStartDate,
      end: defaultEndDate,
    });

    return person;
  }
  /**
   * Get the availability of a personnel for a specific date range
   * @param id
   * @param dateRange
   * @returns
   */
  async getAvailability(id: string, dateRange: { start: Date; end: Date }) {
    const start = new Date(
      dateRange.start.getFullYear(),
      dateRange.start.getMonth(),
      dateRange.start.getDate() - 1,
    );

    const end = new Date(
      dateRange.end.getFullYear(),
      dateRange.end.getMonth(),
      dateRange.end.getDate() + 1,
    );

    const qb = this.availabilityRepository.createQueryBuilder('availability');

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
    const { start, end, availabilityType, deploymentCode } = availability;

    const startDate = parse(start, 'yyyy-MM-dd', new Date());
    const endDate = parse(end, 'yyyy-MM-dd', new Date());

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
                availabilityType: AvailabilityType[availabilityType],
                deploymentCode,
              },
            );
          } else {
            return await this.availabilityRepository.save(
              this.availabilityRepository.create({
                date,
                availabilityType: AvailabilityType[availabilityType],
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
