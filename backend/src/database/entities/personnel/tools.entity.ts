import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tools, ToolsName } from '../../../common/enums/bcws/tools.enum';
import { BcwsToolsRO } from '../../../personnel/ro/tools.ro';

@Entity('tool')
export class ToolsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: Tools,
    enumName: 'tools',
  })
  name: Tools;

  toResponseObject(): BcwsToolsRO {
    return {
      id: this.id,
      name: this.name,
      fullName: ToolsName[this.name],
    };
  }
}
