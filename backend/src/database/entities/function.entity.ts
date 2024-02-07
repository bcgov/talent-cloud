import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FunctionRO } from '../../function/ro/function.ro';

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
      abbreviation: this.abbreviation,
    };
  }
}
