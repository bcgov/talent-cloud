import { MenuItem } from '@material-tailwind/react';
import { classes } from './constants';
import { DropdownMenu } from './DropdownMenu';

export const Select = ({
  onChange,
  field,
  value,
}: {
  onChange: (name: string, value: string) => void;
  field: any;
  value: any;
}) => {
  return (
    <DropdownMenu
      fieldName={field.name}
      values={value}
      dismiss={{ itemPress: true }}
      onClearItem={() => onChange(field.name, '')}
    >
      {field.options.map((itm: string) => (
        <MenuItem key={itm} placeholder={undefined}>
          <button
            onClick={() => onChange(field.name, itm)}
            className={classes.optionButton}
          >
            {itm}
          </button>
        </MenuItem>
      ))}
    </DropdownMenu>
  );
};
