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
}
