import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EmcrExperienceRO } from './experience.ro';

export class EmcrRO {
  @ApiProperty()
  firstChoiceFunction?: string;

  @ApiProperty()
  secondChoiceFunction?: string;

  @ApiProperty()
  thirdChoiceSection?: string;

  @ApiProperty({
    description: 'Notes about Personnel - Only vieweable by coordinators',
    required: false,
    example: 'MOTI Area Roads Mgr R24',
  })
  @Expose({ groups: ['coordinator'] })
  coordinatorNotes: string;

  @ApiProperty({
    description: 'Notes about Personnel',
    required: false,
    example: 'MOTI Area Roads Mgr R24',
  })
  logisticsNotes: string;

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
