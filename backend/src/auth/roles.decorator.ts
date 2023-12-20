import { SetMetadata } from '@nestjs/common';
import { Metadata } from './metadata';

export const Roles = (...roles: string[]) => SetMetadata(Metadata.ROLES, roles);
