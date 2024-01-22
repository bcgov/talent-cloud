import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetPersonnelDTO } from './personnel/dto/get-personnel.dto';



@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: GetPersonnelDTO, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    return plainToInstance(metatype, value);
  }
}
