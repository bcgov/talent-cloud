import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { GetPersonnelDTO } from '../get-personnel.dto';
import { Experience, FunctionName, Region } from '../../../common/enums/emcr';
import { BcwsRole, FireCentre, Section } from '../../../common/enums/bcws';

export class GetBcwsPersonnelDTO extends GetPersonnelDTO {
  @ApiPropertyOptional({
    description: 'Fire Centres to search personnel from',
    example: `${FireCentre.CARIBOO},${FireCentre.COASTAL}`,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(FireCentre, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value
          .trim()
          .split(', ')
          .map((type) => FireCentre[type]),
  )
  fireCentre: FireCentre; // Home Fire Centre

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
    description: 'Section to search personnel from',
    type: Section,
    example: Section.COMMAND,
  })
  @IsOptional()
  // Mandatory if role is filled
  section: Section;

  @ApiPropertyOptional({
    description: 'Role to search personnel from',
    type: BcwsRole,
    example: BcwsRole.AVIATION_ASSISTANT,
  })
  @IsEnum(BcwsRole)
  @IsOptional()
  // Mandatory if section is filled
  role: BcwsRole;
}
