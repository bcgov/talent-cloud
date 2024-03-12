import type { ChangeEvent } from 'react';
import { NestedMenu } from './NestedMenu';
import { MenuButton, Chip, Menu, MenuList, MenuHandler } from '../ui';
import { ExperienceName, FunctionName } from '@/common';
import { classes } from './classes';

export const CascadingMenu = ({
  value,
  onChange,
  label,
  field,
  nestedField,
  nestedValue,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  label: string;
  field: any;
  nestedField: any;
  value?: string;
  nestedValue?: string;
}) => {
  const handleChange = (name: string, value: string) => {
    const event = {
      target: { name: name, value: value },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };
  const displayValue = (value: string) => {
    if (value === FunctionName.EMERGENCY_SUPPORT_SERVICES) {
      return 'ESS';
    } else if (value === FunctionName.ADVANCED_PLANNING_UNIT) {
      return 'APU';
    } else {
      return value;
    }
  };
  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ itemPress: false, outsidePress: true }}>
        <MenuHandler field={field}>
          {value ? (
            <Chip
              handleClose={handleChange}
              name={field.name}
              value={''}
              display={
                nestedValue
                  ? `${displayValue(value)}: ${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
                  : `${value}: All`
              }
            />
          ) : (
            <span className={classes.menu.placeholder}>
              Select {label.toLowerCase()}(s)
            </span>
          )}
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          {field.options?.map((option: any) => (
            <NestedMenu
              field={field}
              handleChange={handleChange}
              nestedField={nestedField}
              option={option}
              key={option}
            />
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
