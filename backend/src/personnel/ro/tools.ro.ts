import { ApiProperty } from '@nestjs/swagger';
import { Tools, ToolsName } from '../../common/enums';

export class BcwsToolsRO {
  @ApiProperty({
    description: 'Tool id',
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Tool name',
    required: true,
  })
  name: Tools;

  @ApiProperty({
    description: 'Tool name',
    required: true,
  })
  fullName: ToolsName;
}
