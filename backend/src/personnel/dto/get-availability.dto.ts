import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { format } from 'date-fns';
import { AvailabilityType } from 'src/common/enums';

export class GetAvailabilityDTO {
  @ApiPropertyOptional({
    description:
      'Availability status of personnel. If undefined, this will find all',
    default: '*',
  })
  @IsEnum(AvailabilityType)
  @IsOptional()
  availabilityStatus: AvailabilityType;

  @ApiPropertyOptional({
    description: 'Start date-string for a range of availability',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsOptional()
  availabilityStartDate: string;

  @ApiPropertyOptional({
    description: 'End date-string for a range of availability',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsOptional()
  availabilityEndDate: string;
}
