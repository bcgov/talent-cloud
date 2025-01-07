import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { RecommitmentCycleRO } from './recommitment-cycle.ro';
import { datePST } from '../../../common/helpers';

@Entity('recommitment_cycle')
@Unique(['year'])
export class RecommitmentCycleEntity extends BaseEntity {
  @PrimaryColumn()
  year: number;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  toResponseObject(): RecommitmentCycleRO {
    return {
      year: this.year,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }

  constructor(startDate?: string, endDate?: string) { 
    super();
    
    this.startDate = startDate ? new Date(startDate) : new Date(datePST(new Date())); 
    this.endDate = endDate ? new Date(endDate) : new Date(datePST(new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate()+35)));
    this.year = this.startDate.getFullYear();
  }
}
