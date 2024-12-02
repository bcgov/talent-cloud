import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { BcwsRoleEntity } from './bcws-role.entity';
import { BcwsPersonnelRoleRO } from '../../../bcws/ro';
import { BcwsRoleName, ExperienceLevel } from '../../../common/enums/bcws';

@Entity('bcws_personnel_roles')
export class BcwsSectionsAndRolesEntity {
  @ManyToOne(() => BcwsPersonnelEntity, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @ManyToOne(() => BcwsRoleEntity, (s) => s.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: BcwsRoleEntity;

  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;

  @Column({
    name: 'exp_level',
    type: 'enum',
    enum: ExperienceLevel,
    enumName: 'role-experience-level',
  })
  expLevel: ExperienceLevel;

  toResponseObject(): BcwsPersonnelRoleRO {
    return {
      id: this.roleId,
      personnel_id: this.personnelId,
      role: this.role.name,
      roleName: BcwsRoleName[this.role.name],
      section: this.role.section,
      expLevel: this.expLevel,
    };
  }
}
