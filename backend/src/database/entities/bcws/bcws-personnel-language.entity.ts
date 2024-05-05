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

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @Column({ name: 'language', type: 'varchar', length: 50 })
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
  type: LanguageLevelType;

  toResponseObject() {
    return {
      language: this.language,
      level: this.level,
      type: this.type,
    };
  }
}
