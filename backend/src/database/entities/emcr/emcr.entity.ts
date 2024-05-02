import { instanceToPlain } from 'class-transformer';
import { differenceInDays } from 'date-fns';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EmcrExperienceEntity } from './emcr-function-experience.entity';
import { EmcrLocationEntity } from './emcr-location.entity';
import { EmcrTrainingEntity } from './emcr-training.entity';
import { PersonnelEntity } from '../personnel.entity';
import { Role } from '../../../auth/interface';
import { ICS_TRAINING_NAME } from '../../../common/const';
import { Status } from '../../../common/enums/status.enum';
import { CreatePersonnelEmcrDTO } from '../../../personnel/dto/emcr';
import { EmcrRO } from '../../../personnel/ro/emcr';

@Entity('emcr_personnel')
export class EmcrPersonnelEntity {
  @OneToOne(() => PersonnelEntity, (p) => p.id, { eager: true })
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @Column({ type: 'timestamp', name: 'date_joined', nullable: true })
  dateJoined: Date;

  @Column({ name: 'application_date', type: 'timestamp' })
  applicationDate: Date;

  @Column({ name: 'approved_by_supervisor', type: 'boolean', default: false })
  approvedBySupervisor: boolean;

  @Column({
    name: 'coordinator_notes',
    type: 'text',

    nullable: true,
  })
  coordinatorNotes: string;

  @Column({
    name: 'logistics_notes',
    type: 'text',

    nullable: true,
  })
  logisticsNotes: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @JoinColumn([
    {
      name: 'work_location',
      referencedColumnName: 'locationName',
    },
    { name: 'work_region', referencedColumnName: 'region' },
  ])
  @ManyToOne(() => EmcrLocationEntity, { eager: true, nullable: true })
  workLocation?: EmcrLocationEntity;

  @JoinColumn([
    {
      name: 'home_location',
      referencedColumnName: 'locationName',
    },
    { name: 'home_region', referencedColumnName: 'region' },
  ])
  @ManyToOne(() => EmcrLocationEntity, { eager: true, nullable: false })
  homeLocation: EmcrLocationEntity;

  @Column({
    name: 'first_aid_level',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  firstAidLevel?: string;

  @Column({ name: 'first_aid_expiry', type: 'date', nullable: true })
  firstAidExpiry?: string;

  @Column({ name: 'psychological_first_aid', type: 'boolean', nullable: true })
  psychologicalFirstAid?: boolean;

  @Column({ name: 'first_nation_exp_living', type: 'boolean', nullable: true })
  firstNationExperienceLiving?: boolean;

  @Column({ name: 'first_nation_exp_working', type: 'boolean', nullable: true })
  firstNationExperienceWorking?: boolean;

  @OneToMany(() => EmcrExperienceEntity, (e) => e.personnel, {
    cascade: true,
  })
  experiences: EmcrExperienceEntity[];

  @ManyToMany(() => EmcrTrainingEntity)
  @JoinTable({
    name: 'emcr_personnel_training',
    joinColumn: { name: 'personnel_id' },
    inverseJoinColumn: { name: 'training_id', referencedColumnName: 'id' },
  })
  training: EmcrTrainingEntity[];

  @Column({ name: 'emergency_exp', type: 'boolean', nullable: true })
  emergencyExperience?: boolean;

  @Column({ name: 'pecc_exp', type: 'boolean', nullable: true })
  peccExperience?: boolean;

  @Column({ name: 'preoc_exp', type: 'boolean', nullable: true })
  preocExperience?: boolean;

  toResponseObject(role: Role, lastDeployed?: string): Record<string, EmcrRO> {
    const response = new EmcrRO();

    const personnelData = this.personnel.toResponseObject(role, lastDeployed);
    const data = {
      ...personnelData,
      homeLocation: this?.homeLocation?.toResponseObject() ?? {},
      workLocation: this?.workLocation?.toResponseObject() ?? {},
      applicationDate: this.applicationDate,
      coordinatorNotes: this.coordinatorNotes,
      logisticsNotes: this.logisticsNotes,
      approvedBySupervisor: this.approvedBySupervisor,
      firstAidLevel: this.firstAidLevel ?? '',
      firstAidExpiry: this.firstAidExpiry ?? '',
      psychologicalFirstAid: this.psychologicalFirstAid ?? '',
      firstNationExperienceLiving: this.firstNationExperienceLiving ?? '',
      firstNationExperienceWorking: this.firstNationExperienceWorking ?? '',
      peccExperience: this.peccExperience ?? '',
      preocExperience: this.preocExperience ?? '',
      emergencyExperience: this.emergencyExperience ?? '',
      status: this.status,
      newMember:
        Status.ACTIVE && differenceInDays(new Date(), this.dateJoined) < 31,
      dateJoined: this.dateJoined,
      icsTraining:
        this.training?.some((t) => t.name === ICS_TRAINING_NAME) || false,
      experiences:
        this.experiences?.map((experience) => experience.toResponseObject()) ??
        [],
    };
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: [role] });
  }
  constructor(data: Partial<CreatePersonnelEmcrDTO>) {
    Object.assign(this, data);
  }
}
