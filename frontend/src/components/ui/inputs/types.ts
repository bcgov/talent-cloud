export type Option = {
  label: string;
  value: string | boolean | number;
};

export type CustomFormProps = {
  disabled?: boolean;
  label: string;
  required?: boolean;
  options?: Option[];
};
