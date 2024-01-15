import { FunctionRO } from 'src/function/ro/function.ro';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('function')
export class FunctionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'abbreviation', type: 'varchar', length: 10 })
  abbreviation: string;

  toResponseObject(): FunctionRO {
    return {
      id: this.id,
      name: this.name,
      abbreviation: this.abbreviation
    }
  }
}