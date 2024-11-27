import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityType } from '../../common/enums/availability-type.enum';

export class UpdateAvailabilityDTO {
  @ApiProperty({
    description: 'Date to remove from',
    required: false,
    example: '2022-12-26',
  })
  removeFrom: string;

  @ApiProperty({
    description: 'Start date-string of availability',
    required: true,
    example: '2023-01-01',
  })
  from: string;

  @ApiProperty({
    description: 'Date to remove to',
    required: false,
    example: '2023-01-05',
  })
  removeTo: string;

  @ApiProperty({
    description: 'End date-string of availability',
    required: true,
    example: '2023-01-01',
  })
  to: string;

  @ApiProperty({
    description: 'Availability type',
    required: true,
    example: AvailabilityType.UNAVAILABLE,
  })
  type: AvailabilityType;

  @ApiProperty({
    description: 'Deployment code',
    required: false,
    example: 'QER0P9',
  })
  deploymentCode?: string;
}
