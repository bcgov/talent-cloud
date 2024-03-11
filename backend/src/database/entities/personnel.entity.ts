import { instanceToPlain } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { BaseEntity } from './base.entity';
import { LocationEntity } from './location.entity';
import { ExperienceEntity } from './personnel-function-experience.entity';
import { TrainingEntity } from './training.entity';
import { Role } from '../../auth/interface';
import { Status } from '../../common/enums';
import { Classification } from '../../common/enums/classification.enum';
import { Ministry } from '../../common/enums/ministry.enum';
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

  @Column({ type: 'date', name: 'date_joined' })
  dateJoined: Date;

  @JoinColumn([
    {
      name: 'work_location',
      referencedColumnName: 'locationName',
    },
    { name: 'work_region', referencedColumnName: 'region' },
  ])
  @ManyToOne(() => LocationEntity, { eager: true })
  workLocation: LocationEntity;

  @JoinColumn([
    {
      name: 'home_location',
      referencedColumnName: 'locationName',
    },
    { name: 'home_region', referencedColumnName: 'region' },
  ])
  @ManyToOne(() => LocationEntity, { eager: true })
  homeLocation: LocationEntity;

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

  @Column({ name: 'application_date', type: 'timestamp' })
  applicationDate: Date;

  @Column({ name: 'supervisor', type: 'varchar', length: 100 })
  supervisor: string;

  @Column({
    name: 'skills_abilities',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  skillsAbilities: string;

  @Column({
    name: 'coordinatorNotes',
    type: 'text',

    nullable: true,
  })
  coordinatorNotes: string;

  @Column({
    name: 'logisticsNotes',
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

  @Column({
    name: 'classification',
    type: 'enum',
    enum: Classification,
    enumName: 'classification',
  })
  classification: Classification;

  @Column({ name: 'remote_only', type: 'boolean', default: false })
  remoteOnly: boolean;

  @Column({ name: 'willing_to_travel', type: 'boolean', default: false })
  willingToTravel: boolean;

  @OneToMany(() => ExperienceEntity, (ee) => ee.personnel, { cascade: true })
  experiences: ExperienceEntity[];

  @OneToMany(() => AvailabilityEntity, (ae) => ae.personnel, { cascade: true })
  availability: AvailabilityEntity[];

  @ManyToMany(() => TrainingEntity)
  @JoinTable({ name: 'personnel_training' })
  trainings: TrainingEntity[];

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
      homeLocation: this?.homeLocation?.toResponseObject() ?? {},
      workLocation: this?.workLocation?.toResponseObject() ?? {},
      ministry: this.ministry,
      classification: this.classification,
      applicationDate: this.applicationDate,
      skillsAbilities: this.skillsAbilities,
      coordinatorNotes: this.coordinatorNotes,
      logisticsNotes: this.logisticsNotes,
      supervisor: this.supervisor,
      status: this.status,
      lastDeployed: lastDeployed ?? null,
      dateJoined: this.dateJoined,
      remoteOnly: this.remoteOnly,
      willingToTravel: this.willingToTravel,
      experiences:
        this.experiences?.map((experience) => experience.toResponseObject()) ||
        [],
      // // trainings
      availability:
        this.availability?.map((avail) => avail.toResponseObject()) || [],
    };
    // this is required in order to conditionally omit certain fields from the response based on the user role
    Object.keys(data).forEach((itm) => (response[itm] = data[itm]));
    return instanceToPlain(response, { groups: [role] });
  }

  constructor(data: CreatePersonnelDTO) {
    super();
    Object.assign(this, data);
  }
}
