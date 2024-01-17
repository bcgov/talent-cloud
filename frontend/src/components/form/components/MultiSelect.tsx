import type { ActionMeta, MenuListProps, MultiValue } from 'react-select';
import Select, { components } from 'react-select';
import type { FieldInterface, FieldOption } from '../interface';
import {
  controlStyles,
  dropdownIndicatorStyles,
  indicatorSeparatorStyles,
  indicatorsContainerStyles,
  inputStyles,
  menuStyles,
  multiselectOptionStyles,
  multiselectOptionStylesSelected,
  placeholderStyles,
  singleValueStyles,
  valueContainerStyles,
} from '@/styles/fieldStyles';

import { Option } from './MultiSelectOption';
const MenuList = (
  props: MenuListProps<FieldOption, true>
) => {
  
  return (
    <components.MenuList {...props}>
      {props.children}
    </components.MenuList>
  );
};
export const MultiSelect = ({
  field,
  values,
  options,
  onChange,
}: {
  field: FieldInterface;
  values: FieldOption[];
  options: any[]
  onChange: (props: any) => void;
}) => {
  

  const handleChange = (
    newValue: MultiValue<FieldOption>, actionMeta: ActionMeta<FieldOption>
  ) => {

      if (actionMeta.action === 'select-option' && actionMeta?.option?.label === "Select All") {
        onChange({ name: field.name, value: actionMeta.option.value });
      } else if(actionMeta.action === "clear"){
        onChange({ name: field.name, value: [] });  
      } else if (actionMeta.action === "remove-value"){
        onChange({ name: field.name, value: values.filter((itm) => itm !== actionMeta.removedValue) });
      }
      else {
      onChange({ name: field.name, value: newValue });
    }
  };

  return (
    <Select
      isMulti={true}
      closeMenuOnSelect={false}
      hideSelectedOptions={true}
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
          isSelected ? multiselectOptionStylesSelected : multiselectOptionStyles,
      }}
      components={{ Option }}
      defaultValue={[]}
      name={field.name}
      value={values}
      options={options}
      onChange={handleChange}
    />
  );
};
