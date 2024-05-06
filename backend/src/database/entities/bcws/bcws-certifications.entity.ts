import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('bcws_certification')
export class BcwsCertificationEntity {
  @PrimaryColumn('int')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;
}
