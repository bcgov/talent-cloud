import { SetMetadata } from '@nestjs/common';
import { Program } from './interface';
import { Metadata } from './metadata';

/**
 * Decorator to allow users with specified program roles to access endpoints
 * @param program
 * @returns
 */
export const Programs = (program: Program[]) =>
  SetMetadata(Metadata.PROGRAM, [...program]);
