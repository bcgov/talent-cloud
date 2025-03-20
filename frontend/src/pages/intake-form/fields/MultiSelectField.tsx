import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { Chip, Typography } from '@material-tailwind/react';

import { Checkbox } from '@/components';
import { MenuItem, Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import clsx from 'clsx';

export const MultiSelectField = ({
  field,
  placeholder,
  options,
}: {
  field: FieldInputProps<any>;
  placeholder?: string;
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
      <Menu as="div" className="relative">
        <MenuButton className={clsx(classes.menu.container, 'h-[42px]')}>
          {({ open }) => (
            <div className="flex flex-row justify-between items-center">
              {field.value && field.value !== '' && field.value?.length ? (
                <div className={classes.menu.chipsContainer}>
                  {field?.value?.length > 3 ? (
                    <Chip
                      value={
                        <Typography
                          placeholder={undefined}
                          variant="small"
                          className="font-bold text-info capitalize leading-none"
                        >
                          {field?.value?.length} Selected
                        </Typography>
                      }
                      variant="ghost"
                      className={classes.menu.chip}
                      onClose={handleCloseAll}
                    />
                  ) : (
                    field.value &&
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
                              {chip?.label ?? ''}
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
                <span className={classes.menu.placeholder}>{placeholder}</span>
              )}
              <div>
                {open ? (
                  <ChevronUpIcon aria-hidden="true" />
                ) : (
                  <ChevronDownIcon aria-hidden="true" />
                )}
              </div>
            </div>
          )}
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {options?.map((option) => (
            <MenuItem key={option.value}>
              <label
                className={'py-2 font-normal text-sm flex flex-row items-center'}
                htmlFor={option.label}
              >
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
        </MenuItems>
      </Menu>
    </>
  );
};
