import {
  ClassificationName,
  ExperienceName,
  FunctionName,
  MinistryAcronymName,
  RegionName,
  StatusName,
  WorkLocationName,
} from './enums';

export interface Row {
  name: string;
  status: StatusName;
  region: RegionName;
  location: WorkLocationName;
  ministry: MinistryAcronymName;
  classification: ClassificationName;
  function: FunctionName;
  experience: ExperienceName;
  remote: string;
  willingToTravel: string;
}

export interface SearchParams {
  rows: number;
  search: string;
  page: number;
}
