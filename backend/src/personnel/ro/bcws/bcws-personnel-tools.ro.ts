import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  ToolsName,
  ToolsProficiency,
} from '../../../common/enums/bcws/tools.enum';

export class BcwsPersonnelToolsRO {
  @ApiProperty({
    description: 'Personnel id',
  })
  personnelId: string;

  @ApiProperty({
    description: 'Tool name',
    required: true,
    example: ToolsName.ADOBE,
    type: 'enum',
    enumName: 'bcws-tools',
    enum: ToolsName,
  })
  toolName: ToolsName;

  @ApiProperty({
    description: 'Expiry date',
    required: false,
    example: '2022-10-10',
  })
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({
    description: 'Proficiency level',
    required: true,
    example: ToolsProficiency.ADVANCED,
    type: 'enum',
    enumName: 'bcws-tools-proficiency',
    enum: ToolsProficiency,
  })
  proficenyLevel: ToolsProficiency;
}
