import type { Experience, ExperienceName } from '@/common';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { useState } from 'react';
import { classes } from './constants';

export const NestedMenu = ({
  field,
  option,
  nestedField,
  handleChange,
}: {
  field: any;
  option: string;
  nestedField: any;
  handleChange: (nestedField: any, nestedValue: any) => void;
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Menu
      key={option}
      placement="right-start"
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      offset={15}
      dismiss={{ itemPress: false }}
    >
      <MenuHandler className="flex items-center justify-between">
        <MenuItem
          placeholder={undefined}
          onClick={() => handleChange(field.name, option)}
        >
          <span className={classes.menu.optionLabel}>{option}</span>
          <ChevronRightIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? 'rotate-90' : ''
            }`}
          />
        </MenuItem>
      </MenuHandler>
      <MenuList placeholder={undefined}>
        {nestedField.options.map(({label, value}: {label: ExperienceName, value: Experience}) => (
          <MenuItem
            key={value}
            placeholder={undefined}
            onClick={() => {
              handleChange(field.name, option);
              handleChange(nestedField.name, value);
            }}
          >
            <span className={classes.menu.optionLabel}>{label}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
