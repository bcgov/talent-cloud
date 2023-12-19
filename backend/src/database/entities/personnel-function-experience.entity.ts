// Join Table between Personnel and Functions
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FunctionEntity } from './function.entity';
import { PersonnelEntity } from './personnel.entity';
import { Experience } from '../../common/enums/experience.enum';

@Entity('personnel_function_experience')
export class ExperienceEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => PersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @ManyToOne(() => FunctionEntity)
  @JoinColumn({ name: 'function_id' })
  function: FunctionEntity;

  @Column({ name: 'experience_type', type: 'enum', enum: Experience, enumName: 'experience' })
  experienceType: Experience;
}