import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ministry } from '../../common/enums';
import { DivisionRO } from '../../personnel/ro/bcws/division.ro';

@Entity('division')
export class DivisionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'division_name', type: 'varchar', length: 250 })
  divisionName: string;

  @Column({
    name: 'ministry',
    type: 'enum',
    enumName: 'ministry',
    enum: Ministry,
  })
  ministry: Ministry;

  toResponseObject(): DivisionRO {
    return {
      id: this.id,
      divisionName: this.divisionName,
      ministry: this.ministry,
    };
  }
}
