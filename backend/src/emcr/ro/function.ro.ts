import { ApiProperty } from '@nestjs/swagger';

export class EmcrFunctionRO {
  @ApiProperty({
    description: 'Function id',
    required: true,
    example: '10',
  })
  id: number;

  @ApiProperty({
    description: 'Function name',
    required: true,
    example: 'Operations',
  })
  name: string;

  @ApiProperty({
    description: 'Function abbreviated name',
    required: true,
    example: 'Ops',
  })
  abbreviation: string;
}
