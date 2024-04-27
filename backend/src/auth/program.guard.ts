import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Program } from './interface';
import { Metadata } from './metadata';

@Injectable()
export class ProgramGuard implements CanActivate {
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

    // Allow passthrough on token endpoints - these endpoints use the token guard to validate auth
    if (TokenEndpoint) {
      return true;
    }

    const requiredProgramRoles = this.reflector.get<Program[]>(
      Metadata.PROGRAM,
      context.getHandler(),
    );

    console.log(requiredProgramRoles, 'REQUIRED PRORGAMS');

    if (!requiredProgramRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // get the current logged in users roles (attached to the request during authentication)
    const currentUserPrograms = request?.program;

    try {
      // if the current user roles match the required roles for the route allow access
      if (
        requiredProgramRoles.every((itm) =>
          currentUserPrograms.find((userProgram) => userProgram === itm),
        )
      ) {
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return false;
  }
}
