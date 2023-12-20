import { SetMetadata } from '@nestjs/common';
import { Metadata } from './metadata';

export const Public = () => SetMetadata(Metadata.IS_PUBLIC, true);
