import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Metadata } from './metadata';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      Metadata.ROLES,
      context.getHandler(),
    );

    // If there is no roles decorator then the allow access to the route
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // get the current logged in users roles (attached to the request during authentication)
    const currentUserRoles = request?.roles;

    try {
      // if the current user roles match the required roles for the route allow access
      if (currentUserRoles === requiredRoles) {
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
