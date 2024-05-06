import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonnelEmcrDTO } from './create-emcr-personnel.dto';

export class UpdateEmcrPersonnelDTO extends PartialType(
  CreatePersonnelEmcrDTO,
) {}
