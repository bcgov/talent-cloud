export interface FormFields {
  helper?: string;
  hidden?: boolean;
  label: string;
  name: string;
  options?: { label: string; value: string; disabled?: boolean }[];
  placeholder?: string;
  required?: boolean;
  type: string;
  disabled?: boolean;
  program?: string;
  disabledProgram?: boolean;
}

export interface FormSection {
  name?: string;
  fields?: FormFields[];
  program?: string;
}
