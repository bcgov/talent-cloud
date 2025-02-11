import { ApiProperty } from '@nestjs/swagger';

export class RecommitmentCycleRO {
  @ApiProperty()
  year: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  reinitiationEndDate?: Date;
}
