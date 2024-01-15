import type { ActionMeta, MultiValue } from 'react-select';
import Select, { components } from 'react-select';
import type { SelectField } from '../interface';
import {
  controlStyles,
  dropdownIndicatorStyles,
  formClass,
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
import type { DashboardFilters } from '@/pages/dashboard/constants';

interface Option {
  value: string;
  label: string;
}

export const Option = ({ children, ...props }: any) => {
  return (
    <components.Option {...props}>
      <input
        type={'checkbox'}
        checked={props.isSelected}
        onChange={props.onChange}
        className={formClass.checkbox}
      />
      {children}
    </components.Option>
  );
};

export const MultiSelect = ({
  field,
  filters,
  onChange,
}: {
  field: SelectField;
  filters: DashboardFilters;
  onChange: (props: any) => void;
}) => {
  const values = (filters[field.name as keyof DashboardFilters] as string[]) ?? [];
  const options: Option[] = field.options;

  const handleChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    if (actionMeta.action === 'select-option' && actionMeta.option === options[0]) {
      onChange({ name: field.name, value: field.options.map((itm) => itm.value) });
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
