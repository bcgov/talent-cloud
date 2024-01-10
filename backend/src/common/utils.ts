import { faker } from '@faker-js/faker';
import {
  ClassificationName,
  Region,
  Ministry,
  FunctionNameAbbrv,
  WorkLocationName,
  AvailabilityTypeName,
  Status,
} from './enums';

export interface DashboardRow {
  name: string;
  region: Region;
  location: WorkLocationName;
  function: FunctionNameAbbrv;
  availability: AvailabilityTypeName;
  travel: boolean;
  remote: boolean;
  classification: ClassificationName;
  ministry: Ministry;
  status: Status;
}

export const rowData = (): DashboardRow => {
  return {
    name: `${faker.person.lastName()}, ${faker.person.firstName()}`,
    region: faker.helpers.arrayElement(Object.values(Region)),
    location: faker.helpers.arrayElement(Object.values(WorkLocationName)),
    function: faker.helpers.arrayElement(Object.values(FunctionNameAbbrv)),
    availability: faker.helpers.arrayElement(
      Object.values(AvailabilityTypeName),
    ),
    travel: faker.datatype.boolean({ probability: 0.8 }),
    remote: faker.datatype.boolean({ probability: 0.4 }),
    classification: faker.helpers.arrayElement(
      Object.values(ClassificationName),
    ),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    status: faker.datatype.boolean({ probability: 0.8 })
      ? Status.Active
      : Status.Inactive,
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
