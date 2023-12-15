import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { REALM, AUTH_SERVER } from './const';
import { Token } from './interface';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Bypass auth for public endpoint
    const publicEndpoint = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (publicEndpoint) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    try {
      const token = this.extractToken(req);

      this.validateToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extracts a client id and secret from basic auth passed into the request
   * @param request Express Request
   * @returns { clientId: string, clientSecret: string } extracted from request
   */
  extractToken(request: Request): Token {
    if (!request.headers.authorization.includes('Bearer ')) {
      throw new UnauthorizedException('Unauthorized user without credentials');
    }

    return this.parseJwt(request.headers.authorization);
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

  /**
   * Decodes a jwt and throws errors for issues on the token
   * Checks issuer, audience, and role
   * @param token string
   */
  validateToken(token: Token) {
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Invalid JWT returned from Auth Client');
    }
    const payload = token as jwt.JwtPayload;
    console.log(`${AUTH_SERVER}/realms/${REALM}`);
    if (payload.iss !== `${AUTH_SERVER}/realms/${REALM}`) {
      throw new UnauthorizedException(
        'Incorrect issuer returned from Auth Client',
      );
    }

    if (payload.aud !== 'account') {
      throw new UnauthorizedException(
        'Incorrect Audience returned from Auth Client',
      );
    }

    // Error if no roles. Expand this for RBAC
    if (!payload['resource_access']?.['account']?.roles?.length) {
      throw new ForbiddenException('Invalid roles for user');
    }
  }
}
