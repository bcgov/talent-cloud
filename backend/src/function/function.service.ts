import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcwsRoleName } from '../common/enums';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { EmcrFunctionEntity } from '../database/entities/emcr';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(EmcrFunctionEntity)
    private functionRepository: Repository<EmcrFunctionEntity>,
    @InjectRepository(BcwsRoleEntity)
    private roleRepository: Repository<BcwsRoleEntity>,
  ) {}

  /**
   * Get all functions
   * No query parameters for now
   * @returns {EmcrFunctionEntity[]} List of functions
   */
  async getFunctions(): Promise<EmcrFunctionEntity[]> {
    return this.functionRepository.find();
  }

  async getRoles(): Promise<{ [key: string]: BcwsRoleName[] }> {
    const roles = await this.roleRepository.find();

    return roles.reduce((acc, role) => {
      const key = role.section;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(role.name);
      return acc;
    }, {});
  }
}
