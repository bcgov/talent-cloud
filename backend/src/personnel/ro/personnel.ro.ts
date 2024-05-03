import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AvailabilityRO } from './availability.ro';
import { Ministry } from '../../common/enums/ministry.enum';
import { Status } from '../../common/enums/status.enum';
import { UnionMembership } from '../../common/enums/union-membership.enum';

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
    description: 'Supervisor of Personnel First Name',
    required: true,
    example: 'Fred',
  })
  supervisorFirstName: string;

  @ApiProperty({
    description: 'Supervisor of Personnel Last Name',
    required: true,
    example: 'Andrews',
  })
  supervisorLastName: string;

  @ApiProperty({
    description: 'Supervisor of Personnel Email',
    required: false,
    example: 'fandrews@gov.bc.ca',
  })
  supervisorEmail: string;

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
    description: 'Availability',
    isArray: true,
    type: () => AvailabilityRO,
    required: false,
  })
  availability?: AvailabilityRO[];

  @ApiProperty({
    description: 'Date personnel applied',
    required: true,
    example: new Date(),
  })
  applicationDate: Date;
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
    description: 'Has member been approved by supervisor',
    required: true,
    example: false,
  })
  approvedBySupervisor: boolean;

  @ApiProperty({
    description: 'Is Personnel active in the roster',
    required: true,
    example: true,
  })
  status: Status;

  @ApiProperty({
    description: 'Is Personnel newly approved',
    required: false,
    example: true,
    default: false,
  })
  newMember: boolean;

  @ApiProperty({
    description: 'Date of last deployment (last date of the deployment)',
    required: false,
  })
  lastDeployed?: string;
}
