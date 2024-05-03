import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FireCentre } from '../../../common/enums/bcws';
import { BcwsLocationRO } from '../../../personnel/ro/bcws/location.ro';

@Entity('bcws_location')
// @Unique('UQ_LOCATION_NAME', ['locationName', 'fireCentre'])
export class BcwsLocationEntity {
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
    name: 'fire_centre',
    enum: FireCentre,
    enumName: 'fire-centre',
    type: 'enum',
    nullable: true,
  })
  fireCentre: FireCentre;

  toResponseObject(): BcwsLocationRO {
    return {
      id: this.id,
      locationName: this.locationName,
      fireCentre: this.fireCentre ?? null,
    };
  }
}