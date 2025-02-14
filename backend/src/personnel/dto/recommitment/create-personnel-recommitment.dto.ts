import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ProgramRecommitmentDTO } from './update-personnel-recommitment.dto';
import { SupervisorInformationDTO } from '../supervisor/create-supervisor-info.dto';

export class PersonnelRecommitmentDTO {
  @ApiProperty({
    type: SupervisorInformationDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupervisorInformationDTO)
  supervisorInformation?: SupervisorInformationDTO;

  @ApiProperty({
    type: ProgramRecommitmentDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramRecommitmentDTO)
  bcws?: ProgramRecommitmentDTO;

  @ApiProperty({
    type: ProgramRecommitmentDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramRecommitmentDTO)
  emcr?: ProgramRecommitmentDTO;
}
