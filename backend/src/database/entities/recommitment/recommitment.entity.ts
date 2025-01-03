import { instanceToPlain } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { RecommitmentCycleEntity } from './recommitment-cycle.entity';
import { PersonnelEntity } from '../personnel/personnel.entity';
import { Program, Role } from '../../../auth/interface';
import { RecommitmentStatus } from '../../../common/enums/recommitment-status.enum';
import { RecommitmentRO } from '../../../personnel/ro/recommitment.ro';

@Entity('recommitment')
@Unique(['personnelId', 'recommitmentCycleId', 'program'])
export class RecommitmentEntity {
  @PrimaryColumn({ name: 'personnel', type: 'uuid' })
  personnelId: string;

  @ManyToOne(() => PersonnelEntity, (p) => p.id)
  @JoinColumn({ name: 'personnel', referencedColumnName: 'id' })
  personnel: PersonnelEntity;

  @ManyToOne(() => RecommitmentCycleEntity, (r) => r.year)
  @JoinColumn({ name: 'year', referencedColumnName: 'year' })
  recommitmentCycle: RecommitmentCycleEntity;

  @PrimaryColumn({ name: 'year', type: 'integer' })
  recommitmentCycleId: number;

  @PrimaryColumn({ name: 'program', type: 'enum', enum: Program })
  program: Program;

  @Column({
    name: 'status',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  status?: RecommitmentStatus | null;

  @Column({ name: 'member_decision_date', type: 'timestamp', nullable: true })
  memberDecisionDate?: Date | null;

  @Column({
    name: 'member_reason',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  memberReason?: string | null;

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
    name: 'supervisor_reason',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  supervisorReason?: string | null;

  toResponseObject(roles: Role[]): Record<string, RecommitmentRO> {
    const response = new RecommitmentRO();

    const data = {
      personnelId: this.personnelId,
      personnel: this.personnel.toResponseObject(roles),
      recommitmentCycle: this.recommitmentCycle?.toResponseObject(),
      status: this.status,
      program: this.program,
      memberDecisionDate: this.memberDecisionDate,
      memberReason: this.memberReason,
      supervisorIdir: this.supervisorIdir,
      supervisorDecisionDate: this.supervisorDecisionDate,
      supervisorReason: this.supervisorReason,
    };
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));

    return instanceToPlain(response, { groups: roles });
  }
}
