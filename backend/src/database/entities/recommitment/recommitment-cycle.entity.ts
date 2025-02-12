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

  @Column({ name: 'reinitiation_end_date', type: 'timestamp', nullable: true })
  reinitiationEndDate: Date;

  toResponseObject(): RecommitmentCycleRO {
    return {
      year: this.year,
      startDate: this.startDate,
      endDate: this.endDate,
      reinitiationEndDate: this.reinitiationEndDate,
    };
  }

  constructor(startDate: Date, endDate: Date, year: number) { 
    super();
    
    this.startDate = startDate
    this.endDate = endDate
    this.year = year
  }
}
