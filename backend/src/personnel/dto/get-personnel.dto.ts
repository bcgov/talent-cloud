import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, Length } from 'class-validator';
import { format } from 'date-fns';
import { AvailabilityTypeLabel } from '../../common/enums/availability-type.enum';
import { Status } from '../../common/enums/status.enum';
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
  @IsEnum(AvailabilityTypeLabel)
  @IsOptional()
  availabilityType: AvailabilityTypeLabel;

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
    description: 'Get all travellers',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  includeTravel: boolean;
}
