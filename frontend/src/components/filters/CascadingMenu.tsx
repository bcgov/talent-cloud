import type { ChangeEvent } from 'react';
import { NestedMenu } from './NestedMenu';
import { MenuButton, Chip, Menu, MenuList, MenuHandler } from '../ui';
import { ExperienceName, FunctionName } from '@/common';
import { classes } from './classes';
import { DashboardFilterNames } from '@/pages/dashboard';
import type { BcwsRole, Section } from '@/common/enums/sections.enum';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';

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
  nestedValue?: string | BcwsRole;
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

  const renderDisplay = (value: string) => {
    if (field.name === DashboardFilterNames.SECTION) {
      return nestedValue
        ? `${SectionName[value as Section]}: ${BcwsRoleName[nestedValue as BcwsRole]}`
        : `${value}: All`;
    } else {
      return nestedValue
        ? `${displayValue(value)}: ${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
        : `${value}: All`;
    }
  };
  const handleClose = () => {
    const event = {
      target: {
        name: field.name,
        value: '',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };
  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ itemPress: false, outsidePress: true }}>
        <MenuHandler field={field} id={field.name}>
          {value ? (
            <Chip
              handleClose={handleClose}
              name={field.name}
              value={''}
              display={renderDisplay(value)}
            />
          ) : (
            <p className={classes.menu.placeholder}>
              Select {label.toLowerCase()}(s)
            </p>
          )}
          <MenuButton />
        </MenuHandler>
        <MenuList>
          <div className="w-full">
            {field.options?.map((option: any) => (
              <NestedMenu
                field={field}
                handleChange={handleChange}
                nestedField={nestedField}
                option={option}
                key={option}
              />
            ))}
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
