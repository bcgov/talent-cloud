import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAvailabilityDTO {
  @ApiProperty({
    description: 'Date to confirm availability until',
    required: true,
  })
  date: Date;
}
