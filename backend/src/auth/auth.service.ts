import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
  async setRequestUserInfo(payload: Token, request: Request): Promise<Role> {
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
    return await this.setUserRole(payload, request);
  }
  /**
   * Set the relevant program to the request object
   * @param payload
   * @param request
   */
  setProgramRoles(payload: Token, request: Request): void {
    if (payload.client_roles.includes(Program.EMCR)) {
      request['program'] = Program.EMCR;
    } else if (payload.client_roles.includes(Program.BCWS)) {
      request['program'] = Program.BCWS;
    } else {
      this.logger.error(
        'Unauthorized user - no valid program is listed in the client roles',
      );
      throw new UnauthorizedException();
    }
  }
  /**
   * Set the usersname and the role to the request object
   * The Coordinator role has the highest permissions level, so if the user has the Coordinator role, the role will be set to Coordinator.
   * The logistics role has the second highest permissions level, so if the user has the logistics role, the role will be set to logistics.
   * If a user has both roles the role will be set to Coordinator.
   * @param payload The token payload
   * @param request The request object
   */
  async setUserRole(payload: Token, request: Request): Promise<Role> {
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
      this.setProgramRoles(payload, request);
    }
    const coordinator = payload.client_roles.includes(Role.COORDINATOR);

    if (coordinator) {
      request['role'] = Role.COORDINATOR;
      this.setProgramRoles(payload, request);
    }

    return request['role'];
  }

  async getLoggedInUser(request: RequestWithRoles) {
    const userData = await this.personnelService.findByEmail(request['idir']);

    return { user: userData };
  }
}
