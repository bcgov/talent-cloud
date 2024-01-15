import type { SingleValue } from 'react-select';
import Select from 'react-select';
import type { FieldInterface } from '../interface';
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

import { Control } from './SingleSelectControl';

export const SingleSelect = ({
  field,
  onChange,
  value,
}: {
  field: FieldInterface;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  value: string;
}) => {
  const handleChange = (newValue: SingleValue<any>) => {
    onChange({ name: field.name, value: newValue?.value ?? '' });
  };
  return (
    <Select
      isMulti={false}
      unstyled
      classNames={{
        input: () => inputStyles,
        control: () => controlStyles,
        placeholder: () => placeholderStyles,
        menu: () => menuStyles,
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
      value={field.options!.filter((itm) => value == itm.value)}
      options={field.options}
      onChange={handleChange}
    />
  );
};
