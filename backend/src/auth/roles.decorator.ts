import { SetMetadata } from '@nestjs/common';
import { Role } from './interface';
import { Metadata } from './metadata';

export const Roles = (...roles: Role[]) =>
  SetMetadata(Metadata.ROLES, [...roles]);
