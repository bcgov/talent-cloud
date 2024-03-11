import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AvailabilityRO } from './availability.ro';
import { ExperienceRO } from './experience.ro';
import { UnionMembership, Ministry, Status } from '../../common/enums';
import { LocationRO } from '../../region-location/region-location.ro';

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
    description: 'Work phone number of personnel',
    required: false,
    example: '(250)882-5656',
  })
  workPhone: string;

  @ApiProperty({
    description: "Personnel's work region and location",
    required: true,
    example: {
      id: 1,
      locationName: 'Victoria',
      region: 'SWE',
    },
  })
  workLocation: LocationRO;

  @ApiProperty({
    description: "Personnel's home region and location",
    required: false,
    example: {
      id: 1,
      locationName: 'Victoria',
      regionName: 'SWE',
    },
  })
  homeLocation: LocationRO;

  @ApiProperty({
    description: "Personnel's ministry",
    required: true,
    example: Ministry.CITZ,
  })
  ministry: Ministry;

  @ApiProperty({
    description: "Personnel's unionMembership",
    required: true,
    example: UnionMembership.BCGEU,
  })
  unionMembership: UnionMembership;

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
    isArray: true,
    type: () => AvailabilityRO,
    required: false,
  })
  availability?: AvailabilityRO[];

  @ApiProperty({
    description: 'Date of last deployment (last date of the deployment)',
    required: false,
  })
  lastDeployed?: string;
}
