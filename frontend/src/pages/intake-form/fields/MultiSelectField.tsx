import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import type { FormFields } from '../constants/types';
import { Checkbox, Chip, Typography } from '@material-tailwind/react';
import { propTypesMenuProps } from '@material-tailwind/react/types/components/select';

import { MenuButton } from '../../../components/ui';
import { MenuHandler, MenuList, MenuItem, Menu } from '@material-tailwind/react';
export const MultiSelectField = ({
  field,
  props,
  options,
}: {
  field: FieldInputProps<any>;
  props: FormFields;
  options?: any[];
}) => {
  const handleChange = (e: any) => {
    field.onChange(e);
  };
  const handleCloseOne = (e: any) => {
    const event = {
      target: {
        name: field.name,
        value: field.value.filter((itm: any) => itm !== e),
      },
    };
    field.onChange(event);
  };
  const handleCloseAll = () => {
    const event = {
      target: {
        name: field.name,
        value: [],
      },
    };
    field.onChange(event);
  };
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
        <MenuHandler>
          <MenuItem className="w-full">
            <div className={classes.menu.container}>
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
                      onClose={handleCloseAll}
                    />
                  ) : (
                    field.value?.map((itm: any) => {
                      const chip = options?.find((option) => option.value === itm);
                      return (
                        <Chip
                          key={itm}
                          value={
                            <Typography
                              placeholder={undefined}
                              variant="small"
                              className="font-bold text-info capitalize leading-none"
                            >
                              {chip.label}
                            </Typography>
                          }
                          variant="ghost"
                          className={
                            'rounded-md text-sm font-bold text-info bg-infoBannerLight text-transform-none'
                          }
                          onClose={() => handleCloseOne(chip.value)}
                        />
                      );
                    })
                  )}
                </div>
              ) : (
                <span className={classes.menu.placeholder}>{props.placeholder}</span>
              )}
              <MenuButton />
            </div>
          </MenuItem>
        </MenuHandler>
        <MenuList className={field.name}>
          {options?.map((option) => (
            <MenuItem key={option.value}>
              <label className={classes.menu.listItem} htmlFor={option.label}>
                <Checkbox
                  id={option.label}
                  onChange={handleChange}
                  checked={field.value?.includes(option.value.toString())}
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
