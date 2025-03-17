import { instanceToPlain } from 'class-transformer';
import { format } from 'date-fns';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { EmcrPersonnelEntity } from '../emcr';
import { Form } from '../form.entity';
import { AvailabilityEntity } from './availability.entity';
import { PersonnelCertificationEntity } from './personnel-certification.entity';
import { BcwsPersonnelEntity } from '../bcws';
import { LanguageEntity } from './personnel-language.entity';
import { PersonnelTools } from './personnel-tools.entity';
import { LocationEntity } from '../location.entity';
import { RecommitmentEntity } from '../recommitment/recommitment.entity';
import { Role } from '../../../auth/interface';
import {
  AvailabilityTypeLabel,
  DriverLicense,
  Ministry,
} from '../../../common/enums';
import { UnionMembership } from '../../../common/enums/union-membership.enum';
import { datePST } from '../../../common/helpers';
import { CreatePersonnelDTO } from '../../../personnel/dto/create-personnel.dto';
import { PersonnelRO } from '../../../personnel/ro/personnel.ro';

@Entity('personnel')
export class PersonnelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: '50' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '50' })
  lastName: string;

  @Column({
    name: 'primary_phone',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  primaryPhone: string;

  @Column({
    name: 'secondary_phone',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  secondaryPhone?: string;

  @Column({ name: 'other_phone', type: 'varchar', length: 10, nullable: true })
  workPhone: string;

  @Column({ name: 'email', type: 'varchar', length: 50 })
  email: string;

  @Column({ name: 'supervisor_first_name', type: 'varchar', length: 100 })
  supervisorFirstName: string;

  @Column({ name: 'supervisor_last_name', type: 'varchar', length: 100 })
  supervisorLastName: string;

  @Column({
    name: 'supervisor_email',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  supervisorEmail?: string;

  @Column({
    name: 'supervisor_phone',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  supervisorPhone?: string;

  @Column({
    name: 'union_membership',
    type: 'enum',
    enum: UnionMembership,
    enumName: 'union_membership',
  })
  unionMembership: UnionMembership;

  @OneToMany(() => AvailabilityEntity, (ae) => ae.personnel, { cascade: true })
  availability: AvailabilityEntity[];

  @OneToOne(() => Form, (form) => form.id, { nullable: true })
  @JoinColumn({ name: 'intake_form_id', referencedColumnName: 'id' })
  intakeForm?: Form;

  @Column({
    name: 'intake_form_id',
    nullable: true,
  })
  intakeFormId?: number;

  @Column({
    name: 'driver_licenses',
    type: 'simple-array',
    nullable: true,
  })
  driverLicense?: DriverLicense[];

  @Column({ name: 'jobTitle', type: 'varchar', length: 100, nullable: true })
  jobTitle?: string;

  @OneToOne(() => EmcrPersonnelEntity, (emcr) => emcr.personnel, {
    cascade: true,
  })
  emcr?: EmcrPersonnelEntity;

  @OneToOne(() => BcwsPersonnelEntity, (bcws) => bcws.personnel, {
    cascade: true,
  })
  bcws?: BcwsPersonnelEntity;

  @ManyToOne(() => LocationEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'work_location', referencedColumnName: 'id' })
  workLocation?: LocationEntity;

  @ManyToOne(() => LocationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'home_location', referencedColumnName: 'id' })
  homeLocation: LocationEntity;

  @Column({
    name: 'ministry',
    type: 'enum',
    enum: Ministry,
    enumName: 'ministry',
  })
  ministry: Ministry;

  @Column({ name: 'division', type: 'varchar', length: 100, nullable: true })
  division?: string;

  @OneToMany(() => LanguageEntity, (l) => l.personnel, { cascade: true })
  languages?: LanguageEntity[];

  @OneToMany(() => PersonnelCertificationEntity, (c) => c.personnel, {
    cascade: true,
  })
  certifications?: PersonnelCertificationEntity[];

  @OneToMany(() => PersonnelTools, (b) => b.personnel, { cascade: true })
  tools?: PersonnelTools[];

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
  emergencyContactLastName?: string;

  @Column({
    name: 'emergency_contact_phone_number',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  emergencyContactPhoneNumber?: string;

  @Column({
    name: 'emergency_contact_relationship',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  emergencyContactRelationship?: string;

  @Column({ name: 'employee_id', type: 'varchar', length: 6, nullable: true })
  employeeId: string;

  //TODO confirm length of paylist_id
  @Column({ name: 'paylist_id', type: 'varchar', length: 50, nullable: true })
  paylistId: string;

  @OneToMany(() => RecommitmentEntity, (r) => r.personnel)
  recommitment?: RecommitmentEntity[];

  @Column({
    name: 'availability_confirmed_until',
    type: 'date',
    nullable: true,
  })
  availabilityConfirmedUntil: Date;

  @Column({
    name: 'availability_confirmed_on',
    type: 'date',
    nullable: true,
  })
  availabilityConfirmedOn: Date;

  @Column({
    name: 'chips_last_ping',
    type: 'date',
    nullable: true,
  })
  chipsLastPing: Date;

  @Column({
    name: 'chips_last_action_date',
    type: 'date',
    nullable: true,
  })
  chipsLastActionDate: Date; // Action date, ie. when their CHIPS profile was last updated

  @Column({
    name: 'chips_profile_missing',
    type: 'boolean',
    default: false,
  })
  chipsProfileMissing: boolean;

  // Key can be any property of personnel entity, value is the previous value
  @Column({
    name: 'chips_last_updated_properties',
    type: 'jsonb',
    default: () => "'{}'",
  })
  chipsLastUpdatedProperties: { [key: string]: string | object };

  // Key can be any property of personnel entity, value is the error / issue
  @Column({
    name: 'chips_issues',
    type: 'jsonb',
    default: () => "'{}'",
  })
  chipsIssues: { [key: string]: string };

  // Unused for now. Potentially for ignoring properties that will be incorrect
  @Column({
    name: 'chips_ignore_properties',
    type: 'text',
    array: true,
    nullable: true,
  })
  chipsIgnoreProperties: string[];

  @Column({
    name: 'chips_training_data',
    array: false,
    type: 'jsonb',
    default: () => "'[]'",
  })
  chipsTrainingData: Array<{ id: string; name: string; completed: string }>;

  toResponseObject(
    roles: Role[],
    lastDeployed?: string,
  ): Record<string, PersonnelRO> {
    const response = new PersonnelRO();

    const data = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      employeeId: this.employeeId ?? '',
      paylistId: this.paylistId ?? '',
      email: this.email.toLowerCase(),
      primaryPhone: this.primaryPhone ?? '',
      secondaryPhone: this.secondaryPhone ?? '',
      workPhone: this.workPhone ?? '',
      unionMembership: this.unionMembership,
      supervisorFirstName: this.supervisorFirstName,
      supervisorLastName: this.supervisorLastName,
      supervisorEmail: this.supervisorEmail?.toLowerCase(),
      supervisorPhone: this.supervisorPhone ?? '',
      driverLicense: this.driverLicense ?? [],
      jobTitle: this.jobTitle ?? '',
      availabilityConfirmedUntil: this.availabilityConfirmedUntil ?? null,
      availabilityConfirmedOn: this.availabilityConfirmedOn ?? null,
      lastDeployed: lastDeployed ?? null,
      homeLocation: this.homeLocation?.toResponseObject(),
      workLocation: this.workLocation?.toResponseObject(),
      ministry: this.ministry,
      division: this?.division ?? '',
      tools: this.tools?.map((tool) => tool.toResponseObject()) ?? [],
      languages: this.languages?.map((lang) => lang.toResponseObject()) ?? [],
      certifications:
        this.certifications?.map((cert) => cert.toResponseObject()) ?? [],
      emergencyContactFirstName: this.emergencyContactFirstName ?? '',
      emergencyContactLastName: this.emergencyContactLastName ?? '',
      emergencyContactPhoneNumber: this.emergencyContactPhoneNumber ?? '',
      emergencyContactRelationship: this.emergencyContactRelationship ?? '',
      // trainings will not be returned until we have a more robust system
      availability:
        this.availability?.map((avail) => avail.toResponseObject()) ?? [],
      bcws: this?.bcws?.toResponseObject(roles) ?? null,
      emcr: this?.emcr?.toResponseObject(roles) ?? null,
      recommitment:
        this.recommitment?.map((itm) => itm.toResponseObject()) ?? null,
      chipsLastPing: this.chipsLastPing,
      chipsProfileMissing: this.chipsProfileMissing,
      chipsIssues: this.chipsIssues,
      chipsTrainingData: this.chipsTrainingData,
    };

    // If availability is empty (hence we requested it and nothing came back), we fill in a "today"
    if (
      data.availability.length === 0 ||
      data.availability === undefined ||
      !data.availability
    ) {
      data.availability = [
        {
          date: format(datePST(new Date()), 'yyyy-MM-dd'),
          availabilityType: AvailabilityTypeLabel.AVAILABLE,
          deploymentCode: '',
        },
      ];
    }
    // this is required in order to conditionally omit certain fields from the response based on the user role
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: roles });
  }

  constructor(data: CreatePersonnelDTO) {
    super();
    Object.assign(this, data);
  }
}
