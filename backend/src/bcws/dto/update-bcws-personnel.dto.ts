import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonnelBcwsDTO } from './create-bcws-personnel.dto';
export class UpdateBcwsPersonnelDTO extends PartialType(
  CreatePersonnelBcwsDTO,
) {}
