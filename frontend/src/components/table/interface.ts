export interface Cell {
  key: string;
  columnName: string;
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
  rows: Row[];
  pageRange: number[];
  totalRows: number;
  totalPages: number;
}

export interface PageParams {
  rowsPerPage: number;
  currentPage: number;
  showInactive: boolean;
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
