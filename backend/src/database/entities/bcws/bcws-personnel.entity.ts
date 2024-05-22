import { instanceToPlain } from 'class-transformer';
import { differenceInDays } from 'date-fns';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BcwsPersonnelCertificationEntity } from './bcws-personnel-certification.entity';
import { LanguageEntity } from './bcws-personnel-language.entity';
import { BcwsSectionsAndRolesEntity } from './bcws-personnel-roles.entity';
import { BcwsPersonnelTools } from './bcws-personnel-tools.entity';
import { DivisionEntity } from '../division.entity';
import { LocationEntity } from '../location.entity';
import { PersonnelEntity } from '../personnel.entity';
import { Role } from '../../../auth/interface';
import { Status } from '../../../common/enums/status.enum';
import { CreatePersonnelBcwsDTO } from '../../../personnel/dto/bcws/create-bcws-personnel.dto';
import { BcwsRO } from '../../../personnel/ro/bcws';
import { Section } from '../../../common/enums';

@Entity('bcws_personnel')
export class BcwsPersonnelEntity {
  @OneToOne(() => PersonnelEntity, (p) => p.id)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @Column({ name: 'status', type: 'enum', enum: Status, enumName: 'status' })
  status: Status;

  @Column({ name: 'employee_id', type: 'varchar', length: 6 })
  employeeId: number;

  @Column({ name: 'date_applied', type: 'timestamp', nullable: true })
  dateApplied: Date;

  @Column({ name: 'date_approved', type: 'timestamp', nullable: true })
  dateApproved: Date;

  @Column({ name: 'approved_by_supervisor', type: 'boolean', default: false })
  approvedBySupervisor: boolean;

  @ManyToOne(() => LocationEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'work_fire_centre', referencedColumnName: 'id' })
  workFireCentre?: LocationEntity;

  @ManyToOne(() => LocationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'home_fire_centre', referencedColumnName: 'id' })
  homeFireCentre: LocationEntity;

  @Column({ name: 'purchase_card_holder', type: 'boolean', default: false })
  purchaseCardHolder: boolean;

  @ManyToOne(() => DivisionEntity, (d) => d.id)
  @JoinColumn({ name: 'division_id', referencedColumnName: 'id' })
  division: DivisionEntity;

  //TODO confirm length of paylist_id
  @Column({ name: 'paylist_id', type: 'varchar', length: 6 })
  paylistId: number;

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

  @Column({
    name: 'emergency_contact_first_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  emergencyContactFirstName?: string;

  @Column({
    name: 'emergency_contact_last_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  emergencyContactlastName?: string;

  @Column({
    name: 'emergency_contact_phone_number',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  emergencyContactPhoneNumber?: string;

  @Column({ name: 'emergency_contact_relationship', type: 'varchar', length: 50, nullable: true })
  emergencyContactRelationship?: string;

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

  @Column({ name: 'first_choice_section', type: 'enum', enum: Section, enumName: 'section', nullable: true })
  firstChoiceSection?: Section;

  @Column({ name: 'second_choice_section', type: 'enum', enum: Section, enumName: 'section', nullable: true })
  secondChoiceSection?: Section;

  @OneToMany(() => BcwsPersonnelTools, (b) => b.personnel, { cascade: true })
  tools?: BcwsPersonnelTools[];

  @OneToMany(() => BcwsSectionsAndRolesEntity, (s) => s.personnel, {
    cascade: true,
  })
  roles?: BcwsSectionsAndRolesEntity[];

  @OneToMany(() => LanguageEntity, (l) => l.id, { cascade: true })
  languages?: LanguageEntity[];

  @OneToMany(() => BcwsPersonnelCertificationEntity, (c) => c.personnel, {
    cascade: true,
  })
  certifications: BcwsPersonnelCertificationEntity[];

  toResponseObject(role: Role, lastDeployed?: string): Record<string, BcwsRO> {
    const response = new BcwsRO();

    const personnelData = this.personnel.toResponseObject(role, lastDeployed);
    const data = {
      ...personnelData,
      homeLocation: this?.homeFireCentre?.toResponseObject() ?? {},
      workLocation: this?.workFireCentre?.toResponseObject() ?? {},
      employeeId: this.employeeId,
      paylistId: this.paylistId,
      dateApplied: this.dateApplied,
      dateApproved: this.dateApproved,
      coordinatorNotes: this.coordinatorNotes,
      logisticsNotes: this.logisticsNotes,
      approvedBySupervisor: this.approvedBySupervisor,
      status: this.status,
      newMember:
        Status.ACTIVE && differenceInDays(new Date(), this.dateApproved) < 31,
      purchaseCardHolder: this.purchaseCardHolder,
      liaisonFirstName: this.liaisonFirstName,
      liaisonLastName: this.liaisonLastName,
      liaisonPhoneNumber: this.liaisonPhoneNumber,
      liaisonEmail: this.liaisonEmail,
      willingnessStatement: this.willingnessStatement,
      parQ: this.parQ,
      respectfulWorkplacePolicy: this.respectfulWorkplacePolicy,
      ministry: this.division?.toResponseObject().ministry,
      division: this.division?.toResponseObject().division,
      orientation: this.orientation,
      firstChoiceSection: this.firstChoiceSection,
      secondChoiceSection: this.secondChoiceSection,
      tools: this.tools?.map((tool) => tool.toResponseObject()) ?? [],
      languages: this.languages?.map((lang) => lang.toResponseObject()) ?? [],
      roles: this.roles?.map((role) => role.toResponseObject()) ?? [],
      certifications: this.certifications?.map((cert) => cert.toResponseObject()) ?? [],
    };
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: [role] });
  }
  constructor(data: Partial<CreatePersonnelBcwsDTO>) {
    Object.assign(this, data);
  }
}
