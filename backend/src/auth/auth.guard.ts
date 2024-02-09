import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AUTH_CLIENT, AUTH_SERVER, AUTH_REALM } from './const';
import { Token } from './interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
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

  setRequestUserInfo(payload: JwtPayload, request: Request): void {
    if (payload.client_roles) {
      request['roles'] = payload.client_roles;
    } else if (
      process.env.NODE_ENV !== 'production' &&
      payload.resource_access?.[AUTH_CLIENT]
    ) {
      request['roles'] = payload.resource_access?.[AUTH_CLIENT].roles;
    } else {
      request['roles'] = [];
    }
    if (payload.given_name && payload.family_name) {
      request['username'] = `${payload.given_name} ${payload.family_name}`;
    } else {
      request['username'] = '';
    }
  }
}
