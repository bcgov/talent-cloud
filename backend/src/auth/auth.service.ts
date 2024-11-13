import { Inject, Injectable } from '@nestjs/common';
import { PersonnelEntity } from 'src/database/entities/personnel.entity';
import { Program, RequestWithRoles, Role, Token } from './interface';
import { AppLogger } from '../logger/logger.service';
import { PersonnelService } from '../personnel/personnel.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  /**
   * Set the usersname and the role to the request object
   * The Coordinator role has the highest permissions level, so if the user has the Coordinator role, the role will be set to Coordinator.
   * The logistics role has the second highest permissions level, so if the user has the logistics role, the role will be set to logistics.
   * If a user has both roles the role will be set to Coordinator.
   * @param payload The token payload
   * @param request The request object
   */
  async setRequestUserInfo(payload: Token, request: Request): Promise<boolean> {
    if (payload.given_name && payload.family_name) {
      request['username'] = `${payload.given_name} ${payload.family_name}`;
    } else {
      request['username'] = '';
    }
    if (payload.email) {
      request['idir'] = payload.email;
    } else {
      request['idir'] = '';
    }

    const isMember = await this.personnelService.getPersonnelByEmail(
      payload.email,
    );
    if (isMember) {
      request['role'] = Role.MEMBER;
    }

    const isSupervisor = await this.personnelService.verifySupervisor(
      payload.email,
    );
    if (isSupervisor) {
      request['role'] = Role.SUPERVISOR;
    }

    const logistics = payload.client_roles.includes(Role.LOGISTICS);
    if (logistics) {
      request['role'] = Role.LOGISTICS;
    }
    const coordinator = payload.client_roles.includes(Role.COORDINATOR);

    if (coordinator) {
      request['role'] = Role.COORDINATOR;
    }

    const isBcws = payload.client_roles.includes(Program.BCWS);
    const isEmcr = payload.client_roles.includes(Program.EMCR);

    if (isEmcr) {
      request['program'] = Program.EMCR;
    }
    if (isBcws) {
      request['program'] = Program.BCWS;
    }
    if (isBcws && isEmcr) {
      request['program'] = Program.ALL;
    }
    this.logger.log(`User Info:`);
    this.logger.log(`User: ${request['username']}`);
    this.logger.log(`IDIR: ${request['idir']}`);
    this.logger.log(`Role: ${request['role']}`);
    this.logger.log(`Program: ${request['program']}`);

    return true;
  }

  async getLoggedInUser(request: RequestWithRoles): Promise<PersonnelEntity> {
    return await this.personnelService.findByEmail(request.idir);
  }

  async verifySupervisor(request: RequestWithRoles): Promise<boolean> {
    return await this.personnelService.verifySupervisor(request.idir);
  }
}
