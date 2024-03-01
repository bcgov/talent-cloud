export type InputProps = {
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
};

export type SelectProps = InputProps & {
  options?: {
    label: string;
    value: string | number | readonly string[] | undefined;
  }[];
};
