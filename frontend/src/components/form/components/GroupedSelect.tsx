import { useState } from 'react';
import { OptionWithCheckbox } from './OptionCheckBox';
import { classes } from './constants';
import { DropdownMenu } from './DropdownMenu';
import type { FieldGroupedOption } from '../interface';

export const GroupedSelect = ({
  onChange,
  field,
  values,
}: {
  onChange: (name: string, value: any) => void;
  field: any;
  values: any[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>();
  const [selectedGroups, setSelectedGroups] = useState<string[]>();

  const handleChange = (name: string, value: string) => {
    const selectedOptionSet = new Set(selectedOptions ?? []);

    if (selectedOptions?.includes(value)) {
      selectedOptionSet.delete(value);
    } else {
      selectedOptionSet.add(value);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(name, newSelectedOptions);
  };

  const handleSelectGroup = (name: string, label: string, options: string[]) => {
    const selectedGroupSet = new Set(selectedGroups ?? []);
    const selectedOptionSet = new Set(selectedOptions ?? []);

    if (selectedGroups?.includes(label)) {
      selectedGroupSet.delete(label);
      options.forEach((option) => {
        selectedOptionSet.delete(option);
      });
    } else {
      selectedGroupSet.add(label);
      options.forEach((option) => {
        selectedOptionSet.add(option);
      });
    }

    const newSelectedGroup = Array.from(selectedGroupSet);

    setSelectedGroups(newSelectedGroup);
    onChange('region', newSelectedGroup);
    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(name, newSelectedOptions);
  };

  const handleClear = () => {
    setSelectedGroups([]);
    setSelectedOptions([]);
    onChange('region', []);
  };

  return (
    <DropdownMenu
      fieldName={field.name}
      values={values}
      onClearItem={
        selectedOptions && selectedOptions?.length < 3 ? handleChange : handleClear
      }
      dismiss={{ itemPress: false }}
    >
      <div className="p-4 w-[1000px]">
        <label>Select Your Work Locations:</label>
        <div className="grid grid-cols-4 gap-y-8 gap-x-4 pt-8">
          {field.groupedOptions?.map((group: FieldGroupedOption) => (
            <div key={group.label} className="col-span-1">
              <OptionWithCheckbox
                option={group.label}
                classes={{ label: classes.groupLabel, menuItem: classes.menuItem }}
                handleChange={() =>
                  handleSelectGroup(field.name, group.label, group.options)
                }
                name={group.label}
                checked={selectedGroups?.includes(group.label) ?? false}
              />
              {group.options.map((option) => (
                <OptionWithCheckbox
                  key={option}
                  option={option}
                  classes={{
                    label: classes.optionLabel,
                    menuItem: classes.menuItem,
                  }}
                  handleChange={() => handleChange(field.name, option)}
                  name={group.label}
                  checked={selectedOptions?.includes(option) ?? false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DropdownMenu>
  );
};
