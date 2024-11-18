export type FieldType = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  disabled: boolean;
  autoComplete?: string;
  multiple?: boolean;
  break?: boolean;
  placeholder?: string;
  handleChange?: boolean;
  options?: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<any>) => void;
};

export type SectionProps = {
  field: FieldType;
  handleChangeLocation: (e: React.ChangeEvent<any>) => void;
};
