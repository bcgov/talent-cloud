import { SetMetadata } from '@nestjs/common';
import { Role } from './interface';
import { Metadata } from './metadata';

export const Roles = (role: Role) => SetMetadata(Metadata.ROLE, role);
