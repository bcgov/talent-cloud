import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { Section, BcwsRole, ExperienceLevel } from '../../../common/enums/bcws';

@Entity('bcws_sections_and_roles')
export class BcwsSectionsAndRoles {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @Column({ name: 'role', type: 'enum', enum: BcwsRole })
  role: BcwsRole;

  @Column({ name: 'section', type: 'enum', enum: Section })
  section: Section;

  @Column({ name: 'exp_level', type: 'enum', enum: ExperienceLevel })
  expLevel: ExperienceLevel;
}
