import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type, plainToInstance } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

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

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: QueryDTO, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    return plainToInstance(metatype, value);
  }
}
