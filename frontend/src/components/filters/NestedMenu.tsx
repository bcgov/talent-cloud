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
  option: { label: string; value: string };
  nestedField: any;
  handleChange: (name: string, value: string) => void;
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Menu
      key={option.value}
      placement="right-start"
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      offset={15}
      dismiss={{ itemPress: false }}
    >
      <MenuHandler className="w-full" id={option}>
        <MenuItem placeholder={option} className="w-full">
          <div className="flex items-center justify-between w-full space-x-24">
            <span id={option.value} className={classes.menu.listItem}>
              {option.label}
            </span>
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform text-dark-600 ${
                openMenu ? 'rotate-90' : ''
              }`}
            />
          </div>
        </MenuItem>
      </MenuHandler>
      <MenuList placeholder={option}>
        {nestedField.options.map(
          (nestedOption: { label: string; value: string }) => (
            <MenuItem key={option.value} placeholder={undefined}>
              <label className={classes.menu.listItem} htmlFor={option.label}>
                <button
                  onClick={() =>
                    [
                      { name: field.name, value: option.value },
                      { name: nestedField.name, value: nestedOption.value },
                    ].forEach((itm) => handleChange(itm.name, itm.value))
                  }
                >
                  {nestedOption.label}
                </button>
              </label>
            </MenuItem>
          ),
        )}
      </MenuList>
    </Menu>
  );
};
