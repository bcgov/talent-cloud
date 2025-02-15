import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {  IsEnum, IsOptional } from 'class-validator';
import { Experience, FunctionName, Region } from '../../common/enums/emcr';
import { GetPersonnelDTO } from '../../personnel/dto/get-personnel.dto';

export class GetEmcrPersonnelDTO extends GetPersonnelDTO {
  @ApiPropertyOptional({
    description: 'Regions to search personnel from',
    example: `${Region.NEA},${Region.NWE}`,
  })
  @IsOptional()
  @IsEnum(Region, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value
          .trim()
          .split(',')
          .map((type) => Region[type]),
  )
  region: Region;

  @ApiPropertyOptional({
    description: 'Locations to search personnel from',
    example: `Abbotsford, Victoria`,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
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
