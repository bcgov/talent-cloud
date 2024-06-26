import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '../../common/enums/emcr';

export class EmcrExperienceRO {
  @ApiProperty({
    description: 'Id of function',
    required: true,
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Name of function',
    required: true,
    example: 'Operations',
  })
  functionName: string;

  @ApiProperty({
    description: 'Abbreviated name of function',
    required: true,
    example: 'Ops',
  })
  functionAbbrv: string;

  @ApiProperty({
    description: 'Experience with function',
    required: true,
    example: Experience.CHIEF_EXPERIENCED,
  })
  experienceType: Experience;
}
