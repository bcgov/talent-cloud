import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EmcrExperienceRO } from './experience.ro';
import { TravelPreference } from '../../common/enums/travel-preference.enum';

export class EmcrRO {
  @ApiProperty()
  firstChoiceFunction?: string;

  @ApiProperty()
  secondChoiceFunction?: string;

  @ApiProperty()
  thirdChoiceFunction?: string;

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
    description: 'Travel Preferences',
    required: false,
  })
  travelPreference?: TravelPreference;

  

  @ApiProperty({
    description: 'Has experience working with First Nations',
    required: false,
  })
  firstNationExperience?: boolean;

  @ApiProperty({
    description: 'Has experience with PECC',
    required: false,
  })
  peccExperience?: boolean;

  @ApiProperty({
    description: 'Has experience with PREOC',
    required: false,
  })
  preocExperience?: boolean;

  @ApiProperty({
    description: 'Has experience with Emergency Response',
    required: false,
  })
  emergencyExperience?: boolean;

  @ApiProperty({
    description: 'Experience with functions',
    required: true,
    isArray: true,
    type: () => EmcrExperienceRO,
  })
  experiences: EmcrExperienceRO[];
}
