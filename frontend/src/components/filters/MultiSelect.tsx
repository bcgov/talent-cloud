import { classes } from './classes';
import type { ChangeEvent } from 'react';
import {
  MenuItem,
  Checkbox,
  Menu,
  MenuList,
  MenuButton,
  MenuHandler,
  MenuChips,
} from '../ui';

export const MultiSelect = ({
  field,
  values,
  label,
  onChange,
  handleClose,
  handleCloseMany,
}: {
  field: any;
  values: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
}) => {
  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ outsidePress: true, itemPress: false }}>
        <MenuHandler field={field} id={field.name}>
          <MenuChips
            values={values}
            placeholder={field.placeholder}
            handleClose={handleClose}
            handleCloseMany={handleCloseMany}
            name={field.name}
            maxChips={field.name === 'region' ? 2 : 1}
          />
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          {field.options?.map((option: any) => (
            <MenuItem key={option} id={option.label}>
              <label className={classes.menu.listItem} htmlFor={option.label}>
                <Checkbox
                  id={option.label}
                  onChange={onChange}
                  checked={values?.includes(option.value)}
                  name={field.name}
                  value={option.value}
                />
                {option.label}
              </label>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
