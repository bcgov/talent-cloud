import {
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { MenuButton } from './MenuButton';
import { classes } from './constants';
import type { ChangeEvent } from 'react';

export const MenuSingleSelect = ({
  field,
  value,
  label,
  onChange,
  handleClose,
}: {
  field: any;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  handleClose: (name: string, value: string) => void;
}) => {
  return (
    <>
      <label>{label}</label>
      <Menu dismiss={{ itemPress: true }}>
        <MenuHandler>
          <div className={classes.menu.container}>
            <div className={classes.menu.chipsContainer}>
              {value ? (
                <Chip
                  key={value}
                  value={value}
                  color="blue-gray"
                  variant="ghost"
                  className={classes.menu.chip}
                  onClose={() => handleClose(field.name, value)}
                />
              ) : (
                <span>Select {field.name}...</span>
              )}
            </div>
            <div className="flex flex-row items-center justify-end">
              <MenuButton open={false} />
            </div>
          </div>
        </MenuHandler>
        <MenuList className={'py-4'} placeholder={undefined}>
          {field.options?.map((option: any) => (
            <MenuItem key={option} placeholder={undefined} className={'px-4'}>
              <label className={classes.menu.optionLabel} htmlFor={option}>
                <input name={option} value={value} onChange={onChange} />
                {option}
              </label>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
