import { MenuItem } from '@material-tailwind/react';

export const Option = ({
  option,
  classes,
  onChange,
  name,
}: {
  option: string;
  classes: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => (
  <MenuItem
    key={option}
    placeholder={undefined}
    className={classes.menuItem}
    value={option}
    onClick={() => onChange}
  >
    <label className={classes.label} htmlFor={option}>
      <input name={name} hidden onChange={onChange} />
      {option}
    </label>
  </MenuItem>
);
