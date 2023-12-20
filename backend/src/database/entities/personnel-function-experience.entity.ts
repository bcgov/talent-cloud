// Join Table between Personnel and Functions
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { FunctionEntity } from './function.entity';
import { PersonnelEntity } from './personnel.entity';
import { Experience } from '../../common/enums/experience.enum';

@Entity('personnel_function_experience')
export class ExperienceEntity {
  @ManyToOne(() => PersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @ManyToOne(() => FunctionEntity)
  @JoinColumn({ name: 'function_id' })
  function: FunctionEntity;

  @PrimaryColumn({  name: 'function_id' })
  functionId: number;

  @Column({ name: 'experience_type', type: 'enum', enum: Experience, enumName: 'experience' })
  experienceType: Experience;
}