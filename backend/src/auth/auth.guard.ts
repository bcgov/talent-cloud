import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AUTH_CLIENT, AUTH_SERVER, AUTH_REALM } from './const';
import { Token } from './interface';
import { Metadata } from './metadata';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      Metadata.IS_PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    const token = this.parseJwt(authHeader);

    if (!authHeader.includes('Bearer ')) {
      throw new UnauthorizedException('Unauthorized user without credentials');
    }

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.validateToken(token);
      this.setRequestRoles(payload, request);
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
    //YODO check expiry
    return payload;
  }

  setRequestRoles(payload: JwtPayload, request: Request): void {
    if (payload.resource_access?.[AUTH_CLIENT]) {
      request['roles'] = payload.resource_access?.[AUTH_CLIENT].roles;
    } else {
      request['roles'] = [];
    }
  }
}
