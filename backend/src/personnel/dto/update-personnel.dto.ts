import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { UpdateBcwsPersonnelDTO } from '../../bcws/dto/update-bcws-personnel.dto';
import { UpdateEmcrPersonnelDTO } from '../../emcr/dto';
import { UpdatePersonnelDetailsDTO } from './details/update-personnel-details.dto';
import { UpdateEmergencyContactInfo } from './emergency-contact/update-emergency-contact';
import { UpdateEmploymentInfo } from './employment-info/update-employment-info.dto';
import { UpdateSkillsDTO } from './skills/update-personnel-skills.dto';
import { UpdateSupervisorInformationDTO } from './supervisor/update-supervisor.dto';

export class UpdatePersonnelProgramsDTO {
  @IsOptional()
  @ApiProperty({
    description: 'Form for the personnel',
    required: false,
    type: UpdateEmcrPersonnelDTO,
  })
  @Type(() => UpdateEmcrPersonnelDTO)
  @ValidateIf((o) => o.emcr)
  emcr?: UpdateEmcrPersonnelDTO;

  @ApiProperty({
    description: 'BCWS information for the personnel',
    required: false,
    type: UpdateBcwsPersonnelDTO,
  })
  @IsOptional()
  @ValidateIf((o) => o.bcws)
  @Type(() => UpdateBcwsPersonnelDTO)
  bcws?: UpdateBcwsPersonnelDTO;
}

export class UpdatePersonnelDTO extends IntersectionType(
  UpdatePersonnelProgramsDTO,
  UpdatePersonnelDetailsDTO,
  UpdateEmploymentInfo,
  UpdateEmergencyContactInfo,
  UpdateSupervisorInformationDTO,
  UpdateSkillsDTO,
) {}

