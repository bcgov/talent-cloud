import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Tools, ToolsProficiency } from '../../common/enums/bcws';

export class UpdatePersonnelToolsDTO {
  @ApiProperty({
    description: 'Tool name',
    required: true,
    enum: Tools,
    example: Tools.ADOBE,
  })
  tool: Tools;

  @ApiProperty({
    description: 'Proficiency level',
    required: true,
    example: ToolsProficiency.ADVANCED,
    type: 'enum',
    enumName: 'bcws-tools-proficiency',
    enum: ToolsProficiency,
  })
  @IsEnum(ToolsProficiency, {
    message: `Invalid proficiency level. Options are: ${Object.values(
      ToolsProficiency,
    )}`,
  })
  proficenyLevel: ToolsProficiency;
}
