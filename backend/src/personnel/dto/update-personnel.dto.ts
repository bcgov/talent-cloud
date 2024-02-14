import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonnelDTO } from './create-personnel.dto';

export class UpdatePersonnelDTO extends PartialType(CreatePersonnelDTO) {}
