import type { Program, Role } from '@/common';

export interface User {
  program?: Program;
  role?: Role;
  username?: string;
  idir?: string;
  member?: boolean;
  supervisor?: boolean;
  loading?: boolean;
}
