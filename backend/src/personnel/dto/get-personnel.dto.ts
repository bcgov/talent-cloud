import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';
import { Region, WorkLocation } from '../../common/enums';
import { QueryDTO } from '../../query-validation.pipe';

export class GetPersonnelDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: 'Name of personnel - can be a substring of first or last name',
  })
  @Length(3)
  name: string;

  @ApiPropertyOptional({
    description: 'Find only active personnel. If false, this will find all',
    default: true,
  })
  active: boolean;

  @ApiPropertyOptional({
    description: 'TO BE IMPLEMENTED - Whether this personnel is currently available',
    default: true,
  })
  available: boolean;

  @ApiPropertyOptional({
    description: 'Regions to search personnel from',
    type: [Region],
    example: [Region.NEA, Region.NEW]
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  regions: Region[];

  @ApiPropertyOptional({
    description: 'Locations to search personnel from',
    type: [WorkLocation],
    example: [WorkLocation.ABBOTSFORD, WorkLocation.BRENTWOOD_BAY]
  })
  locations: WorkLocation[];
}