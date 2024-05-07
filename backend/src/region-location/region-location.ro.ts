import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FireCentre } from '../common/enums';
import { Region } from '../common/enums/emcr';

export class LocationRO {
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
    description: 'Emcr specific region of a location',

    example: Region,
  })
  @IsOptional()
  region: Region;

  @ApiProperty({
    description: 'Fire centre of location',

    example: FireCentre.CARIBOO,
  })
  @IsOptional()
  fireCentre: FireCentre;
}
