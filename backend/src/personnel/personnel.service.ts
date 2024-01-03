import { Injectable } from '@nestjs/common';
import { DashboardRow, generateData } from '../common/utils';
import { QueryDto } from '../query-validation.pipe';

@Injectable()
export class PersonnelService {
  getPersonnel(query: QueryDto): { rows: DashboardRow[]; totalRows: number } {
    return generateData(query.rows, query.page);
  }
}
