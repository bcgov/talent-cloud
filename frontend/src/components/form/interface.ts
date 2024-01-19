export interface FieldInterface {
  name: string;
  options?: string[];
  groupedOptions?: FieldGroupedOption[];
}

export interface FieldGroupedOption {
  label: any;
  options: string[];
}
