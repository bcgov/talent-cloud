import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BcwsToolsRO } from '../../../personnel/ro/tools.ro';
import { Tools, ToolsName } from '../../../common/enums/bcws/tools.enum';

@Entity('tools')
export class ToolsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: Tools,
    enumName: 'bcws-tools',
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
