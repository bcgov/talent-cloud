import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { ExperienceEntity } from './personnel-function-experience.entity';
import { TrainingEntity } from './training.entity';
import { Classification } from '../../common/enums/classification.enum';
import { Ministry } from '../../common/enums/ministry.enum';
import { Region } from '../../common/enums/region.enum';
import { WorkLocation } from '../../common/enums/work-location.enum';

@Entity('personnel')
export class PersonnelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: '50' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '50' })
  lastName: string;

  @Column({ name: 'work_location', type: 'enum', enum: WorkLocation, enumName: 'work-location' })
  workLocation: WorkLocation;

  @Column({ name: 'region', type: 'enum', enum: Region, enumName: 'region' })
  region: Region;

  @Column({ name: 'ministry', type: 'enum', enum: Ministry, enumName: 'ministry' })
  ministry: Ministry;

  @Column({ name: 'primary_phone', type: 'varchar', length: 15 })
  primaryPhone: string;

  @Column({ name: 'secondary_phone', type: 'varchar', length: 15 })
  secondaryPhone: string;

  @Column({ name: 'other_phone', type: 'varchar', length: 15 })
  otherPhone: string;

  @Column({ name: 'email', type: 'varchar', length: 50 })
  email: string;

  @Column({ name: 'application_date', type: 'timestamp' })
  applicationDate: Date;

  @Column({ name: 'supervisor', type: 'varchar', length: 100 })
  supervisor: string;

  @Column({ name: 'skills_abilities', type: 'varchar', length: 512 })
  skillsAbilities: string;

  @Column({ name: 'notes', type: 'varchar', length: 512 })
  notes: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;

  @Column({ name: 'classification', type: 'enum', enum: Classification, enumName: 'classification' })
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
}