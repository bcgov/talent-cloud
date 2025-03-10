export interface FormFields {
  helper?: string;
  hidden?: boolean;
  label: string;
  name: string;
  options?: { label: string; value: string; disabled?: boolean, name?: string }[];
  placeholder?: string;
  required?: boolean;
  type: string;
  disabled?: boolean;
  program?: string;
  disabledProgram?: boolean;
  colspan?: number;
  hideLabel?: boolean;
}

export interface FormSection {
  name?: string;
  fields?: FormFields[];
  program?: string;
}
