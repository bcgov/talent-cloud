import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Status } from 'src/common/enums/status.enum';
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

  @ApiProperty({
    description: 'Date of last deployment (last date of the deployment)',
    required: false,
  })
  lastDeployedEMCR?: string;
}
