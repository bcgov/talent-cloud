import type { CheckboxProps } from '@material-tailwind/react';
import { Checkbox as MuiCheckbox } from '@material-tailwind/react';
import { classes } from '../filters/classes';

export const Checkbox = (props: CheckboxProps) => (
  <MuiCheckbox
    type="checkbox"
    onChange={props.onChange}
    crossOrigin={undefined}
    name={props.name}
    value={props.value}
    className={classes.menu.checkbox}
    multiple={props.multiple}
    containerProps={{
      className: classes.menu.checkboxContainer,
    }}
    checked={props.checked}
  />
);
