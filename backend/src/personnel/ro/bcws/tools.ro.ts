import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  Tools,
  ToolsName,
  ToolsProficiency,
} from '../../../common/enums/bcws/tools.enum';

export class BcwsToolsRO {
  @ApiProperty({
    description: 'Personnel id',
    required: true,
    example: '1',
  })
  personnelId: string;
  @ApiProperty({
    description: 'Tool name',
    required: true,
    example: ToolsName.ADOBE,
  })
  toolName: ToolsName;
  @ApiProperty({
    description: 'Tool abbreviation',
    required: true,
    example: Tools.ADOBE,
  })
  abbrv: Tools;
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
  })
  proficenyLevel: ToolsProficiency;
}
