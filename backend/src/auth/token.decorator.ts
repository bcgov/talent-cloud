import { SetMetadata } from '@nestjs/common';
import { Metadata } from './metadata';

export const Token = () => SetMetadata(Metadata.TOKEN_ENDPOINT, true);
