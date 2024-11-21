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
import { AvailabilityEntity } from './availability.entity';
import { BaseEntity } from './base.entity';
import { BcwsPersonnelEntity } from './bcws';
import { EmcrPersonnelEntity, LocationEntity } from './emcr';
import { Form } from './form.entity';
import { RecommitmentEntity } from './recommitment.entity';
import { Role } from '../../auth/interface';
import { AvailabilityType, DriverLicense, Ministry } from '../../common/enums';
import { UnionMembership } from '../../common/enums/union-membership.enum';
import { datePST } from '../../common/helpers';
import { CreatePersonnelDTO } from '../../personnel/dto/create-personnel.dto';
import { PersonnelRO } from '../../personnel/ro/personnel.ro';

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

  @OneToOne(() => RecommitmentEntity, (r) => r.memberId, { nullable: true })
  @JoinColumn({ name: 'recommitment', referencedColumnName: 'memberId' })
  recommitment?: RecommitmentEntity;

  toResponseObject(
    role: Role,
    lastDeployed?: string,
  ): Record<string, PersonnelRO> {
    const response = new PersonnelRO();

    const data = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      primaryPhone: this.primaryPhone ?? '',
      secondaryPhone: this.secondaryPhone ?? '',
      workPhone: this.workPhone ?? '',
      unionMembership: this.unionMembership,
      supervisorFirstName: this.supervisorFirstName,
      supervisorLastName: this.supervisorLastName,
      supervisorEmail: this.supervisorEmail,
      supervisorPhone: this.supervisorPhone ?? '',
      driverLicense: this.driverLicense ?? [],
      jobTitle: this.jobTitle ?? '',
      recommitment: this.recommitment?.toResponseObject() ?? null,
      lastDeployed: lastDeployed ?? null,
      homeLocation: this.homeLocation.toResponseObject(),
      workLocation: this.workLocation?.toResponseObject(),
      ministry: this.ministry,
      division: this?.division ?? '',
      // trainings will not be returned until we have a more robust system
      availability:
        this.availability?.map((avail) => avail.toResponseObject()) || [],
    };

    // If availability is empty (hence we requested it and nothing came back), we fill in a "today"
    if (this.availability && data.availability.length === 0) {
      data.availability = [
        new AvailabilityEntity({
          date: format(datePST(new Date()), 'yyyy-MM-dd'),
          availabilityType: AvailabilityType.NOT_INDICATED,
          deploymentCode: '',
        }),
      ];
    }

    // this is required in order to conditionally omit certain fields from the response based on the user role
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: [role] });
  }

  constructor(data: CreatePersonnelDTO) {
    super();
    Object.assign(this, data);
  }
}
