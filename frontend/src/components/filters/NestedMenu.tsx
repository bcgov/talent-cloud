import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { classes } from './classes';
import { Menu } from '../ui';
import { MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { DashboardFilterNames } from '@/pages/dashboard';
import { BcwsRole, Section } from '@/common/enums/sections.enum';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';

export const NestedMenu = ({
  field,
  option,
  nestedField,
  handleChange,
}: {
  field: any;
  option: string | Section;
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
      <MenuHandler className="w-full" id={option}>
        <MenuItem placeholder={option} className="w-full">
          <div className="flex items-center justify-between w-full space-x-24">
            <span id={option} className={classes.menu.listItem}>
              {field.name === DashboardFilterNames.SECTION
                ? SectionName[option as Section]
                : option}
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
      <MenuList placeholder={option}>
        {field.name === DashboardFilterNames.SECTION
          ? nestedField.options[option].map((itm: any) => (
              <MenuItem
                id={itm}
                placeholder={itm}
                key={itm}
                onClick={() => {
                  handleChange(field.name, Section[option as Section]);
                  handleChange(nestedField.name, BcwsRole[itm as BcwsRole]);
                }}
              >
                <span className={classes.menu.listItem}>
                  {BcwsRoleName[itm as BcwsRole]}
                </span>
              </MenuItem>
            ))
          : nestedField.options.map((itm: any) => (
              <MenuItem
                id={itm.label}
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
