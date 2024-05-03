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
import { BcwsCertificationEntity } from './bcws-certifications.entity';
import { BcwsLocationEntity } from './bcws-location.entity';
import { LanguageEntity } from './bcws-personnel-language.entity';
import { BcwsSectionsAndRolesEntity } from './bcws-personnel-roles.entity';
import { BcwsPersonnelTools } from './bcws-personnel-tools.entity';
import { PersonnelEntity } from '../personnel.entity';
import { OFA, BcwsRole } from '../../../common/enums/bcws';
import { Status } from '../../../common/enums/status.enum';

@Entity('bcws_personnel')
export class BcwsPersonnelEntity {
  @OneToOne(() => PersonnelEntity, (p) => p.id)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @Column({ name: 'status', type: 'enum', enum: Status, enumName: 'status' })
  status: Status;

  @Column({ name: 'employee_id', type: 'varchar', length: 6 })
  employeeId: number;

  @Column({ name: 'date_applied', type: 'timestamp', nullable: true })
  dateApplied: Date;

  @Column({ name: 'date_approved', type: 'timestamp', nullable: true })
  dateApproved: Date;

  @ManyToOne(() => BcwsLocationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'work_fire_centre', referencedColumnName: 'id' })
  workFireCentre?: BcwsLocationEntity;

  @ManyToOne(() => BcwsLocationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'home_fire_centre', referencedColumnName: 'id' })
  homeFireCentre: BcwsLocationEntity;

  @Column({ name: 'purchase_card_holder', type: 'boolean', default: false })
  purchaseCardHolder: boolean;

  //TODO - add this once we have the values for the branch enum
  // @Column({ name: 'branch', type: 'enum', enum: Branch })
  // branch: Branch;

  @Column({ name: 'paylist_id', type: 'varchar' })
  paylistId: number;

  @Column({ name: 'liason_first_name', type: 'varchar' })
  liaisonFirstName: string;

  @Column({ name: 'liason_last_name', type: 'varchar' })
  liaisonLastName: string;

  @Column({ name: 'liason_phone_number', type: 'varchar' })
  liaisonPhoneNumber: string;

  @Column({ name: 'liason_email', type: 'varchar' })
  liaisonEmail: string;

  @Column({ name: 'coordinator_notes', type: 'varchar', nullable: true })
  coordinatorNotes?: string;

  @Column({ name: 'logistics_notes', type: 'varchar', nullable: true })
  logisticsNotes?: string;

  @Column({ name: 'supervisor_approval', type: 'boolean', default: false })
  supervisorApproval: boolean;

  @Column({ name: 'willingess_statement', type: 'boolean', default: false })
  willingnessStatement: boolean;

  @Column({ name: 'par_q', type: 'boolean', default: false })
  parQ: boolean;

  @Column({ name: 'workplace_policy', type: 'boolean', default: false })
  respectfulWorkplacePolicy: boolean;

  @Column({ name: 'orientation', type: 'boolean', default: false })
  orientation: boolean;

  @Column({
    name: 'highest_ofa',
    type: 'enum',
    enum: OFA,
    enumName: 'ofa',
    nullable: true,
  })
  highestOFA?: OFA;

  @Column({ name: 'ofa_expiry', type: 'timestamp', nullable: true })
  ofaExpiryDate?: Date;

  @Column({ name: 'food_safety_I', type: 'boolean', default: false })
  foodSafetyLevelI?: boolean;

  @Column({ name: 'food_safety_I_expiry', type: 'timestamp', nullable: true })
  foodSafetyCertificationLevelIExpiry?: Date;

  @Column({ name: 'food_safety_II', type: 'boolean', default: false })
  foodSafetyLevelII?: boolean;

  @Column({ name: 'food_safety_II_expiry', type: 'timestamp', nullable: true })
  foodSafetyCertificationLevelIIExpiry?: Date;

  @Column({
    name: 'second_choice_role',
    type: 'enum',
    enumName: 'bcws-role',
    enum: BcwsRole,
  })
  secondChoice: BcwsRole;

  @Column({
    name: 'first_choice_role',
    type: 'enum',
    enumName: 'bcws-role',
    enum: BcwsRole,
  })
  firstChoice: BcwsRole;

  @OneToMany(() => BcwsPersonnelTools, (b) => b.personnelId)
  tools?: BcwsPersonnelTools[];

  @ManyToMany(() => BcwsCertificationEntity)
  @JoinTable({
    name: 'bcws_personnel_certifications',
    joinColumn: { name: 'personnel_id' },
    inverseJoinColumn: { name: 'certification_id', referencedColumnName: 'id' },
  })
  certifications: BcwsCertificationEntity[];

  @OneToMany(() => BcwsSectionsAndRolesEntity, (s) => s.personnelId)
  sectionsAndRoles?: BcwsSectionsAndRolesEntity[];

  @OneToMany(() => LanguageEntity, (l) => l.personnelId)
  languages?: LanguageEntity[];
}
