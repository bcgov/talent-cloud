import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { RecommitmentCycleRO } from './recommitment-cycle.ro';

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

  constructor() {
    super();
    const today = new Date();
    this.startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 2,
    );
    this.year = this.startDate.getFullYear();
    this.endDate = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth(),
      this.startDate.getDate() + 35,
    );
  }
}
