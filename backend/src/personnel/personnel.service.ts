import { Injectable } from '@nestjs/common';
import { Row, generateData } from '../common/utils';
import { QueryDto } from '../query-validation.pipe';

@Injectable()
export class PersonnelService {
  getPersonnel(query: QueryDto): { rows: Row[]; totalRows: number } {
    return generateData(query.rows, query.page);
  }
}
