import type {
  ClassificationName,
  Region,
  Ministry,
  FunctionName,
  WorkLocationName,
  AvailabilityTypeName,
  Status,
} from '@/common/enums';

export enum DashboardColumns {
  AVAILABILITY = 'availability',
  REMOTE = 'remote',
  CLASSIFICATION = 'classification',
  REGION = 'region',
  LOCATION = 'location',
  TRAVEL = 'travel',
  MINISTRY = 'ministry',
  NAME = 'name',
  STATUS = 'status',
  FUNCTION = 'function',
}

export interface Cell {
  key: string;
  columnName: DashboardColumns;
  value: any;
  className: string;
}

export interface Row {
  key: string;
  cells: Cell[];
  active: boolean;
}
export interface Column {
  name: string;
  key: string;
}
export interface TableData {
  columns: Column[];
  rows: Row[];
}

export interface DashboardRow {
  [DashboardColumns.NAME]: string;
  [DashboardColumns.REGION]: Region;
  [DashboardColumns.LOCATION]: WorkLocationName;
  [DashboardColumns.FUNCTION]: FunctionName;
  [DashboardColumns.AVAILABILITY]: AvailabilityTypeName;
  [DashboardColumns.TRAVEL]: boolean;
  [DashboardColumns.REMOTE]: boolean;
  [DashboardColumns.CLASSIFICATION]: ClassificationName;
  [DashboardColumns.MINISTRY]: Ministry;
  [DashboardColumns.STATUS]: Status;
}
