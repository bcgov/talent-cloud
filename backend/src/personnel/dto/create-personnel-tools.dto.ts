import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ToolsProficiency } from '../../common/enums/bcws';

export class CreatePersonnelToolsDTO {
  @ApiProperty({
    description: 'Tool id',
    required: true,
  })
  toolId: number;

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
  proficiencyLevel: ToolsProficiency;
}
