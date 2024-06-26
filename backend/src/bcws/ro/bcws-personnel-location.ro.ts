import { ApiProperty } from '@nestjs/swagger';
import { FireCentre } from '../../common/enums/bcws';

export class BcwsLocationRO {
  @ApiProperty({
    description: 'Location id',
    required: false,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Location name',
    required: true,
    example: 'Victoria',
  })
  locationName: string;

  @ApiProperty({
    description: 'Fire Centre of location',
    required: true,
    enum: FireCentre,
    type: 'enum',
    enumName: 'bcws-fire-centre',
    example: FireCentre.SOUTHEAST,
  })
  fireCentre: FireCentre;
}
