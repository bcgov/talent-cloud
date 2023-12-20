import { ApiProperty } from '@nestjs/swagger';
import { Classification } from '../common/enums/classification.enum';
import { Ministry } from '../common/enums/ministry.enum';
import { Region } from '../common/enums/region.enum';
import { WorkLocation } from '../common/enums/work-location.enum';

export class CreatePersonnelDTO {
  @ApiProperty({
    description: 'First Name of Personnel - Possibly taken from IDIR',
    example: 'Jane',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last Name of Personnel - Possibly taken from IDIR',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Personnel\'s work location',
    enum: WorkLocation,
    example: WorkLocation.VICTORIA,
  })
  workLocation: WorkLocation;

  @ApiProperty({
    description: 'Region personnel works in',
    enum: Region,
    example: Region.VIC,
  })
  region: Region;

  @ApiProperty({
    description: 'Ministry personnel works in',
    enum: Ministry,
    example: Ministry.EMCR,
  })
  ministry: Ministry;

  @ApiProperty({
    description: 'Primary phone number to contact personnel',
    example: '2501112222',
  })
  primaryPhone: string;

  @ApiProperty({
    description: 'Secondary phone number to contact personnel',
    example: '2503334444',
  })
  secondaryPhone: string;

  @ApiProperty({
    description: 'Any other phone number to contact personnel',
    example: '2505556666',
  })
  otherPhone: string;

  @ApiProperty({
    description: 'Email address with which to contact participant - possibly the one attached to their IDIR',
    example: 'janedoe123@gov.bc.ca',
  })
  email: string;

  @ApiProperty({
    description: 'Name of personnel\'s supervisor',
    example: 'River Cartwright',
  })
  supervisor: string;

  @ApiProperty({
    description: 'Any notable skills and abilities this personnel might have',
    example: 'Indigenous Relations trained, Swift Water Training',
  })
  skillsAbilities: string;

  @ApiProperty({
    description: 'Any other notes for this personnel',
    example: 'BCGEU',
  })
  notes: string;

  @ApiProperty({
    description: 'Classification of personnel',
    enum: Classification,
    example: Classification.BCGEU,
  })
  classification: Classification;

  @ApiProperty({
    description: 'If this personnel is remote only',
    example: false,
  })
  remoteOnly: boolean;

  @ApiProperty({
    description: 'If this personnel is willing to travel',
    example: false,
  })
  willingToTravel: boolean;

  @ApiProperty({
    description: 'What trainings this personnel has had',
    example: ['ICS100', 'THE_CORE', 'WEBEOC'],
  })
  trainings: string[];

  @ApiProperty({
    description: 'Experiences this personnel has had in specific functions',
    example: [
      {
        function: 'OPS',
        experience: 'CHIEF'
      },
      {
        function: 'LOGS',
        experience: 'CHIEF',
      },
      {
        function: 'PLANS',
        experience: 'INTERESTED',
      }
    ]
  })
  experiences: { function: string, experience: string }[];
}