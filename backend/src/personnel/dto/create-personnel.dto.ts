import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';

import { PersonnelDetailsDTO } from './details/personnel-details.dto';
import { EmergencyContactInfo } from './emergency-contact/emergency-contact.dto';
import { EmploymentInfo } from './employment-info/employment-info.dto';
import { SkillsDTO } from './skills/create-personnel-skills-dto';
import { SupervisorInformationDTO } from './supervisor/create-supervisor-info.dto';
import { CreatePersonnelBcwsDTO } from '../../bcws/dto';

import { CreatePersonnelEmcrDTO } from '../../emcr/dto';

export class CreatePersonnelProgramsDTO {
  @IsOptional()
  @ApiProperty({
    description: 'Form for the personnel',
    required: false,
    type: CreatePersonnelEmcrDTO,
  })
  @Type(() => CreatePersonnelEmcrDTO)
  @ValidateIf((o) => o.emcr)
  emcr?: CreatePersonnelEmcrDTO;

  @ApiProperty({
    description: 'BCWS information for the personnel',
    required: false,
    type: CreatePersonnelBcwsDTO,
  })
  @IsOptional()
  @ValidateIf((o) => o.bcws)
  @Type(() => CreatePersonnelBcwsDTO)
  bcws?: CreatePersonnelBcwsDTO;
}

export class CreatePersonnelDTO extends IntersectionType(
  CreatePersonnelProgramsDTO,
  PersonnelDetailsDTO,
  EmploymentInfo,
  EmergencyContactInfo,
  SupervisorInformationDTO,
  SkillsDTO,
) {}
