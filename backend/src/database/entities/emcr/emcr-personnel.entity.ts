import { instanceToPlain } from 'class-transformer';
import { differenceInDays } from 'date-fns';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EmcrExperienceEntity } from './emcr-function-experience.entity';
import { EmcrTrainingEntity } from './emcr-training.entity';
import { PersonnelEntity } from '../personnel/personnel.entity';
import { Role } from '../../../auth/interface';
import { ICS_TRAINING_NAME } from '../../../common/const';
import { Status } from '../../../common/enums';
import { TravelPreference } from '../../../common/enums/travel-preference.enum';
import { CreatePersonnelEmcrDTO } from '../../../emcr/dto';
import { EmcrRO } from '../../../emcr/ro';
import { PersonnelRO } from '../../../personnel';

@Entity('emcr_personnel')
export class EmcrPersonnelEntity {
  @OneToOne(() => PersonnelEntity, (p) => p.id)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @Column({ type: 'timestamp', name: 'date_approved', nullable: true })
  dateApproved: Date;

  @Column({ name: 'date_applied', type: 'timestamp', nullable: true })
  dateApplied: Date;

  @Column({ name: 'approved_by_supervisor', type: 'boolean', default: false })
  approvedBySupervisor: boolean;

  @Column({
    name: 'first_choice_section',
    type: 'varchar',
    nullable: true,
  })
  firstChoiceSection?: string;

  @Column({
    name: 'second_choice_section',
    type: 'varchar',
    nullable: true,
  })
  secondChoiceSection?: string;

  @Column({
    name: 'third_choice_section',
    type: 'varchar',
    nullable: true,
  })
  thirdChoiceSection?: string;

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
    enumName: 'status',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({
    name: 'first_aid_level',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  firstAidLevel?: string;

  @Column({ name: 'first_aid_expiry', type: 'date', nullable: true })
  firstAidExpiry?: Date;

  @Column({ name: 'psychological_first_aid', type: 'boolean', nullable: true })
  psychologicalFirstAid?: boolean;

  @Column({ name: 'first_nation_exp_living', type: 'boolean', nullable: true })
  firstNationExperienceLiving?: boolean;

  @Column({ name: 'first_nation_exp_working', type: 'boolean', nullable: true })
  firstNationExperienceWorking?: boolean;

  @Column({
    name: 'travel_preference',
    type: 'enum',
    enum: TravelPreference,
    enumName: 'travel_preference',
    default: TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
  })
  travelPreference: TravelPreference;

  @OneToMany(() => EmcrExperienceEntity, (e) => e.personnel, {
    cascade: true,
  })
  experiences: EmcrExperienceEntity[];

  @ManyToMany(() => EmcrTrainingEntity, (t) => t.id, { cascade: true })
  @JoinTable({
    name: 'emcr_personnel_training',
    joinColumn: { name: 'personnel_id' },
    inverseJoinColumn: { name: 'training_id', referencedColumnName: 'id' },
  })
  trainings: EmcrTrainingEntity[];

  @Column({ name: 'emergency_exp', type: 'boolean', nullable: true })
  emergencyExperience?: boolean;

  @Column({ name: 'pecc_exp', type: 'boolean', nullable: true })
  peccExperience?: boolean;

  @Column({ name: 'preoc_exp', type: 'boolean', nullable: true })
  preocExperience?: boolean;

  toResponseObject(
    roles: Role[],
    lastDeployed?: string,
  ): Record<string, EmcrRO> {
    const response = new EmcrRO();
    const personnelData: Record<string, PersonnelRO> =
      this?.personnel?.toResponseObject(roles, lastDeployed) ?? {};
    const data = {
      ...personnelData,
      dateApplied: this.dateApplied ?? '',
      dateApproved: this.dateApproved ?? '',
      firstChoiceFunction: this.firstChoiceSection,
      secondChoiceFunction: this.secondChoiceSection,
      thirdChoiceFunction: this.thirdChoiceSection,
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
      travelPreference: this.travelPreference,
      newMember:
        Status.ACTIVE && differenceInDays(new Date(), this.dateApproved) < 6,
      icsTraining:
        this.trainings?.some((t) => t.name === ICS_TRAINING_NAME) || false,
      experiences:
        this?.experiences?.map((experience) => experience.toResponseObject()) ??
        [],
    };
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: roles });
  }
  constructor(data: Partial<CreatePersonnelEmcrDTO>) {
    Object.assign(this, data);
  }
}
