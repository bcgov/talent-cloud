import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesDataRO } from '../bcws/ro/roles-data.ro';
import { BcwsRole, BcwsRoleName, SectionName } from '../common/enums';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import { EmcrFunctionEntity } from '../database/entities/emcr';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(EmcrFunctionEntity)
    private functionRepository: Repository<EmcrFunctionEntity>,
    @InjectRepository(BcwsRoleEntity)
    private roleRepository: Repository<BcwsRoleEntity>,
    @InjectRepository(BcwsCertificationEntity)
    private certRepository: Repository<BcwsCertificationEntity>,
    @InjectRepository(BcwsToolsEntity)
    private toolsRepository: Repository<BcwsToolsEntity>,
  ) {}

  /**
   * Get all functions
   * No query parameters for now
   * @returns {EmcrFunctionEntity[]} List of functions
   */
  async getFunctions(): Promise<EmcrFunctionEntity[]> {
    return this.functionRepository.find();
  }

  /**
   * Get all roles
   * @returns
   */
  async getAllRoles(): Promise<BcwsRoleEntity[]> {
    return this.roleRepository.find();
  }
  /**
   * Returns certifications that are not OFA I, II, or III
   * Used by CHEFS form
   * @returns {BcwsCertificationEntity[]} List of certifications
   *
   */
  async getCertificates(): Promise<BcwsCertificationEntity[]> {
    const certificates = await this.certRepository.find();
    return certificates.filter((itm) => ![2, 8, 9, 10].includes(itm.id));
  }

  /**
   * Returns all tools
   * Used by CHEFS form
   * @returns {BcwsToolsEntity[]} List of tools
   */
  async getTools(): Promise<BcwsToolsEntity[]> {
    return this.toolsRepository.find();
  }

  /**
   * Returns all roles with readable role/section names and id  grouped by sections
   * Used by CHEFS form and front end to display list of roles
   * @returns {RolesDataRO} List of roles
   */
  async getRoles(): Promise<RolesDataRO> {
    const roles = await this.roleRepository.find();

    const sectionsAndRoles = roles.reduce((acc, role) => {
      const key = role.section;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({
        name: BcwsRoleName[role.name],
        enumName: BcwsRole[role.name],
        id: role.id,
        section: SectionName[role.section],
      });
      return acc;
    }, {});

    return sectionsAndRoles;
  }
}
