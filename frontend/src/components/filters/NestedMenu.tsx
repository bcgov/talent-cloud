import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { classes } from './classes';
import { Menu } from '../ui';
import { MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';

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
      <MenuHandler>
        <MenuItem placeholder={option}>
          <div className="flex items-center justify-between">
            <span className={classes.menu.listItem}>{option}</span>
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform ${
                openMenu ? 'rotate-90' : ''
              }`}
            />
          </div>
        </MenuItem>
      </MenuHandler>
      <MenuList placeholder={option}>
        {nestedField.options.map((itm: any) => (
          <MenuItem
            placeholder={itm.label}
            key={itm.value}
            onClick={() => {
              handleChange(field.name, option);
              handleChange(nestedField.name, itm.value);
            }}
          >
            <span className={classes.menu.listItem}>{itm.label}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
