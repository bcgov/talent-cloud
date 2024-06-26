import { ApiProperty } from '@nestjs/swagger';
import { Tools, ToolsProficiency } from '../../common/enums/bcws/tools.enum';

export class BcwsPersonnelToolsRO {
  @ApiProperty({
    description: 'Tool name',
    required: true,
    example: Tools.ADOBE,
    type: 'enum',
    enumName: 'bcws-tools',
    enum: Tools,
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
  proficiencyLevel: ToolsProficiency;
}
