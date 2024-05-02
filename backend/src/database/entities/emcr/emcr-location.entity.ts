import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { Region } from '../../../common/enums/emcr';
import { EmcrLocationRO } from '../../../personnel/ro/emcr';

@Entity('emcr_location')
@Unique('UQ_emcr_location', ['locationName', 'region'])
export class EmcrLocationEntity {
  @PrimaryColumn('int')
  id: number;

  @Column({
    name: 'location_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    unique: true,
  })
  locationName: string;

  @Column({ name: 'region', enum: Region, enumName: 'region', type: 'enum' })
  region: Region;

  toResponseObject(): EmcrLocationRO {
    return {
      id: this.id,
      locationName: this.locationName,
      region: this.region,
    };
  }
}
