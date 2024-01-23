import type { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { Checkbox, MenuItem } from '@material-tailwind/react';
import { classes } from './constants';

export const MenuItemList = ({
  field,
  values,
  onChange,
}: {
  field: any;
  values: any[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {field.options?.map((option: any) => (
        <Fragment key={option}>
          <MenuItem
            key={option}
            placeholder={undefined}
            className={classes.menu.menuItem}
          >
            <label className={classes.menu.optionLabel} htmlFor={option}>
              <Checkbox
                type="checkbox"
                onChange={onChange}
                crossOrigin={undefined}
                checked={values?.includes(option)}
                name={field.name}
                value={option}
              />
              {option}
            </label>
          </MenuItem>
        </Fragment>
      ))}
    </>
  );
};
