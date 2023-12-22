import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Type, plainToInstance } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class QueryDto {
  @Type(() => Number)
  @IsInt()
  public readonly page: number;

  @Type(() => Number)
  @IsInt()
  public readonly rows: number;

  @IsString()
  public readonly search: string;
}

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: QueryDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    return plainToInstance(metatype, value);
  }
}
