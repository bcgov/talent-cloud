import { PartialType } from '@nestjs/mapped-types';
import { SupervisorInformationDTO } from './create-supervisor-info.dto';

export class UpdateSupervisorInformationDTO extends PartialType(
  SupervisorInformationDTO,
) {}
