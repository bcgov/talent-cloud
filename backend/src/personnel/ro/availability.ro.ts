import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityType } from '../../common/enums';

export class AvailabilityRO {
  @ApiProperty({
    description: 'Availability date string',
    required: true,
    example: '2023-01-01',
  })
  date: string
  
  @ApiProperty({
    description: 'Start date of this availability group',
    required: true,
    example: '2023-01-01',
  })
  groupStartDate?: string;

  @ApiProperty({
    description: 'End date of this availability group',
    required: true,
    example: '2023-01-01',
  })
  groupEndDate?: string;

  @ApiProperty({
    description: 'Availability type',
    required: true,
    example: AvailabilityType.AVAILABLE,
  })
  availabilityType: AvailabilityType;

  @ApiProperty({
    description: 'Code representing the current deployment',
    required: false,
    example: 'fsda86',
  })
  deploymentCode?: string;

}
