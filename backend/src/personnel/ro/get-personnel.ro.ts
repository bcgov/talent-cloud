import { ApiProperty } from '@nestjs/swagger';
import { PersonnelRO } from './personnel.ro';

export class GetPersonnelRO {
  @ApiProperty({
    name: 'rows',
    description: 'Number of rows returned (should be same as query parameter)',
    example: 10,
  })
  rows: number;

  @ApiProperty({
    name: 'page',
    description:
      'Page number given the number of rows (should be same as query parameter)',
    example: 1,
  })
  page: number;

  @ApiProperty({
    name: 'count',
    description: 'Total number of results',
    example: 33,
  })
  count: number;

  @ApiProperty({
    name: 'personnel',
    description: 'Personnel',
    isArray: true,
    type: () => PersonnelRO,
  })
  personnel: Record<'Personnel', PersonnelRO>[];
}
