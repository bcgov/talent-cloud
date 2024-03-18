import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflector: Reflector,     private readonly logger: AppLogger) {
    this.logger.setContext(TokenGuard.name);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    this.logger.log('Received form submission event');

    const authHeader = request.headers.authentication;
    this.logger.log(`Auth Header: ${authHeader}`);
    

    if (!authHeader) {
      this.logger.log('No Auth Header');
      throw new UnauthorizedException();
    }
    const token = process.env.CHEFS_WS_TOKEN;
    this.logger.log(`Chefs Token: ${token}`);

    if (!token) {
      this.logger.log('No Token');
      throw new InternalServerErrorException();
    }
    try {
      this.logger.log('Validating Token');
      this.validateToken(authHeader, token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  validateToken(authHeader: string, token: string) {
    if (authHeader !== token) {
      this.logger.log('Invalid Token');
      throw new UnauthorizedException();
    }
    this.logger.log('Token is valid');
  }
}
