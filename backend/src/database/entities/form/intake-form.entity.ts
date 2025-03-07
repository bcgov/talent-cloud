import { FormStatusEnum } from '../../../common/enums/form-status.enum';
import { IntakeFormRO } from '../../../intake-form/ro/intake-form.ro';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Program } from '../../../auth/interface';
import { IntakeFormDTO } from '../../../intake-form/dto/intake-form.dto';
import { IntakeFormPersonnelData } from '../../../intake-form/types';



@Entity('intake_form')
export class IntakeFormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { default: {}, nullable: true, array: false })
  personnel?: IntakeFormPersonnelData;

  @Column({ name: 'created_by_email', nullable: true })
  createdByEmail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({
    name: 'status',
    nullable: true,
    type: 'enum',
    enum: FormStatusEnum,
  })
  status: FormStatusEnum;

  @Column({ name: 'program', nullable: true, type: 'enum', enum: Program })
  program: Program;

  toResponseObject(currentProgram?: Program): IntakeFormRO {
    return {
      id: this.id,
      personnel: this.personnel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdByEmail: this.createdByEmail,
      status: this.status ?? FormStatusEnum.DRAFT,
      program: this.program,
      currentProgram: currentProgram,
    };
  }

  constructor(data: Partial<IntakeFormDTO|IntakeFormEntity>) {
    Object.assign(this, data);
  }
}
