import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import type { FormFields } from '../constants/types';
import { Menu, MenuButton, MenuList } from '@/components';
import {
  Checkbox,
  Chip,
  MenuHandler,
  MenuItem,
  Typography,
} from '@material-tailwind/react';
import { propTypesMenuProps } from '@material-tailwind/react/types/components/select';

export const MultiSelectField = ({
  field,
  props,
  options,
}: {
  field: FieldInputProps<any>;
  props: FormFields;
  options?: any[];
}) => {
  return (
    <>
      <Menu
        {...propTypesMenuProps}
        dismiss={{
          outsidePress: true,
          itemPress: false,
          isRequired: { outsidePress: true, itemPress: true },
        }}
      >
        <MenuHandler
          field={field}
          id={field.name}
          className={classes.menu.container}
        >
          {field.value?.length ? (
            <div className={classes.menu.chipsContainer}>
              {field.value.length > 3 ? (
                <Chip
                  value={
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      className="font-bold text-info capitalize leading-none"
                    >
                      {field.value.length} Selected
                    </Typography>
                  }
                  variant="ghost"
                  className={classes.menu.chip}
                  onClose={() => console.log('close')}
                />
              ) : (
                field.value?.map((itm: any) => (
                  <Chip
                    key={itm}
                    value={
                      <Typography
                        placeholder={undefined}
                        variant="small"
                        className="font-bold text-info capitalize leading-none"
                      >
                        {itm}
                      </Typography>
                    }
                    variant="ghost"
                    className={classes.menu.chip}
                    onClose={() => console.log('close')}
                  />
                ))
              )}
            </div>
          ) : (
            <span className={classes.menu.placeholder}>{props.placeholder}</span>
          )}
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          {options?.map((option) => (
            <MenuItem key={option.value}>
              <label className={classes.menu.listItem} htmlFor={option.label}>
                <Checkbox
                  id={option.label}
                  onChange={() =>
                    field.value?.includes(option.value)
                      ? field.onChange('')
                      : field.onChange(option.value)
                  }
                  checked={field.value?.includes(option.value)}
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
