import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BcwsRole, Section } from '../../../common/enums/bcws';

@Entity('bcws_role')
export class BcwsRoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: BcwsRole,
    enumName: 'bcws-role',
  })
  name: BcwsRole;

  @Column({
    name: 'section',
    enum: Section,
    enumName: 'bcws-role-section',
    type: 'enum',
  })
  section: Section;
}
