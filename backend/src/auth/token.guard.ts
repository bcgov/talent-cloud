import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenType } from './interface';
import { Metadata } from './metadata';
import { AppLogger } from '../logger/logger.service';

/**
 * Guard to allow access to endpoints annotated with the bcws token decorator
 * Used for sending the approved list of ids to ediaries/bcws
 */
@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private logger: AppLogger,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const PublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (PublicEndpoint) {
      return true;
    }

    const requiredTokens = this.reflector.get<TokenType[]>(
      Metadata.TOKEN_TYPE,
      context.getHandler(),
    );

    if (!requiredTokens) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authentication;

    if (!authHeader) {
      this.logger.error('Unauthorized - invalid auth header');
      throw new UnauthorizedException();
    }

    if (requiredTokens.includes(TokenType.CHEFS)) {
      try {
        this.validateChefsToken(authHeader);
        return true;
      } catch {
        this.logger.error('Error validating token');
        throw new UnauthorizedException();
      }
    }

    if (requiredTokens.includes(TokenType.BCWS)) {
      try {
        this.validateBcwsToken(authHeader);
        return true;
      } catch {
        this.logger.error('Error validating token');
        throw new UnauthorizedException();
      }
    }
  }

  validateChefsToken(authHeader: string) {
    if (authHeader !== process.env.CHEFS_WS_TOKEN) {
      this.logger.error('Unauthorized - invalid auth token');
      throw new UnauthorizedException();
    }
  }
  validateBcwsToken(authHeader: string) {
    if (authHeader !== process.env.BCWS_TOKEN) {
      this.logger.error('Unauthorized - invalid auth token');
      throw new UnauthorizedException();
    }
  }
}
