import { CertificationRO } from '../../../personnel/ro/bcws/bcws-certification.ro';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bcws_certification')
export class BcwsCertificationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  toResponseObject(): CertificationRO {
    return { id: this.id, name: this.name };
  }
}
