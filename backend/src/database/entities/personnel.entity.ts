import { instanceToPlain } from 'class-transformer';
import { format } from 'date-fns';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { BaseEntity } from './base.entity';
import { BcwsPersonnelEntity } from './bcws';
import { EmcrPersonnelEntity } from './emcr';
import { Form } from './form.entity';
import { Role } from '../../auth/interface';
import { AvailabilityType } from '../../common/enums/availability-type.enum';
import { Ministry } from '../../common/enums/emcr';
import { UnionMembership } from '../../common/enums/union-membership.enum';
import { datePST } from '../../common/helpers';
import { CreatePersonnelDTO, PersonnelRO } from '../../personnel';

@Entity('personnel')
export class PersonnelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: '50' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '50' })
  lastName: string;

  @Column({
    name: 'ministry',
    type: 'enum',
    enum: Ministry,
    enumName: 'ministry',
  })
  ministry: Ministry;

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
    name: 'union_membership',
    type: 'enum',
    enum: UnionMembership,
    enumName: 'union_membership',
  })
  unionMembership: UnionMembership;

  @Column({ name: 'remote_only', type: 'boolean', default: false })
  remoteOnly: boolean;

  @Column({ name: 'willing_to_travel', type: 'boolean', default: false })
  willingToTravel: boolean;

  @OneToMany(() => AvailabilityEntity, (ae) => ae.personnel, { cascade: true })
  availability: AvailabilityEntity[];

  @OneToOne(() => Form, (form) => form.id, { nullable: true })
  @JoinColumn({ name: 'intake_form_id', referencedColumnName: 'id' })
  intakeForm?: Form;

  @Column({ name: 'jobTitle', type: 'varchar', length: 100, nullable: true })
  jobTitle?: string;

  @Column({
    name: 'driver_license(s)',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  driverLicense?: string[];

  @OneToOne(() => EmcrPersonnelEntity, (e) => e.personnel)
  emcr: EmcrPersonnelEntity;

  @OneToOne(() => BcwsPersonnelEntity, (b) => b.personnel)
  bcws: BcwsPersonnelEntity;

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
      primaryPhone: this.primaryPhone,
      secondaryPhone: this.secondaryPhone,
      workPhone: this.workPhone,
      ministry: this.ministry,
      unionMembership: this.unionMembership,
      lastDeployed: lastDeployed ?? null,
      supervisorFirstName: this.supervisorFirstName,
      supervisorLastName: this.supervisorLastName,
      supervisorEmail: this.supervisorEmail ?? '',
      driverLicense: this.driverLicense ?? '',
      jobTitle: this.jobTitle ?? '',
      remoteOnly: this.remoteOnly,
      willingToTravel: this.willingToTravel,
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
