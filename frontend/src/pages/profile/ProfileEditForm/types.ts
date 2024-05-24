export type FieldType = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  disabled: boolean;
  autoComplete?: string;
  multiple?: boolean;
  break?: boolean;
  handleChange?: boolean;
  options?: { label: string; value: number | string | string[] }[];
  onChange?: (e: React.ChangeEvent<any>) => void;
};

export type SectionProps = {
  field: FieldType;
  handleChangeLocation: (e: React.ChangeEvent<any>) => void;
};

export type SectionFieldType = {
  handleChangeLocation: (e: React.ChangeEvent<any>) => void;
  options: (
    field: FieldType,
  ) => { label: string; value: string | string[] }[] | undefined;
  field: FieldType;
};
