import { Inject, Injectable } from '@nestjs/common';
import { Program, Role, Token } from './interface';
import { AppLogger } from '../logger/logger.service';
import { PersonnelService } from '../personnel/personnel.service';
import { RecommitmentService } from '../recommitment/recommitment.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger
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
      request['idir'] = payload.email.toLowerCase();
    } else {
      request['idir'] = '';
    }
    const roles = [];
    const { isMember, isSupervisor } =
      await this.personnelService.verifyMemberOrSupervisor(payload.email.toLowerCase());

    if (isMember) {
      roles.push(Role.MEMBER);
    }

    if (isSupervisor) {
      roles.push(Role.SUPERVISOR);
    }

    if (payload.client_roles) {
      const logistics = payload.client_roles.includes(Role.LOGISTICS);

      if (logistics) {
        roles.push(Role.LOGISTICS);
      }
      const coordinator = payload.client_roles.includes(Role.COORDINATOR);

      if (coordinator) {
        roles.push(Role.COORDINATOR);
      }

      const isBcws = payload.client_roles.includes(Program.BCWS);
      const isEmcr = payload.client_roles.includes(Program.EMCR);

      if (isEmcr) {
        request['program'] = Program.EMCR;
      }
      if (isBcws) {
        request['program'] = Program.BCWS;
      }
    }
    request['roles'] = [...roles];

    this.logger.log(`User Info:`);
    this.logger.log(`name: ${request['username']}`);
    this.logger.log(`idir: ${request['idir']}`);
    this.logger.log(`roles: ${request['roles']}`);
    this.logger.log(`program: ${request['program']}`);

    return true;
  }


}
