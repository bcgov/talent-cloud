import type { GroupBase, MultiValue } from 'react-select';
import Select from 'react-select';
import type { FieldGroupedOption, FieldInterface } from '../interface';
import {
  controlStyles,
  dropdownIndicatorStyles,
  indicatorSeparatorStyles,
  indicatorsContainerStyles,
  inputStyles,
  menuStyles,
  multiValueStyles,
  multiselectOptionStyles,
  multiselectOptionStylesSelected,
  placeholderStyles,
  singleValueStyles,
  valueContainerStyles,
} from '@/styles/fieldStyles';

import { Option } from './MultiSelectOption';

export const MultiSelectGroup = ({
  field,
  onChange,
}: {
  field: FieldInterface;
  onChange: ({ name, value }: { name: string; value: any[] }) => void;
  values: string[];
}) => {
  const handleSelectChange = (newValue: MultiValue<FieldGroupedOption>) => {
    onChange({ name: field.name, value: [...newValue] });
  };

  return (
    <Select<FieldGroupedOption, true, GroupBase<FieldGroupedOption>>
      isMulti
      hideSelectedOptions={false}
      formatGroupLabel={(data) => <div>{data.label}</div>}
      unstyled
      styles={{
        clearIndicator: (base) => ({ ...base, display: 'none' }),
        multiValueRemove: (base) => ({
          ...base,
          display: 'none',
        }),
      }}
      classNames={{
        input: () => inputStyles,
        control: () => controlStyles,
        placeholder: () => placeholderStyles,
        menu: () => menuStyles,
        multiValueLabel: () => 'hidden',
        multiValueRemove: () => 'hidden',
        multiValue: () => multiValueStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        valueContainer: () => valueContainerStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        singleValue: () => singleValueStyles,
        option: ({ isSelected }) =>
          isSelected ? multiselectOptionStylesSelected : multiselectOptionStyles,
      }}
      components={{ Option }}
      closeMenuOnSelect={false}
      defaultValue={[]}
      onChange={handleSelectChange}
      options={field.groupedOptions}
    />
  );
};
