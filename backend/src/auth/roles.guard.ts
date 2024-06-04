import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Program, Role } from './interface';
import { Metadata } from './metadata';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private logger: AppLogger,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const publicEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (publicEndpoint) {
      return true;
    }

    const tokenEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.TOKEN_TYPE,
      [context.getHandler(), context.getClass()],
    );

    if (tokenEndpoint) {
      return true;
    }

    const requiredRoles = this.reflector.get<Role[]>(
      Metadata.ROLES,
      context.getHandler(),
    );

    // retrieve the required program from the endpoint decorator
    const requiredProgramRoles = this.reflector.get<Program[]>(
      Metadata.PROGRAM,
      context.getHandler(),
    );
    
    const request = context.switchToHttp().getRequest();

    // if this route does not specify any required program then allow passthrough
    if (requiredProgramRoles) {
      // get the current logged in users program (attached to the request during authentication)
      const currentUserPrograms = request?.program;
      this.validateProgram(currentUserPrograms, requiredProgramRoles);
    }

    if (requiredRoles) {
      // get the current logged in users roles (attached to the request during authentication)
      const currentUserRole = request?.role;

      this.validateRoles(currentUserRole, requiredRoles);
    }
    // if no required program and no required roles are listed on the endpoint then allow passthrough
    return true;
  }

  validateRoles(currentUserRole: Role, requiredRoles: Role[]) {
    if (requiredRoles.includes(currentUserRole)) {
      return true;
    }

    throw new UnauthorizedException();
  }

  validateProgram(
    currentUserProgram: Program,
    requiredProgramRoles: Program[],
  ) {
    if (requiredProgramRoles.includes(currentUserProgram)) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
