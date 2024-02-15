import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityType } from '../../common/enums';

export class AvailabilityRO {
  @ApiProperty({
    description: 'Availability date',
    required: true,
    example: '2023-01-01',
  })
  date: string;
  @ApiProperty({
    description: 'Availability type',
    required: true,
    example: AvailabilityType.AVAILABLE,
  })
  availabilityType: AvailabilityType;
  @ApiProperty({
    description: 'Personnel ID',
    required: true,
    example: 1,
  })
  deploymentCode: string;
}
