import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AvailabilityRO } from './availability.ro';
import { ExperienceRO } from './experience.ro';
import { Classification, Ministry, Region, Status } from '../../common/enums';

export class PersonnelRO {
  @ApiProperty({
    description: 'Personnel id',
    required: true,
    example: '0594f370-46ef-449d-b559-a3fd62ba3f3e',
  })
  id: string;

  @ApiProperty({
    description: 'First name of personnel',
    required: true,
    example: 'Archie',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of personnel',
    required: true,
    example: 'Andrews',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email of personnel',
    required: true,
    example: 'aandrews@gov.bc.ca',
  })
  email: string;

  @ApiProperty({
    description: 'Primary phone number of personnel',
    required: true,
    example: '(250)888-1212',
  })
  primaryPhone: string;

  @ApiProperty({
    description: 'Secondary phone number of personnel',
    required: false,
    example: '(250)881-3434',
  })
  secondaryPhone: string;

  @ApiProperty({
    description: 'Other phone number of personnel',
    required: false,
    example: '(250)882-5656',
  })
  otherPhone: string;

  @ApiProperty({
    description: "Personnel's region",
    required: true,
    example: Region.SWE,
  })
  region: Region;

  @ApiProperty({
    description: "Personnel's work location",
    required: true,
    example: 'Abbotsford',
  })
  workLocation: string;

  @ApiProperty({
    description: "Personnel's ministry",
    required: true,
    example: Ministry.CITZ,
  })
  ministry: Ministry;

  @ApiProperty({
    description: "Personnel's classification",
    required: true,
    example: Classification.BCGEU,
  })
  classification: Classification;

  @ApiProperty({
    description: 'Date personnel applied',
    required: true,
    example: new Date(),
  })
  applicationDate: Date;

  @ApiProperty({
    description: "Personnel's noted skills and abilities",
    required: false,
    example: 'IT experience',
  })
  skillsAbilities: string;

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
    description: 'Supervisor of Personnel',
    required: true,
    example: 'Fred Andrews',
  })
  supervisor: string;

  @ApiProperty({
    description: 'Is Personnel active in the roster',
    required: true,
    example: true,
  })
  status: Status;

  @ApiProperty({
    description: 'Is Personnel remote only',
    required: true,
    example: false,
  })
  remoteOnly: boolean;

  @ApiProperty({
    description: 'Is Personnel willing to travel',
    required: true,
    example: true,
  })
  willingToTravel: boolean;

  @ApiProperty({
    description: 'Experience with functions',
    required: true,
    isArray: true,
    type: () => ExperienceRO,
  })
  experiences: ExperienceRO[];

  @ApiProperty({
    description: 'Availability',
    required: true,
    isArray: true,
    type: () => AvailabilityRO,
  })
  availability: AvailabilityRO[];
}
