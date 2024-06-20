import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CertificationRO } from '../../../bcws/ro/bcws-certification.ro';

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
