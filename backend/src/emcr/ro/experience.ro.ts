import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '../../common/enums/emcr';
import { EmcrFunctionRO } from './function.ro';

export class EmcrExperienceRO {
  @ApiProperty({
    description: 'Id of function',
    required: true,
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Id of function',
    required: true,
  })
  function: EmcrFunctionRO

  @ApiProperty({
    description: 'Experience with function',
    required: true,
    example: Experience.CHIEF_EXPERIENCED,
  })
  experienceType: Experience;
}
