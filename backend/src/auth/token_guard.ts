import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authentication;

    const authToken = authHeader.split(' ')[1];

    if (!authToken) {
      throw new UnauthorizedException();
    }
    const token = process.env.CHEFS_WS_TOKEN;

    if (!token) {
      throw new InternalServerErrorException();
    }
    try {
      this.validateToken(authToken, token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  validateToken(authHeader: string, token: string) {
    if (authHeader !== token) {
      throw new UnauthorizedException();
    }
  }
}
