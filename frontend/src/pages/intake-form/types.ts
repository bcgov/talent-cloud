import type { ReactElement } from 'react';

export interface FormFields {
  type: string;
  name: string;
  label: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  hidden?: boolean;
  component?: ReactElement;
}

export interface FormSection {
  name?: string;
  fields?: FormFields[];
}
