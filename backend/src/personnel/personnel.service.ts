import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { PersonnelEntity } from '../database/entities/personnel.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
  ) {}

  async updatePersonnel(personnel: Partial<PersonnelEntity>) {
    try {
      return await this.personnelRepository.update(personnel.id, personnel);
    } catch (e) {
      console.log(e);
    }
  }
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
            name: `%${query.name}%`,
          }).orWhere('LOWER(personnel.lastName) LIKE LOWER(:name)', {
            name: `%${query.name}%`,
          });
        }),
      );
    }
    if (query.active === true) {
      qb = qb.andWhere('personnel.active = :active', { active: query.active });
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
    qb = qb.orderBy('personnel.lastName', 'ASC');
    const [personnel, count] = await qb.getManyAndCount();
    return { personnel, count };
  }

  /**
   * Get Personnel By ID
   * @returns {PersonnelEntity} Single personnel
   */
  async getPersonnelById(id: string): Promise<PersonnelEntity> {
    return await this.personnelRepository.findOneBy({ id: id });
  }
}
