import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityType } from '../../common/enums/availability-type.enum';

export class UpdateAvailabilityDTO {
  @ApiProperty({
    description: 'Start date-string of availability',
    required: true,
    example: '2023-01-01',
  })
  start: string;

  @ApiProperty({
    description: 'End date-string of availability',
    required: true,
    example: '2023-01-01',
  })
  end: string;

  @ApiProperty({
    description: 'Availability type',
    required: true,
    example: AvailabilityType.AVAILABLE,
  })
  availabilityType: AvailabilityType;

  @ApiProperty({
    description: 'Deployment code',
    required: false,
    example: 'QER0P9',
  })
  deploymentCode?: string;
}
