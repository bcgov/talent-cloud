import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ministry } from '../../common/enums';

@Entity('division')
export class DivisionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'division_name', type: 'varchar', length: 50 })
  divisionName: string;

  @Column({
    name: 'ministry',
    type: 'enum',
    enumName: 'ministry',
    enum: Ministry,
  })
  ministry: Ministry;

  toResponseObject() {
    return {
      id: this.id,
      division: this.divisionName,
      ministry: this.ministry,
    };
  }
}
