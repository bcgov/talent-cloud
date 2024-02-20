import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { format } from 'date-fns';
import { AvailabilityType } from '../../common/enums';

export class GetAvailabilityDTO {
  @ApiPropertyOptional({
    description:
      'Availability status of personnel. If undefined, this will find all',
    default: '*',
  })
  @IsEnum(AvailabilityType)
  @IsOptional()
  type: AvailabilityType;

  @ApiPropertyOptional({
    description: 'Start date-string for a range of availability',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsOptional()
  from: string;

  @ApiPropertyOptional({
    description: 'End date-string for a range of availability',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsOptional()
  to: string;

  
}
