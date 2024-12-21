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
import { Program, Role } from '../../../auth/interface';

@Entity('recommitment')
@Unique(['memberId', 'recommitmentCycleId', 'program']) 
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

  @PrimaryColumn({ name: 'program', type: 'enum', enum: Program })
  program: Program;

  @Column({
    name: 'emcr',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  status?: RecommitmentStatus | null;

  @Column({ name: 'member_decision_date', type: 'timestamp', nullable: true })
  memberDecisionDate?: Date | null;

  @Column({
    name: 'member_reason_emcr',
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
    name: 'supervisor_reason_emcr',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  supervisorReason?: string | null;



  toResponseObject(roles: Role[]): Record<string, RecommitmentRO> {
    const response = new RecommitmentRO();

    const data = {
      member: this.member,
      recommitmentCycle: this.recommitmentCycle?.toResponseObject(),
      status: this.status,
      memberDecisionDate: this.memberDecisionDate,
      memberReason: this.memberReason,
      supervisorIdir: this.supervisorIdir,
      supervisorDecisionDate: this.supervisorDecisionDate,
      supervisorReason: this.supervisorReason,
      

    };
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));

    return instanceToPlain(response, { groups: roles });
  }

  constructor(data: Partial<RecommitmentEntity>) {
    Object.assign(this, data);
  }
}
