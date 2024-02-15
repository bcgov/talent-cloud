import { AvailabilityRO } from 'src/personnel/ro/availability.ro';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PersonnelEntity } from './personnel.entity';
import { AvailabilityType } from '../../common/enums/availability-type.enum';

@Entity('availability')
export class AvailabilityEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'date', type: 'date' })
  date: string;

  @Column({
    name: 'availability_type',
    type: 'enum',
    enum: AvailabilityType,
    enumName: 'availability-type',
    default: AvailabilityType.AVAILABLE,
  })
  availabilityType: AvailabilityType;

  @ManyToOne(() => PersonnelEntity, (pe) => pe.availability)
  @JoinColumn({ name: 'personnel_id' })
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
}
