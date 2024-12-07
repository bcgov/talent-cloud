import { instanceToPlain } from 'class-transformer';
import { differenceInDays } from 'date-fns';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BcwsSectionsAndRolesEntity } from './bcws-personnel-roles.entity';
import { PersonnelEntity } from '../personnel/personnel.entity';
import { Role } from '../../../auth/interface';
import { CreatePersonnelBcwsDTO } from '../../../bcws/dto/create-bcws-personnel.dto';
import { BcwsRO } from '../../../bcws/ro';
import { Section } from '../../../common/enums';
import { Status } from '../../../common/enums/status.enum';
import { TravelPreference } from '../../../common/enums/travel-preference.enum';
import { PersonnelRO } from '../../../personnel';

@Entity('bcws_personnel')
export class BcwsPersonnelEntity {
  @OneToOne(() => PersonnelEntity, (p) => p.id)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @Column({ name: 'status', type: 'enum', enum: Status, enumName: 'status' })
  status: Status;

  
  @Column({ name: 'date_applied', type: 'timestamp', nullable: true })
  dateApplied: Date;

  @Column({ name: 'date_approved', type: 'timestamp', nullable: true })
  dateApproved: Date;

  @Column({ name: 'approved_by_supervisor', type: 'boolean', default: false })
  approvedBySupervisor: boolean;

  @Column({ name: 'purchase_card_holder', type: 'boolean', default: false })
  purchaseCardHolder: boolean;


  @Column({
    name: 'liason_first_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  liaisonFirstName?: string;

  @Column({
    name: 'liason_last_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  liaisonLastName?: string;

  @Column({
    name: 'liason_phone_number',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  liaisonPhoneNumber?: string;

  @Column({ name: 'liason_email', type: 'varchar', length: 50, nullable: true })
  liaisonEmail?: string;

  @Column({ name: 'coordinator_notes', type: 'text', nullable: true })
  coordinatorNotes?: string;

  @Column({ name: 'logistics_notes', type: 'text', nullable: true })
  logisticsNotes?: string;

  @Column({ name: 'willingess_statement', type: 'boolean', default: false })
  willingnessStatement: boolean;

  @Column({ name: 'par_q', type: 'boolean', default: false })
  parQ: boolean;

  @Column({ name: 'workplace_policy', type: 'boolean', default: false })
  respectfulWorkplacePolicy: boolean;

  @Column({ name: 'orientation', type: 'boolean', default: false })
  orientation: boolean;

  @Column({
    name: 'travel_preference',
    type: 'enum',
    enum: TravelPreference,
    enumName: 'travel_preference',
    default: TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
  })
  travelPreference: TravelPreference;

  @Column({
    name: 'first_choice_section',
    type: 'enum',
    enum: Section,
    enumName: 'section',
    nullable: true,
  })
  firstChoiceSection?: Section;

  @Column({
    name: 'second_choice_section',
    type: 'enum',
    enum: Section,
    enumName: 'section',
    nullable: true,
  })
  secondChoiceSection?: Section;

  @OneToMany(() => BcwsSectionsAndRolesEntity, (s) => s.personnel, {
    cascade: true,
  })
  roles?: BcwsSectionsAndRolesEntity[];

  toResponseObject(
    roles: Role[],
    lastDeployed?: string,
  ): Record<string, BcwsRO> {
    const response = new BcwsRO();

    const personnelData: Record<string, PersonnelRO> =
      this?.personnel?.toResponseObject(roles, lastDeployed) ?? {};

    const data = {
      ...personnelData,
      
      dateApplied: this.dateApplied,
      dateApproved: this.dateApproved,
      coordinatorNotes: this.coordinatorNotes,
      logisticsNotes: this.logisticsNotes,
      approvedBySupervisor: this.approvedBySupervisor,
      status: this.status,
      newMember:
        Status.ACTIVE && differenceInDays(new Date(), this.dateApproved) < 6,
      purchaseCardHolder: this.purchaseCardHolder,
      liaisonFirstName: this.liaisonFirstName,
      liaisonLastName: this.liaisonLastName,
      liaisonPhoneNumber: this.liaisonPhoneNumber,
      liaisonEmail: this.liaisonEmail,
      willingnessStatement: this.willingnessStatement,
      parQ: this.parQ,
      respectfulWorkplacePolicy: this.respectfulWorkplacePolicy,
      orientation: this.orientation,
      firstChoiceSection: this.firstChoiceSection,
      secondChoiceSection: this.secondChoiceSection,
      travelPreference: this.travelPreference,
      roles: this.roles?.map((role) => role.toResponseObject()) ?? [],
    };

    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: roles });
  }
  constructor(data: Partial<CreatePersonnelBcwsDTO>) {
    Object.assign(this, data);
  }
}
