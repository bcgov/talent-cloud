import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import {
  ExperienceLevel,
  FireCentre,
  BcwsRole,
} from '../../common/enums/bcws';
import { GetPersonnelDTO } from '../../personnel/dto/get-personnel.dto';

export class GetBcwsPersonnelDTO extends GetPersonnelDTO {
  @ApiPropertyOptional({
    description: 'Fire Centres to search personnel from',
    example: `${FireCentre.CARIBOO},${FireCentre.COASTAL}`,
  })
  @IsOptional()
  @IsEnum(FireCentre, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value
          .trim()
          .split(',')
          .map((type) => FireCentre[type]),
  )
  fireCentre: FireCentre; // Home Fire Centre

  @ApiPropertyOptional({
    description: 'Locations to search personnel from',
    example: `Abbotsford, Victoria`,
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : value.split(','), 
  )
  location: string;

  @ApiPropertyOptional({
    description: 'Role to search personnel from',
    type: BcwsRole,
    example: BcwsRole.AVIATION_ASSISTANT,
  })
  @IsEnum(BcwsRole)
  @IsOptional()
  role: BcwsRole;

  @ApiPropertyOptional({
    description: 'Experience in role',
    type: ExperienceLevel,
  })
  @IsOptional()
  experience: ExperienceLevel;
}
