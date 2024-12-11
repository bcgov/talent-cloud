import { instanceToPlain } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RecommitmentCycleEntity } from './recommitment-cycle.entity';
import { PersonnelEntity } from '../personnel/personnel.entity';
import { RecommitmentStatus } from '../../../common/enums/recommitment-status.enum';
import { RecommitmentRO } from '../../../personnel/ro/recommitment.ro';
import { Role } from '../../../auth/interface';

@Entity('recommitment')
@Unique(['memberId', 'recommitmentCycleId'])
export class RecommitmentEntity {
  @PrimaryColumn({ name: 'member', type: 'uuid' })
  memberId: string;

  @ManyToOne(() => PersonnelEntity, p => p.recommitment)
  @JoinColumn({ name: 'member', referencedColumnName: 'id' })
  member: PersonnelEntity;

  @ManyToOne(() => RecommitmentCycleEntity, (r) => r.year)
  @JoinColumn({ name: 'year', referencedColumnName: 'year' })
  recommitmentCycle: RecommitmentCycleEntity;

  @PrimaryColumn({ name: 'year', type: 'integer' })
  recommitmentCycleId: number;

  @Column({
    name: 'emcr',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  emcr?: RecommitmentStatus | null;

  @Column({
    name: 'bcws',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  bcws?: RecommitmentStatus | null;

  @Column({ name: 'member_decision_date', type: 'timestamp', nullable: true })
  memberDecisionDate?: Date | null;

  @Column({
    name: 'member_reason_emcr',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  memberReasonEmcr?: string | null;

  @Column({
    name: 'member_reason_bcws',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  memberReasonBcws?: string | null;

  @Column({
    name: 'supervisor_idir',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  supervisorIdir?: string;

  @Column({
    name: 'supervisor_decision_date',
    type: 'timestamp',
    nullable: true,
  })
  supervisorDecisionDate?: Date;

  @Column({
    name: 'supervisor_reason_emcr',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  supervisorReasonEmcr?: string | null;

  @Column({
    name: 'supervisor_reason_bcws',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  supervisorReasonBcws?: string | null;

  toResponseObject(roles: Role[]): Record<string, RecommitmentRO> {
    const response = new RecommitmentRO();

    const data = {
      member: this.member,
      recommitmentCycle: this.recommitmentCycle?.toResponseObject(),
      emcr: this.emcr,
      bcws: this.bcws,
      memberDecisionDate: this.memberDecisionDate,
      memberReasonEmcr: this.memberReasonEmcr,
      memberReasonBcws: this.memberReasonBcws,
      supervisorIdir: this.supervisorIdir,
      supervisorDecisionDate: this.supervisorDecisionDate,
      supervisorReasonEmcr: this.supervisorReasonEmcr,
      supervisorReasonBcws: this.supervisorReasonBcws,

    };
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));

    return instanceToPlain(response, { groups: roles });
  }

  constructor(data: Partial<RecommitmentEntity>) {
    Object.assign(this, data);
  }
}
