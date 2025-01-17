import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';

import { ClsService } from 'nestjs-cls';
import { AuthService } from './auth.service';
import { AUTH_SERVER, AUTH_REALM } from './const';
import { Role, Token } from './interface';
import { Metadata } from './metadata';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: AppLogger;
  constructor(
    private reflector: Reflector,
    private clsService: ClsService,
    private readonly authService: AuthService,
  ) {
    this.logger = new AppLogger();
    this.logger.setContext(AuthGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

    // Allow passthrough on token endpoints - these endpoints use the token guard to validate auth
    if (tokenEndpoint) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token: Token = this.parseJwt(authHeader);

    if (!authHeader.includes('Bearer ')) {
      this.logger.error('Unauthorized user without credentials');
      throw new UnauthorizedException('Unauthorized user without credentials');
    }

    if (!token) {
      this.logger.error('Unauthorized user without token');
      throw new UnauthorizedException();
    }

    const primaryRole = (roles: Role[]): Role | undefined => {
      if (roles.includes(Role.COORDINATOR)) {
        return Role.COORDINATOR;
      } else if (roles.includes(Role.LOGISTICS)) {
        return Role.LOGISTICS;
      } else if (roles.includes(Role.SUPERVISOR)) {
        return Role.SUPERVISOR;
      } else if (roles.includes(Role.MEMBER)) {
        return Role.MEMBER;
      }
      return undefined;
    };

    try {
      const valid = this.validateToken(token);
      if (!valid) {
        throw new UnauthorizedException();
      }

      const userInfo = await this.authService.setRequestUserInfo(
        token,
        request,
      );
      this.clsService.set('email', request.idir);
      this.clsService.set('primaryRole', primaryRole(request.roles));
      return userInfo;
    } catch {
      throw new UnauthorizedException();
    }
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

  validateToken(token: Token): boolean {
    if (!token) {
      this.logger.error('Unauthorized user without credentials');
      throw new UnauthorizedException();
    }
    const payload = token as jwt.JwtPayload;

    if (payload.iss !== `${AUTH_SERVER}/realms/${AUTH_REALM}`) {
      this.logger.error('Unauthorized user - Invalid realm');
      throw new UnauthorizedException();
    }

    if (payload.azp !== process.env.KEYCLOAK_CLIENT) {
      throw new UnauthorizedException();
    }
    if (payload.exp > Date.now()) {
      this.logger.error('Unauthorized user - token expired');
      throw new UnauthorizedException();
    }
    return true;
  }
}
