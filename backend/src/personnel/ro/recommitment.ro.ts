import { ApiProperty } from '@nestjs/swagger';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';

export class RecommitmentRO {
  @ApiProperty({ name: 'member_id', type: 'string' })
  memberId: string;

  @ApiProperty({ name: 'year', type: 'number' })
  year: number;

  @ApiProperty({
    name: 'emcr',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  emcr?: RecommitmentStatus | null;

  @ApiProperty({
    name: 'bcws',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  bcws?: RecommitmentStatus | null;

  @ApiProperty({
    name: 'member_decision_date',
    type: 'timestamp',
    nullable: true,
  })
  memberDecisionDate?: Date | null;

  @ApiProperty({
    name: 'member_reason_emcr',
    type: 'varchar',

    nullable: true,
  })
  memberReasonEmcr?: string | null;

  @ApiProperty({
    name: 'member_reason_bcws',
    type: 'varchar',

    nullable: true,
  })
  memberReasonBcws?: string | null;

  @ApiProperty({
    name: 'supervisor_idir',
    type: 'varchar',

    nullable: true,
  })
  supervisorIdir?: string;

  @ApiProperty({
    name: 'supervisor_decision_date',
    type: 'timestamp',
    nullable: true,
  })
  supervisorDecisionDate?: Date;

  @ApiProperty({
    name: 'supervisor_reason_emcr',
    type: 'varchar',

    nullable: true,
  })
  supervisorReasonEmcr?: string | null;

  @ApiProperty({
    name: 'supervisor_reason_bcws',
    type: 'varchar',

    nullable: true,
  })
  supervisorReasonBcws?: string | null;
}
