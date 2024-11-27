import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesRO } from '../../../personnel/ro/roles.ro';
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

  toResponseObject(): RolesRO {
    return {
      id: this.id,
      section: this.section,
      name: this.name,
    };
  }
}
