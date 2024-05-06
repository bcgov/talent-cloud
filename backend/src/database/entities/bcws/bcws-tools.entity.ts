import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Tools } from '../../../common/enums/bcws/tools.enum';

@Entity('bcws_tools')
export class BcwsToolsEntity {
  @PrimaryColumn('int')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: Tools,
    enumName: 'bcws-tools',
  })
  name: Tools;

  toResponseObject() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
