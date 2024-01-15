import type { ControlProps, SingleValue } from 'react-select';
import Select, { components } from 'react-select';
import type { SelectField } from '../interface';
import {
  controlStyles,
  dropdownIndicatorStyles,
  indicatorsContainerStyles,
  indicatorSeparatorStyles,
  inputStyles,
  menuStyles,
  optionStyles,
  optionStylesSelected,
  placeholderStyles,
  singleValueStyles,
  valueContainerStyles,
} from '@/styles/fieldStyles';

interface Option {
  value: string;
  label: string;
}

const Control = ({ children, ...props }: ControlProps<Option, false>) => {
  return <components.Control {...props}>{children}</components.Control>;
};
export const SingleSelect = ({
  field,
  onChange,
  value,
}: {
  field: SelectField;
  onChange: (props: any) => void;
  value:any
}) => {

  

  return (
    <Select
      isMulti={false}
      unstyled
      classNames={{
        input: () => inputStyles,
        control: () => controlStyles,
        placeholder: () => placeholderStyles,
        menu: () => menuStyles,
        // multiValue: () => multiValueStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        valueContainer: () => valueContainerStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        singleValue: () => singleValueStyles,
        option: ({ isSelected }) =>
          isSelected ? optionStylesSelected : optionStyles,
      }}
      components={{ Control }}
      isSearchable={false}
      name={field.name}
      value={field.options.filter(itm => value==itm.value )}
      options={field.options}
      onChange={onChange}
    />
  );
};
