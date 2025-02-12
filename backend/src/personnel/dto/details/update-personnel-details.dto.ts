import { PartialType } from '@nestjs/mapped-types';
import { PersonnelDetailsDTO } from './personnel-details.dto';

export class UpdatePersonnelDetailsDTO extends PartialType(
  PersonnelDetailsDTO,
) {}
