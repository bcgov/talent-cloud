import { Inject, Injectable } from '@nestjs/common';
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
  async setRequestUserInfo(
    payload: Token,
    request: Request,
  ): Promise<{ roles: Role[]; bcws: boolean; emcr: boolean }> {
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
    return await this.getUserRole(payload, request);
  }

  /**
   * Set the usersname and the role to the request object
   * The Coordinator role has the highest permissions level, so if the user has the Coordinator role, the role will be set to Coordinator.
   * The logistics role has the second highest permissions level, so if the user has the logistics role, the role will be set to logistics.
   * If a user has both roles the role will be set to Coordinator.
   * @param payload The token payload
   * @param request The request object
   */
  async getUserRole(
    payload: Token,
    request: Request,
  ): Promise<{ roles: Role[]; bcws: boolean; emcr: boolean }> {
    const roles = [];
    const isMember = await this.personnelService.getPersonnelByEmail(
      payload.email,
    );
    if (isMember) {
      roles.push(Role.MEMBER);
    }

    const isSupervisor = await this.personnelService.verifySupervisor(
      payload.email,
    );
    if (isSupervisor) {
      roles.push(Role.SUPERVISOR);
    }

    const logistics = payload.client_roles.includes(Role.LOGISTICS);
    if (logistics) {
      roles.push(Role.LOGISTICS);
    }
    const coordinator = payload.client_roles.includes(Role.COORDINATOR);

    if (coordinator) {
      roles.push(Role.COORDINATOR);
    }

    console.log(request['role'], 'ROLE');
    this.logger.log(roles);

    const isBcws = payload.client_roles.includes(Program.BCWS);
    const isEmcr = payload.client_roles.includes(Program.EMCR);

    return { roles, bcws: isBcws, emcr: isEmcr };
  }

  async getLoggedInUser(request: RequestWithRoles) {
    const userData = await this.personnelService.findByEmail(request['idir']);

    return { user: userData };
  }
}
