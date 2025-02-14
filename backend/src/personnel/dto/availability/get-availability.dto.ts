import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAvailabilityDTO {
  @ApiPropertyOptional({
    description: 'Start date-string for a range of availability',
  })
  from: string;

  @ApiPropertyOptional({
    description: 'End date-string for a range of availability',
  })
  to: string;
}
