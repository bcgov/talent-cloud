import type { ReactElement } from 'react';

export interface FormFields {
  component?: ReactElement;
  helper?: string;
  hidden?: boolean;
  label: string;
  name: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  type: string;
}

export interface FormSection {
  name?: string;
  fields?: FormFields[];
}
