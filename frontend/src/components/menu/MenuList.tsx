import { Fragment } from 'react';
import { Checkbox, MenuItem as MuiMenuItem } from '@material-tailwind/react';
import { classes } from './constants';

export const MenuItemList = ({
  field,
  values,
  onChange,
}: {
  field: any;
  values: any[];
  onChange: (name: string, value: any) => void;
}) => {
  return (
    <>
      {field.options?.map((option: any) => (
        <Fragment key={option}>
          <MuiMenuItem
            key={option}
            placeholder={undefined}
            className={classes.menuItem}
          >
            <label className={classes.optionLabel} htmlFor={option}>
              <Checkbox
                type="checkbox"
                onChange={() => onChange(field.name, option)}
                crossOrigin={undefined}
                checked={values?.includes(option)}
              />
              {option}
            </label>
          </MuiMenuItem>
        </Fragment>
      ))}
    </>
  );
};
