import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Status } from '../../../common/enums/status.enum';

export class BcwsPersonnelEntityRO {
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
  lastDeployedBCWS?: string;
}
