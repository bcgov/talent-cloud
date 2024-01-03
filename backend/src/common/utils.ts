import { faker } from '@faker-js/faker';
import {
  ClassificationName,
  ExperienceName,
  Region,
  Status,
  Ministry,
  FunctionNameAbbrv,
  WorkLocationName,
} from './enums';

export interface DashboardRow {
  name: string;
  status: Status;
  region: Region;
  location: WorkLocationName;
  ministry: Ministry;
  classification: ClassificationName;
  function: FunctionNameAbbrv;
  experience: ExperienceName;
  remote: string;
  willingToTravel: string;
}

export const rowData = (): DashboardRow => {
  return {
    name: `${faker.person.lastName()}, ${faker.person.firstName()}`,
    status: faker.helpers.arrayElement(Object.values(Status)),
    region: faker.helpers.arrayElement(Object.values(Region)),
    location: faker.helpers.arrayElement(Object.values(WorkLocationName)),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    classification: faker.helpers.arrayElement(
      Object.values(ClassificationName),
    ),
    function: faker.helpers.arrayElement(Object.values(FunctionNameAbbrv)),
    experience: faker.helpers.arrayElement(Object.values(ExperienceName)),
    remote: faker.datatype.boolean({ probability: 0.4 }) ? 'Yes' : 'No',
    willingToTravel: faker.datatype.boolean({ probability: 0.8 })
      ? 'Yes'
      : 'No',
  };
};

export const generateData = (
  numRows: number,
  page: number,
): { rows: DashboardRow[]; totalRows: number } => {
  const rows: DashboardRow[] = [];
  const totalRows = 500;

  for (let i = 0; i < 500; i++) {
    rows.push(rowData());
  }
  const rangeRows = rows.slice((page - 1) * numRows, page * numRows);
  return { rows: rangeRows, totalRows };
};
