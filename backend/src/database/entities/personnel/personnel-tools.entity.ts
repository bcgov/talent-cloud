import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { PersonnelEntity } from './personnel.entity';
import { ToolsEntity } from './tools.entity';

import { ToolsProficiency } from '../../../common/enums/bcws/tools.enum';
import { PersonnelToolsRO } from '../../../personnel/ro/personnel-tools.ro';

@Entity('personnel_tools')
export class PersonnelTools {
  @ManyToOne(() => PersonnelEntity, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'personnel_id', referencedColumnName: 'id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @ManyToOne(() => ToolsEntity, (b) => b.id, { eager: true })
  @JoinColumn({ name: 'tool_id', referencedColumnName: 'id' })
  tool: ToolsEntity;

  @PrimaryColumn({ name: 'tool_id', type: 'int' })
  toolId: number;

  @Column({
    name: 'level',
    type: 'enum',
    enumName: 'tools-proficiency',
    enum: ToolsProficiency,
  })
  proficiencyLevel: ToolsProficiency;

  toResponseObject(): PersonnelToolsRO {
    return {
      tool: this.tool.name ?? null,
      proficiencyLevel: this.proficiencyLevel,
    };
  }
}
