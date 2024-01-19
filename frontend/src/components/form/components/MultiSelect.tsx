import { Fragment, useState } from 'react';
import { classes } from './constants';
import { OptionWithCheckbox } from './OptionCheckBox';
import { DropdownMenu } from './DropdownMenu';

export const MultiSelect = ({
  onChange,
  field,
  values,
}: {
  onChange: (name: string, selected: any) => void;
  field: any;
  values: any[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const handleChange = (name: string, value: string) => {
    const selectedOptionSet = new Set(selectedOptions);
    if (selectedOptions.includes(value)) {
      selectedOptionSet.delete(value);
    } else {
      selectedOptionSet.add(value);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(name, newSelectedOptions);
  };

  const handleClear = (name: string) => {
    setSelectedOptions([]);
    onChange(name, []);
  };

  return (
    <DropdownMenu
      fieldName={field.name}
      values={values}
      onClearItem={values?.length < 3 ? handleChange : handleClear}
      dismiss={{ itemPress: false }}
    >
      {field.options?.map((option: any) => (
        <Fragment key={option}>
          <OptionWithCheckbox
            key={option}
            option={option}
            classes={{ label: classes.optionLabel, menuItem: classes.menuItem }}
            handleChange={() => handleChange(field.name, option)}
            name={field.name}
            checked={selectedOptions.includes(option)}
          />
        </Fragment>
      ))}
    </DropdownMenu>
  );
};
