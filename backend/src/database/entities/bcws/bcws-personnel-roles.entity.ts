import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { BcwsRoleEntity } from './bcws-role.entity';
import { BcwsRole, ExperienceLevel } from '../../../common/enums/bcws';

@Entity('bcws_personnel_roles')
export class BcwsSectionsAndRolesEntity {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @ManyToOne(() => BcwsRoleEntity, (s) => s.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: BcwsRole;

  @Column({
    name: 'exp_level',
    type: 'enum',
    enum: ExperienceLevel,
    enumName: 'role-experience-level',
  })
  expLevel: ExperienceLevel;
}
