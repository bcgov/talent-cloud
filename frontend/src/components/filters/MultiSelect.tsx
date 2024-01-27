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
}: {
  field: any;
  values: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: (name: string, value?: string) => void;
  label: string;
}) => {

  

  const handleCloseMany = () => {
    const event = {
      target: {
        name: field.name,
        value: [],
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <>
      <label>{label}</label>
      <Menu dismiss={{outsidePress: true, itemPress: false}}>
        <MenuHandler>
          <MenuChips
            values={values}
            label={field.name}
            handleClose={handleClose}
            handleCloseMany={handleCloseMany}
            name={field.name}
          />
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          {field.options?.map((option: any) => (
            <MenuItem key={option}>
              <label className={classes.menu.listItem} htmlFor={option.label}>
                <Checkbox
                  onChange={onChange}
                  checked={values?.includes(option)}
                  name={field.name}
                  value={option}
                />
                {option}
              </label>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
