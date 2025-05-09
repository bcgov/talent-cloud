import type { FormikErrors } from 'formik';

export type InputProps = {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  autocomplete?: string;
  error?: FormikErrors<any> | string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type SelectProps = InputProps & {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: {
    label: string;
    value: string | number | readonly string[] | undefined;
  }[];
};
