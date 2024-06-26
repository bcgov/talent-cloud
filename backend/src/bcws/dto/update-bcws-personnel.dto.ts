import { PartialType } from '@nestjs/swagger';
import { CreatePersonnelBcwsDTO } from './create-bcws-personnel.dto';

export class UpdateBcwsPersonnelDTO extends PartialType(
  CreatePersonnelBcwsDTO,
) {}
