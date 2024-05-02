import { ApiProperty } from '@nestjs/swagger';
import { EmcrExperienceRO } from './experience.ro';
import { EmcrLocationRO } from './region-location.ro';
import { PersonnelRO } from '../personnel.ro';

export class EmcrRO extends PersonnelRO {
  @ApiProperty({
    description: "Personnel's work region and location",
    required: false,
    example: {
      id: 1,
      locationName: 'Victoria',
      region: 'SWE',
    },
  })
  workLocation?: EmcrLocationRO;

  @ApiProperty({
    description: "Personnel's home region and location",
    required: true,
    example: {
      id: 1,
      locationName: 'Victoria',
      regionName: 'SWE',
    },
  })
  homeLocation: EmcrLocationRO;

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