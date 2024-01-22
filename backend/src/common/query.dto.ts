import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class QueryDTO {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    description: 'Page to start on for pagination',
    default: 1,
  })
  public readonly page: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    description: 'Number of rows to return',
    default: 25,
  })
  public readonly rows: number;
}
