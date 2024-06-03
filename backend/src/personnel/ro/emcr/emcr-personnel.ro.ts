import { ApiProperty } from '@nestjs/swagger';
import { EmcrExperienceRO } from './experience.ro';
import { PersonnelRO } from '../personnel.ro';

export class EmcrRO extends PersonnelRO {
  @ApiProperty({
    description: 'Has finished ICS Training',
    required: true,
  })
  icsTraining: boolean;

  @ApiProperty({
    description: 'Experience with functions',
    required: true,
    isArray: true,
    type: () => EmcrExperienceRO,
  })
  experiences: EmcrExperienceRO[];
}
