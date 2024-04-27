import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './interface';
import { Metadata } from './metadata';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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

    if (TokenEndpoint) {
      return true;
    }

    const requiredRoles = this.reflector.get<Role[]>(
      Metadata.ROLES,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // get the current logged in users roles (attached to the request during authentication)
    const currentUserRole = request?.role;
    console.log(requiredRoles, 'REQUIRED ROLES');
    console.log(currentUserRole, 'USER ROLES');
    try {
      // if the current user roles match the required roles for the route allow access
      if (requiredRoles.includes(currentUserRole)) {
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return false;
  }
}
