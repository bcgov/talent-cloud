import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { BcwsTools } from './bcws-tools.entity';
import { ToolsProficiency } from '../../../common/enums/bcws/tools.enum';

@Entity('bcws_personnel_tools')
export class BcwsPersonnelTools {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @ManyToOne(() => BcwsTools, (b) => b.id)
  @JoinColumn({ name: 'tool_id', referencedColumnName: 'id' })
  tool: BcwsTools;

  @Column({
    name: 'level',
    type: 'enum',
    enumName: 'tools-proficiency',
    enum: ToolsProficiency,
  })
  proficenyLevel: ToolsProficiency;
}
