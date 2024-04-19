import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { format } from 'date-fns';
import {
  AvailabilityType,
  Experience,
  FunctionName,
  Region,
  Status,
} from '../../common/enums';
import { QueryDTO } from '../../common/query.dto';

export class GetPersonnelDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: 'Name of personnel - can be a substring of first or last name',
  })
  @IsOptional()
  @Length(1)
  name: string;

  @ApiPropertyOptional({
    description: 'Find personnel by status',
  })
  status: Status;

  @ApiPropertyOptional({
    description:
      'Availability status of personnel. If undefined, this will find all',
    default: '*',
  })
  @IsEnum(AvailabilityType)
  @IsOptional()
  availabilityType: AvailabilityType;

  @ApiPropertyOptional({
    description: 'Start date-string for a range of availability',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsOptional()
  availabilityFromDate: string;

  @ApiPropertyOptional({
    description: 'End date-string for a range of availability',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsOptional()
  availabilityToDate: string;

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
