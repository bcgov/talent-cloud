import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('training')
export class TrainingEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;
}