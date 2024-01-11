import type {
  AvailabilityTypeName,
  ClassificationName,
  FunctionName,
  Ministry,
  Region,
  Status,
  WorkLocationName,
} from './enums';

export interface DashboardRow {
  name: string;
  region: Region;
  location: WorkLocationName;
  function: FunctionName;
  availability: AvailabilityTypeName;
  travel: boolean;
  remote: boolean;
  classification: ClassificationName;
  ministry: Ministry;
  status: Status;
}
export interface SearchParams {
  rows: number;
  search: string;
  page: number;
}
