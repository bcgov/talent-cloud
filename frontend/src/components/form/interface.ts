import type { FieldTypes } from './constants';

export interface FieldInterface {
  name: string;
  label: string;
  type: FieldTypes;
  placeholder?: string;
}

export interface FieldGroupedOption {
  label: string;
  options: FieldOption[];
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface SelectField extends FieldInterface {
  options: FieldOption[];
  multi?: boolean;
}
export interface GroupedSelectField extends FieldInterface {
  options: FieldGroupedOption[];
  multi?: boolean;
}

export interface SearchField extends FieldInterface {}
