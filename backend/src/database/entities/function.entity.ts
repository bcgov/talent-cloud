import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('function')
export class FunctionEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'abbreviation', type: 'varchar', length: 10 })
  abbreviation: string;
}