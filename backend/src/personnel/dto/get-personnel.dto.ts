import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Experience, FunctionName, Region } from '../../common/enums';
import { QueryDTO } from '../../common/query.dto';

export class GetPersonnelDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: 'Name of personnel - can be a substring of first or last name',
  })
  @IsOptional()
  @Length(3)
  name: string;

  @ApiPropertyOptional({
    description: 'Find only active personnel. If false, this will find all',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  active: boolean;

  @ApiPropertyOptional({
    description:
      'TO BE IMPLEMENTED - Whether this personnel is currently available',
    default: true,
  })
  available: boolean;

  @ApiPropertyOptional({
    description: 'Regions to search personnel from',
    example: `${Region.NEA},${Region.NWE}`,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Region, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value
          .trim()
          .split(', ')
          .map((type) => Region[type]),
  )
  region: Region;

  @ApiPropertyOptional({
    description: 'Locations to search personnel from',
    example: `Abbotsford, Victoria`,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value
          .trim()
          .split(', ')
          .map((type) => type),
  )
  location: string;

  @ApiPropertyOptional({
    description: 'Function name to search personnel from',
    type: FunctionName,
    example: FunctionName.OPERATIONS,
  })
  @IsOptional()
  function: FunctionName;

  @ApiPropertyOptional({
    description: 'Experience level to search personnel from',
    type: Experience,
    example: Experience.INTERESTED,
  })
  @IsEnum(Experience)
  @IsOptional()
  experience: Experience;
}
