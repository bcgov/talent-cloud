import type { Status } from '@/common';

export interface Cell {
  key: string;

  columnName: string;
  value: any;
  className: string;
}

export interface Row {
  key: string;
  cells: Cell[];
  status: Status;
}

export interface TabCount {
  [key: string]: number;
}

export interface PageParams {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
}
export interface FieldInterface {
  name: string;
  options?: string[];
  groupedOptions?: FieldGroupedOption[];
}

export interface FieldGroupedOption {
  label: any;
  options: string[];
}
