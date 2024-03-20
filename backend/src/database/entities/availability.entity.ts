import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PersonnelEntity } from './personnel.entity';
import { AvailabilityType } from '../../common/enums/availability-type.enum';
import { AvailabilityRO } from '../../personnel/ro/availability.ro';

@Entity('availability')
export class AvailabilityEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    name: 'date',
    type: 'date',
  })
  date: string;

  @Column({
    name: 'availability_type',
    type: 'enum',
    enum: AvailabilityType,
    enumName: 'availability-type',
    default: AvailabilityType.NOT_INDICATED,
  })
  availabilityType: AvailabilityType;

  @ManyToOne(() => PersonnelEntity, (pe) => pe.id)
  @JoinColumn({ name: 'personnel', referencedColumnName: 'id' })
  personnel: PersonnelEntity;

  @Column({ name: 'deployment_code', type: 'varchar', nullable: true })
  deploymentCode?: string;

  toResponseObject(): AvailabilityRO {
    return {
      date: this.date,
      availabilityType: this.availabilityType,
      deploymentCode: this.deploymentCode,
    };
  }
  constructor(data?: Partial<AvailabilityEntity>) {
    Object.assign(this, data);
  }
}
