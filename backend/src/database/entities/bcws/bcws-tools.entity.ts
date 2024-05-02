import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { Proficiency, ToolNames } from '../../../common/enums/bcws';

@Entity('bcws_personnel_tools')
export class BcwsTools {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @Column({ name: 'tool', type: 'enum', enum: ToolNames })
  name: ToolNames;

  @Column({ name: 'level', type: 'varchar' })
  proficenyLevel: Proficiency;
}
