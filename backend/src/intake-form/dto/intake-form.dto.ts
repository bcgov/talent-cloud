import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';
import { Program } from '../../auth/interface';

import { IntakeFormPersonnelData } from '../types';
import { FormStatusEnum } from '../../common/enums/form-status.enum';

export class IntakeFormDTO {
  @ApiProperty({
    description: 'Form ID',
    required: false,
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Personnel Data on form',
    required: false,
  })
  @IsOptional()
  personnel: IntakeFormPersonnelData;

  @ApiProperty({
    description: 'Current Program',
    required: false,
  })
  @IsOptional()
  currentProgram: Program;

  @ApiProperty({
    description: 'Program',
    required: false,
  })
  @IsOptional()
  program: Program;

  @ApiProperty({
    description: 'Step',
    required: false,
  })
  @IsOptional()
  step: number;

  @ApiProperty({
    description: 'Status',
    required: false,
  })
  @IsOptional()
  status: FormStatusEnum;
}
