import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AvailabilityType } from '../../common/enums/availability-type.enum';
import { PersonnelEntity } from './personnel.entity';

@Entity('function')
export class AvailabilityEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({ name: 'availability_type', type: 'enum', enum: AvailabilityType, enumName: 'availability-type' })
  availabilityType: AvailabilityType;

  @ManyToOne(() => PersonnelEntity, (pe) => pe.availability)
  @JoinColumn({ name: 'personnel_id' })
  personnel: PersonnelEntity;
}