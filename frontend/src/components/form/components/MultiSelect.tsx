import type { ActionMeta, MultiValue } from 'react-select';
import Select from 'react-select';
import type { FieldInterface, FieldOption } from '../interface';
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

export const MultiSelect = ({
  field,
  values,
  onChange,
}: {
  field: FieldInterface;
  values: string[];
  onChange: (props: any) => void;
}) => {
  const options: FieldOption[] = field.options!;

  const handleChange = (
    newValue: MultiValue<FieldOption>,
    actionMeta: ActionMeta<FieldOption>,
  ) => {
    if (actionMeta.action === 'select-option' && actionMeta.option === options[0]) {
      onChange({ name: field.name, value: field.options!.map((itm) => itm.value) });
    } else if (
      actionMeta.action === 'deselect-option' &&
      actionMeta.option === options[0]
    ) {
      onChange({ name: field.name, value: [] });
    } else {
      onChange({ name: field.name, value: newValue.map((itm) => itm.value) });
    }
  };

  return (
    <Select
      isMulti={true}
      hideSelectedOptions={false}
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
      name={field.name}
      value={options.filter((itm) => values.includes(itm.value))}
      options={options}
      onChange={handleChange}
    />
  );
};
