import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { BaseEntity } from './base.entity';
import { ExperienceEntity } from './personnel-function-experience.entity';
import { TrainingEntity } from './training.entity';
import { Classification } from '../../common/enums/classification.enum';
import { Ministry } from '../../common/enums/ministry.enum';
import { Region } from '../../common/enums/region.enum';
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
    name: 'work_location',
    type: 'varchar',
    length: 100,
  })
  workLocation: string;

  @Column({ name: 'region', type: 'enum', enum: Region, enumName: 'region' })
  region: Region;

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
    length: 25,
    nullable: true,
  })
  primaryPhone: string;

  @Column({
    name: 'secondary_phone',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  secondaryPhone?: string;

  @Column({ name: 'other_phone', type: 'varchar', length: 25, nullable: true })
  otherPhone: string;

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

  @Column({ name: 'notes', type: 'varchar', length: 512, nullable: true })
  notes: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;

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

  @OneToMany(() => ExperienceEntity, (ee) => ee.personnel)
  experiences: ExperienceEntity[];

  @OneToMany(() => AvailabilityEntity, (ae) => ae.personnel)
  availability: AvailabilityEntity[];

  @ManyToMany(() => TrainingEntity)
  @JoinTable({ name: 'personnel_training' })
  trainings: TrainingEntity[];

  toResponseObject(): PersonnelRO {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      primaryPhone: this.primaryPhone,
      secondaryPhone: this.secondaryPhone,
      otherPhone: this.otherPhone,
      region: this.region,
      workLocation: this.workLocation,
      ministry: this.ministry,
      classification: this.classification,
      applicationDate: this.applicationDate,
      skillsAbilities: this.skillsAbilities,
      notes: this.notes,
      supervisor: this.supervisor,
      active: this.active,
      remoteOnly: this.remoteOnly,
      willingToTravel: this.willingToTravel,
      experiences:
        this.experiences?.map((experience) => experience.toResponseObject()) ||
        [],
      // trainings
      // availability
      // available
    };
  }

  constructor(data: CreatePersonnelDTO) {
    super();
    Object.assign(this, data);
  }
}
