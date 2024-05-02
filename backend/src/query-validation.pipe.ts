import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetEmcrPersonnelDTO } from './personnel/dto/emcr';

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: GetEmcrPersonnelDTO, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    return plainToInstance(metatype, value);
  }
}
