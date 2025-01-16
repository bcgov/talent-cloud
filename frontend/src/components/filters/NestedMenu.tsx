import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { classes } from './classes';
import { MenuHandler, MenuList, MenuItem, Menu } from '@material-tailwind/react';
import { propTypesMenuProps } from '@material-tailwind/react/types/components/select';

export const NestedMenu = ({
  field,
  option,
  nestedField,
  handleChange,
}: {
  field: any;
  option: { label: string; value: string };
  nestedField: any;
  handleChange: (value: { name: string; value: string }[]) => void;
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Menu
      {...propTypesMenuProps}
      key={option.value}
      placement="right-start"
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      offset={15}
      dismiss={{
        outsidePress: true,
        itemPress: false,
        isRequired: { outsidePress: true, itemPress: true },
      }}
    >
      <MenuHandler className="w-full" id={option}>
        <MenuItem className="w-full">
          <div className="flex items-center justify-between w-full space-x-24">
            <span id={option.value} className={classes.menu.listItem}>
              {option.label}
            </span>
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform text-icon ${
                openMenu ? 'rotate-90' : ''
              }`}
            />
          </div>
        </MenuItem>
      </MenuHandler>
      <MenuList>
        {nestedField.options.map(
          (nestedOption: { label: string; value: string }, index: number) => (
            <MenuItem key={option.value + index.toString()} placeholder={undefined}>
              <label className={classes.menu.listItem} htmlFor={option.label}>
                <button
                  onClick={() =>
                    handleChange([
                      { name: field.name, value: option.value },
                      { name: nestedField.name, value: nestedOption.value },
                    ])
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
