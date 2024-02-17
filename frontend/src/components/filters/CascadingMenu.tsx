import type { ChangeEvent } from 'react';
import { NestedMenu } from './NestedMenu';
import { MenuButton, Chip, Menu, MenuList, MenuHandler } from '../ui';
import { ExperienceName } from '@/common';
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

  return (
    <>
      <label>{label}</label>
      <Menu dismiss={{ itemPress: false }}>
        <MenuHandler field={field}>
          {value ? (
            <Chip
              name={field.name}
              handleClose={() => handleChange(field.name, '')}
              value={
                nestedValue
                  ? `${value}: ${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
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
