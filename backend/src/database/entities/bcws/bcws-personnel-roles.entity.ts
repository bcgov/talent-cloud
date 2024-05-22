import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { BcwsRoleEntity } from './bcws-role.entity';
import { ExperienceLevel } from '../../../common/enums/bcws';
import { BcwsPersonnelRoleRO } from '../../../personnel/ro/bcws';

@Entity('bcws_personnel_roles')
export class BcwsSectionsAndRolesEntity {
  @ManyToOne(() => BcwsPersonnelEntity)
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
      role: this.role.name,
      section: this.role.section,
      expLevel: this.expLevel,
    };
  }
}
