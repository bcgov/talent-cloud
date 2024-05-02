import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import {
  Proficiency,
  LanguageLevelType,
} from '../../../common/enums/bcws/skills_certifications.enum';

@Entity('bcws_personnel_language')
export class Language {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @Column({ name: 'language', type: 'varchar' })
  language: string;

  @Column({ name: 'level', type: 'enum', enum: Proficiency })
  level: Proficiency;

  @Column({ name: 'level_type', type: 'enum', enum: LanguageLevelType })
  levelType: LanguageLevelType;
}
