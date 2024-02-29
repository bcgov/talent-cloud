export type Option = {
  label: string;
  value: any;
};

export type CustomFormProps = {
  disabled?: boolean;
  label: string;
  required?: boolean;
  options?: Option[];
};
