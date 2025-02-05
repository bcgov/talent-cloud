import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class QueryDTO {
  @ApiProperty({
    required: false,
    default: 1,
  })
  @IsNumberString()
  @Transform(({ value }) => parseInt(value))
  rows: string;

  @ApiProperty({
    required: false,
    default: 1,
  })
  @IsNumberString()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
