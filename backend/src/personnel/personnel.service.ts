import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { PersonnelEntity } from '../database/entities/personnel.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelEntity)
    private personnelRepository: Repository<PersonnelEntity>,
  ) {}

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
    qb = qb.andWhere('personnel.active = :active', { active: query.active });
    if (query.regions?.length) {
      qb.andWhere('personnel.region IN (:...regions)', {
        regions: query.regions,
      });
    }
    if (query.locations?.length) {
      qb.andWhere('personnel.workLocation IN (:regions)', {
        regions: query.locations,
      });
    }
    qb = qb.take(query.rows);
    qb = qb.skip((query.page - 1) * query.rows);
    //TODO  revert - just for demo purposes!!
    // const [personnel, count] = await qb.getManyAndCount();
    const personnel = await this.personnelRepository.find();
    const count = personnel.length;
    return { personnel, count };
  }
}
