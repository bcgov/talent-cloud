import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AUTH_CLIENT, AUTH_SERVER, AUTH_REALM } from './const';
import { Program, Role, Token } from './interface';
import { Metadata } from './metadata';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const PublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (PublicEndpoint) {
      return true;
    }

    const TokenEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.TOKEN_TYPE,
      [context.getHandler(), context.getClass()],
    );
    console.log(TokenEndpoint, 'TOKEN ENDPOINT');
    // Allow passthrough on token endpoints - these endpoints use the token guard to validate auth
    if (TokenEndpoint) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = this.parseJwt(authHeader);

    if (!authHeader.includes('Bearer ')) {
      throw new UnauthorizedException('Unauthorized user without credentials');
    }

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.validateToken(token);
      this.setRequestUserInfo(payload, request);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  parseJwt(token: string): Token {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  validateToken(token: Token) {
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = token as jwt.JwtPayload;

    if (payload.iss !== `${AUTH_SERVER}/realms/${AUTH_REALM}`) {
      throw new UnauthorizedException();
    }

    if (payload.azp !== process.env.KEYCLOAK_CLIENT) {
      throw new UnauthorizedException();
    }
    if (payload.exp > Date.now()) {
      throw new UnauthorizedException();
    }

    return payload;
  }
  /**
   * Set the usersname and the role to the request object
   * The Coordinator role has the highest permissions level, so if the user has the Coordinator role, the role will be set to Coordinator.
   * The logistics role has the second highest permissions level, so if the user has the logistics role, the role will be set to logistics.
   * If a user has both roles the role will be set to Coordinator.
   * @param payload
   * @param request
   */
  setRequestUserInfo(payload: JwtPayload, request: Request): void {
    // the local keycloak instance includes the key "resource_access" instead of  the key "client roles" so we need to check for both in order to use this locally.
    // sometimes on local we use the actual keycloak instance instead of containerized local keycloak instance so we need to check for client roles on local as well.
    const useDevProgramRoles =
      process.env.NODE_ENV !== 'production' && !payload.client_roles;
    if (useDevProgramRoles) {
      this.setDevProgramRoles(payload, request);
    } else {
      this.setProdProgramRoles(payload, request);
    }
    if (payload.given_name && payload.family_name) {
      request['username'] = `${payload.given_name} ${payload.family_name}`;
    } else {
      request['username'] = '';
    }
  }

  setDevProgramRoles(payload: JwtPayload, request: Request): void {
    const hasValidProgramRole =
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Program.EMCR) ||
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Program.BCWS);
    console.log(payload.resource_access?.[AUTH_CLIENT].roles, 'ROLES');
    if (!hasValidProgramRole) {
      console.log('Logged in user must have a valid program role');
      throw new UnauthorizedException();
    }
    if (
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Program.EMCR) &&
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Program.BCWS)
    ) {
      request['program'] = Program.ADMIN;
    } else if (
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Program.EMCR)
    ) {
      request['program'] = Program.EMCR;
    } else if (
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Program.BCWS)
    ) {
      request['program'] = Program.BCWS;
    }
    this.setDevRoles(payload, request);
  }

  setProdProgramRoles(payload: JwtPayload, request: Request): void {
    console.log(payload.client_roles);

    const hasValidProgramRole =
      payload.client_roles.includes(Program.EMCR) ||
      payload.client_roles.includes(Program.BCWS);
    if (!hasValidProgramRole) {
      console.log('Logged in user must have a valid program role');
      throw new UnauthorizedException();
    }
    if (
      payload.client_roles.includes(Program.EMCR) &&
      payload.client_roles.includes(Program.BCWS)
    ) {
      request['program'] = Program.ADMIN;
    } else if (payload.client_roles.includes(Program.EMCR)) {
      request['program'] = Program.EMCR;
    } else if (payload.client_roles.includes(Program.BCWS)) {
      request['program'] = Program.BCWS;
    }

    this.setProdRoles(payload, request);
  }

  setProdRoles(payload: JwtPayload, request: Request): void {
    // only include a single role in the request object.
    // include the role with the highest permissions level.
    if (payload.client_roles.includes(Role.COORDINATOR)) {
      request['role'] = Role.COORDINATOR;
    } else if (payload.client_roles.includes(Role.LOGISTICS)) {
      request['role'] = Role.LOGISTICS;
    } else {
      request['role'] = '';
    }
  }

  setDevRoles(payload: JwtPayload, request: Request): void {
    // only include a single role in the request object.
    // include the role with the highest permissions level.
    if (
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Role.COORDINATOR)
    ) {
      request['role'] = Role.COORDINATOR;
    } else if (
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Role.LOGISTICS)
    ) {
      request['role'] = Role.LOGISTICS;
    } else if (
      payload.resource_access?.[AUTH_CLIENT].roles.includes(Role.LIAISON)
    ) {
      request['role'] = Role.LIAISON;
    } else {
      request['role'] = '';
    }
  }
}
