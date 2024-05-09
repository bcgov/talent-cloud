import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BcwsCertificationEntity } from './bcws-certifications.entity';
import { BcwsPersonnelEntity } from './bcws-personnel.entity';
import { BcwsPersonnelCertificationRO } from '../../../personnel/ro/bcws';

@Entity('bcws_personnel_certifications')
export class BcwsPersonnelCertificationEntity {
  @ManyToOne(() => BcwsPersonnelEntity)
  @JoinColumn({ name: 'personnel_id' })
  personnel: BcwsPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @ManyToOne(() => BcwsCertificationEntity, (c) => c.id)
  @JoinColumn({ name: 'certification_id', referencedColumnName: 'id' })
  certification: BcwsCertificationEntity;

  @PrimaryColumn({ name: 'certification_id', type: 'int' })
  certificationId: number;

  @Column({
    name: 'expiry_date',
    type: 'date',
    nullable: true,
  })
  expiry?: Date;

  toResponseObject(): BcwsPersonnelCertificationRO {
    return {
      name: this.certification.name,
      expiry: this.expiry ?? null,
    };
  }
}
