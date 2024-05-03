import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import {
  LanguageLevelType,
  LanguageProficiency,
} from '../../../common/enums/bcws/language.enum';

@Entity('bcws_personnel_language')
export class LanguageEntity {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @Column({ name: 'language', type: 'varchar' })
  language: string;

  @Column({
    name: 'level',
    type: 'enum',
    enum: LanguageProficiency,
    enumName: 'language-proficiency',
  })
  level: LanguageProficiency;

  @Column({
    name: 'level_type',
    type: 'enum',
    enum: LanguageLevelType,
    enumName: 'language-fluency-type',
  })
  levelType: LanguageLevelType;
}
