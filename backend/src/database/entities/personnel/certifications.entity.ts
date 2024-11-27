import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CertificationRO } from '../../../personnel/ro/certification.ro';

@Entity('certification')
export class CertificationEntity {
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
