import { SetMetadata } from '@nestjs/common';
import { TokenType } from './interface';
import { Metadata } from './metadata';
/**
 * Used to decorate endpoints for exchanging data with CHEFS. ChefsToken authorizes requests with the CHEFS WS Token
 * @returns
 */
export const Token = (...token: TokenType[]) =>
  SetMetadata(Metadata.TOKEN_TYPE, [...token]);
