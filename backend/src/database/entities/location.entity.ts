import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { FireCentre } from '../../common/enums';
import { Region } from '../../common/enums/emcr';
import { LocationRO } from '../../region-location/region-location.ro';

@Entity('location')
@Unique('UQ_location', ['locationName', 'region'])
export class LocationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'location_name',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  locationName: string;

  @Column({
    name: 'region',
    enum: Region,
    enumName: 'region',
    type: 'enum',
    nullable: false,
  })
  region: Region;

  @Column({
    name: 'fire_centre',
    enum: FireCentre,
    enumName: 'fire-centre',
    type: 'enum',
    nullable: false,
  })
  fireCentre: FireCentre;

  toResponseObject(): LocationRO {
    return {
      id: this.id,
      locationName: this.locationName,
      region: this.region,
      fireCentre: this.fireCentre,
    };
  }
}
