import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenType } from './interface';
import { Metadata } from './metadata';

/**
 * Guard to allow access to endpoints annotated with the bcws token decorator
 * Used for sending the approved list of ids to ediaries/bcws
 */
@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const PublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      Metadata.PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (PublicEndpoint) {
      return true;
    }

    const tokenType = this.reflector.get<TokenType[]>(
      Metadata.TOKEN_TYPE,
      context.getHandler(),
    );
    console.log(tokenType, 'TOKEN GUARD - TOKEN TYPE');

    if (!tokenType) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authentication;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    if (tokenType.includes(TokenType.CHEFS)) {
      try {
        this.validateChefsToken(authHeader);
        return true;
      } catch {
        throw new UnauthorizedException();
      }
    }

    if (tokenType.includes(TokenType.BCWS)) {
      try {
        this.validateBcwsToken(authHeader);
        return true;
      } catch {
        throw new UnauthorizedException();
      }
    }
  }

  validateChefsToken(authHeader: string) {
    if (authHeader !== process.env.CHEFS_WS_TOKEN) {
      throw new UnauthorizedException();
    }
  }
  validateBcwsToken(authHeader: string) {
    if (authHeader !== process.env.BCWS_TOKEN) {
      throw new UnauthorizedException();
    }
  }
}
