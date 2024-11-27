import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PersonnelEntity } from './personnel.entity';
import {
  AvailabilityType,
  AvailabilityTypeLabel,
} from '../../common/enums/availability-type.enum';
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
    nullable: true,
    default: null,
  })
  availabilityType?: AvailabilityType;

  @ManyToOne(() => PersonnelEntity, (pe) => pe.id)
  @JoinColumn({ name: 'personnel', referencedColumnName: 'id' })
  personnel: PersonnelEntity;

  @Column({ name: 'deployment_code', type: 'varchar', nullable: true })
  deploymentCode?: string;

  toResponseObject(): AvailabilityRO {
    let availabilityType: AvailabilityTypeLabel;
    if (!this.availabilityType) {
      availabilityType = AvailabilityTypeLabel.AVAILABLE;
    } else {
      availabilityType = AvailabilityTypeLabel[this.availabilityType];
    }
    return {
      date: this.date,
      availabilityType,
      deploymentCode: this.deploymentCode,
    };
  }
  constructor(data?: Partial<AvailabilityEntity>) {
    Object.assign(this, data);
  }
}
