import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tools, ToolsName } from '../../../common/enums/bcws/tools.enum';
import { BcwsToolsRO } from '../../../personnel/ro/bcws/tools.ro';

@Entity('bcws_tools')
export class BcwsToolsEntity {
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
