import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { BcwsToolsEntity } from './bcws-tools.entity';
import { ToolsProficiency } from '../../../common/enums/bcws/tools.enum';
import { BcwsPersonnelToolsRO } from '../../../personnel/ro/bcws';

@Entity('bcws_personnel_tools')
export class BcwsPersonnelTools {
  @ManyToOne(() => BcwsPersonnelEntity, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @ManyToOne(() => BcwsToolsEntity, (b) => b.id, { eager: true })
  @JoinColumn({ name: 'tool_id', referencedColumnName: 'id' })
  tool: BcwsToolsEntity;

  @PrimaryColumn({ name: 'tool_id', type: 'int' })
  toolId: number;

  @Column({
    name: 'level',
    type: 'enum',
    enumName: 'tools-proficiency',
    enum: ToolsProficiency,
  })
  proficiencyLevel: ToolsProficiency;

  toResponseObject(): BcwsPersonnelToolsRO {
    return {
      tool: this.tool.name ?? null,
      proficiencyLevel: this.proficiencyLevel,
    };
  }
}
