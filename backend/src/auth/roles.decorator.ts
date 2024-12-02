import { SetMetadata } from '@nestjs/common';
import { Program, Role } from './interface';
import { Metadata } from './metadata';

export const Roles = (...roles: Role[] | Program[]) =>
  SetMetadata(Metadata.ROLES, [...roles]);
