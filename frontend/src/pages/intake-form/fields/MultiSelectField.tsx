import { useFormikContext, type FieldInputProps } from 'formik';
import { classes } from '@/components/filters/classes';
import clsx from 'clsx';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import type { IntakeFormValues } from '../constants/types';
import { Checkbox, Chip, Typography } from '@material-tailwind/react';

export const MultiSelectField = ({
  field,
  options,
  disabled,
  placeholder,
}: {
  field: FieldInputProps<any>;
  disabled?: boolean;
  options?: any[];
  placeholder?: string;
}) => {
  const { values, setFieldValue } = useFormikContext<IntakeFormValues>();
  console.log(values, field.name);
  const handleClose = (v: any) => {
    setFieldValue(
      field.name,
      field.value.filter((itm: any) => itm !== v),
    );
  };
  const handleCloseMany = () => {
    setFieldValue(field.name, []);
  };
  const handleChange = (v: any) => {
    const fieldValues = values[field.name as keyof typeof values] as any[];
    console.log(fieldValues);
    if (field.name === 'driverLicense') {
      if (fieldValues.includes(v)) {
        const filterValue = fieldValues.filter((itm) => itm !== v);
        setFieldValue(field.name, filterValue);
      } else {
        setFieldValue(field.name, [...fieldValues, v]);
      }
    } else if (field.name !== 'driverLicense') {
      if (fieldValues?.map((itm) => itm?.id)?.includes(v.id)) {
        const filterValue = fieldValues.filter((itm) => itm.id !== v.id);
        setFieldValue(field.name, filterValue);
      } else {
        setFieldValue(field.name, [...fieldValues, v]);
      }
    }
  };
  return (
    <Listbox disabled={disabled} multiple>
      {({ open }) => (
        <div className={clsx('relative')}>
          <ListboxButton className={clsx(classes.menu.formContainer)}>
            <div className="flex flex-row justify-between items-center">
              {field.value && field.value !== '' && field.value?.length ? (
                <div className={classes.menu.chipsContainer}>
                  {(values[field.name as keyof typeof values] as any[]).length >
                  3 ? (
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
                      onClose={() => handleCloseMany()}
                    />
                  ) : (
                    (values[field.name as keyof typeof values] as any[]) &&
                    (values[field.name as keyof typeof values] as any[]).map(
                      (itm: any, index: number) => {
                        return (
                          <Chip
                            key={index.toString() + field.name + (itm.name ?? '')}
                            value={
                              <Typography
                                placeholder={undefined}
                                variant="small"
                                className="font-bold text-info capitalize leading-none"
                              >
                                {
                                  options?.find(
                                    (option) =>
                                      (option.value?.id &&
                                        option.value?.id === itm.id) ||
                                      option.value === itm,
                                  )?.label
                                }
                              </Typography>
                            }
                            variant="ghost"
                            className={
                              'rounded-md text-sm font-bold text-info bg-infoBannerLight text-transform-none'
                            }
                            onClose={() => handleClose(itm)}
                          />
                        );
                      },
                    )
                  )}
                </div>
              ) : (
                <span className={classes.menu.placeholder}>{placeholder}</span>
              )}

              {open ? (
                <ChevronUpIcon aria-hidden="true" />
              ) : (
                <ChevronDownIcon aria-hidden="true" />
              )}
            </div>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {options?.map((itm, index) => (
              <div
                key={itm.label + index.toString()}
                className="flex flex-row items-center gap-x-1 pl-2"
              >
                <Checkbox
                  onChange={() => handleChange(itm.value)}
                  id="vertical-list-react"
                  ripple={false}
                  className="hover:before:opacity-0 checkbox rounded-none"
                  containerProps={{
                    className: 'p-0 rounded-none',
                  }}
                />
                <ListboxOption
                  className="p-0"
                  value={itm.value}
                  key={itm.label + index.toString()}
                  disabled={true}
                >
                  <label
                    htmlFor="vertical-list-react"
                    className="flex w-full cursor-pointer items-center px-3 font-normal text-sm py-2"
                  >
                    {itm.label}
                  </label>
                </ListboxOption>
              </div>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
};
