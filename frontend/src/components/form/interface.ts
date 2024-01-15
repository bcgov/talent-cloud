import type { FieldTypes } from './constants';

export interface FieldInterface {
  name: string;
  label: string;
  type: FieldTypes;
  multi?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  groupedOptions?: FieldGroupedOption[];
}

export interface FieldGroupedOption {
  label: string;
  options: FieldOption[];
}

export interface FieldOption {
  label: string;
  value: string;
}
