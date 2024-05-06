import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ToolsName } from '../../../common/enums/bcws/tools.enum';

@Entity('bcws_tools')
export class BcwsToolsEntity {
  @PrimaryColumn('int')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: ToolsName,
    enumName: 'bcws-tools-name',
  })
  name: ToolsName;

  toResponseObject() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
