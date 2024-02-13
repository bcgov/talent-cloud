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
    const allowedRoles = this.reflector.get<Role[]>(
      Metadata.ROLES,
      context.getHandler(),
    );

    const PublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (PublicEndpoint) {
      return true;
    }

    if (!allowedRoles) {
      throw new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    // get the current logged in users roles (attached to the request during authentication)
    const currentUserRole = request?.role;

    try {
      // if the current user roles match the required roles for the route allow access
      if (allowedRoles.includes(currentUserRole)) {
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
