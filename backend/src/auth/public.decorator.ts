import { SetMetadata } from '@nestjs/common';
import { Metadata } from './metadata';

export const Public = () => SetMetadata(Metadata.PUBLIC_ENDPOINT, true);
