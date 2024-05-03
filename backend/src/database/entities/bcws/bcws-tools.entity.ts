import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Tools, ToolsName } from '../../../common/enums/bcws/tools.enum';

@Entity('bcws_tools')
export class BcwsTools {
  @PrimaryColumn('int')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: ToolsName,
    enumName: 'bcws-tools-name',
  })
  name: ToolsName;

  @Column({
    name: 'abbrv',
    type: 'enum',
    enum: Tools,
    enumName: 'bcws-tools-abbrv',
    nullable: true,
  })
  abbrv: Tools;

  @Column({
    name: 'expiry_date',
    type: 'date',
    nullable: true,
  })
  expiryDate: Date;
}
