import { Checkbox, MenuItem } from '@material-tailwind/react';

export const OptionWithCheckbox = ({
  option,
  classes,
  handleChange,
  name,
  checked,
}: {
  option: string;
  classes: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  checked: boolean;
}) => (
  <MenuItem key={option} placeholder={undefined} className={classes.menuItem}>
    <label className={classes.label} htmlFor={option}>
      <Checkbox
        type="checkbox"
        name={name}
        checked={checked}
        id={option}
        onChange={handleChange}
        crossOrigin={undefined}
      />
      {option}
    </label>
  </MenuItem>
);
