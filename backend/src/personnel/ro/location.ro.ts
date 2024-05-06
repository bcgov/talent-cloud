import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Region } from '../../common/enums/emcr';

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
    description: 'Region of location',
    required: true,
    example: Region.SWE,
  })
  @IsOptional()
  region: Region;
}
