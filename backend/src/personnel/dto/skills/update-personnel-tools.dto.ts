import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonnelToolsDTO } from './create-personnel-tools.dto';

export class UpdatePersonnelToolsDTO extends CreatePersonnelToolsDTO {
  @ApiProperty({
    description: 'Tool id',
    required: true,
  })
  toolId: number;
}
