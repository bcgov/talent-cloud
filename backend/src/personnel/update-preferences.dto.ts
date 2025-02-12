import { PartialType } from '@nestjs/swagger';
import { UpdatePersonnelDTO } from './dto/update-personnel.dto';

export class UpdatePreferencesDTO extends PartialType(UpdatePersonnelDTO) {}
