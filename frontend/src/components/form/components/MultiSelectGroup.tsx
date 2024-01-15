import type { GroupBase, MultiValue } from 'react-select';
import Select, { components } from 'react-select';
import type { FieldGroupedOption, GroupedSelectField } from '../interface';
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

export const MultiSelectGroup = ({
  field,
  onChange,
}: {
  field: GroupedSelectField;
  onChange: ({ name, value }: { name: string; value: any[] }) => void;
  filters: DashboardFilters;
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
      options={field.options}
    />
  );
};
