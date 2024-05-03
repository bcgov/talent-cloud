import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { Region } from '../../../common/enums/emcr';
import { LocationRO } from '../../../region-location/region-location.ro';

@Entity('location')
@Unique('UQ_EMCR_LOCATION_NAME', ['locationName', 'region'])
export class LocationEntity {
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

  @Column({
    name: 'region',
    enum: Region,
    enumName: 'region',
    type: 'enum',
    nullable: true,
  })
  region: Region;

  toResponseObject(): LocationRO {
    return {
      id: this.id,
      locationName: this.locationName,
      region: this.region ?? null,
    };
  }
}
