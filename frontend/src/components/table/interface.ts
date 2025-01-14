import type { Status } from '@/common';
import type { RecommitmentStatus } from '@/common/enums/recommitment-status';

export interface Cell {
  key: string;
  options: string[];
  columnName: string;
  value: any;
  className: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  submitChange?: (e: any) => void;
  onClick?: (e: any) => void;
  rowData?: Row;
  nested?: Row[];
}

export interface Row {
  key: string;
  cells: Cell[];
  status: Status;
  recommitmentStatus?: RecommitmentStatus;
}

export interface TabCount {
  [key: string]: number;
}

export interface PageParams {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface FieldInterface {
  name: string;
  options?: Option[] | Option[][] | string[];
  placeholder?: string;
  groupedOptions?: FieldGroupedOption[];
}

export interface FieldGroupedOption {
  label: string;
  value: string;
  options: string[];
}
