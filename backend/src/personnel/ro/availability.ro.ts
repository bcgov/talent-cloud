import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityTypeLabel } from '../../common/enums';

export class AvailabilityRO {
  @ApiProperty({
    description: 'Availability date string',
    required: true,
    example: '2023-01-01',
  })
  date: string;

  @ApiProperty({
    description: 'Availability type',
    required: false,
    example: AvailabilityTypeLabel.UNAVAILABLE,
  })
  availabilityType?: AvailabilityTypeLabel;

  @ApiProperty({
    description: 'Code representing the current deployment',
    required: false,
    example: 'fsda86',
  })
  deploymentCode?: string;

  @ApiProperty({
    description:
      'The true start date of the event if this date falls at the start of a query',
    required: false,
    example: '2022-12-28',
  })
  actualStartDate?: string;

  @ApiProperty({
    description:
      'The true end date of the event if this date falls at the end of a query',
    required: false,
    example: '2023-02-03',
  })
  actualEndDate?: string;
}
