import { ApiProperty } from '@nestjs/swagger';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';
import { PersonnelEntity } from '../../database/entities/personnel/personnel.entity';

export class RecommitmentRO {
  @ApiProperty({ name: 'personnel_id', type: 'string' })
  personnelId: string;

  @ApiProperty()
  personnel?: PersonnelEntity;

  @ApiProperty({ name: 'year', type: 'number' })
  year: number;

  @ApiProperty({ name: 'endDate', type: 'date' })
  endDate: Date;

  @ApiProperty({
    name: 'status',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  status?: RecommitmentStatus | null;

  @ApiProperty({
    name: 'member_decision_date',
    type: 'timestamp',
    nullable: true,
  })
  memberDecisionDate?: Date | null;

  @ApiProperty({
    name: 'member_reason',
    type: 'varchar',

    nullable: true,
  })
  memberReason?: string | null;

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
    name: 'supervisor_reason_bcws',
    type: 'varchar',

    nullable: true,
  })
  supervisorReason?: string | null;
}
