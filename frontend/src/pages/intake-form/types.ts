// formik
import type { FormikErrors } from 'formik';

// react
import { ReactComponentElement } from 'react';

export interface FormFields {
  helper?: string;
  hidden?: boolean;
  label: string;
  name: string;
  options?: {
    label: string | ReactComponentElement<any>;
    value: string;
    disabled?: boolean;
    name?: string;
  }[];
  placeholder?: string;
  required?: boolean;
  type: string;
  disabled?: boolean;
  program?: string;
  disabledProgram?: boolean;
  colspan?: number;
  fields?: FormFields[];
  error?: FormikErrors<any>;
  section?: string;
  labelHelper?: string;
  component?: ReactComponentElement<any>;
  style?: string;
}

export interface FormSection {
  name?: string;
  fields?: FormFields[];
  program?: string;
}
