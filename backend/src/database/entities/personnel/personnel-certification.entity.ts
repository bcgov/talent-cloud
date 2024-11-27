import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CertificationEntity } from './certifications.entity';
import { PersonnelEntity } from './personnel.entity';
import { PersonnelCertificationRO } from '../../../personnel/ro/personnel-certitifications.ro';

@Entity('personnel_certifications')
export class PersonnelCertificationEntity {
  @ManyToOne(() => PersonnelEntity, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'personnel_id', referencedColumnName: 'id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @ManyToOne(() => CertificationEntity, (c) => c.id)
  @JoinColumn({ name: 'certification_id', referencedColumnName: 'id' })
  certification: CertificationEntity;

  @PrimaryColumn({ name: 'certification_id', type: 'int' })
  certificationId: number;

  @Column({
    name: 'expiry_date',
    type: 'date',
    nullable: true,
  })
  expiry?: Date;

  toResponseObject(): PersonnelCertificationRO {
    return {
      name: this.certification.name,
      expiry: this.expiry ?? null,
    };
  }
}
