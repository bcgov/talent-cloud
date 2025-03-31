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

export const SelectField = ({
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
  const { setFieldValue } = useFormikContext<IntakeFormValues>();

  return (
    <Listbox disabled={disabled} onChange={(v: any) => v.id === 'None' ? setFieldValue(field.name, '') : setFieldValue(field.name, v)}>
      {({ open }) => (
        <div className={clsx('relative')}>
          <ListboxButton className={clsx(classes.menu.formContainer)}>
            <div className="flex flex-row justify-between items-center">
              {!field.value ||
              field.value.name === '' ||
              field.value === undefined ? (
                <span className="text-gray-500 text-sm">{placeholder}</span>
              ) : (
                <span className="truncate">
                  {
                    options?.find(
                      (itm) =>
                        (itm.value?.id && itm.value.id === field.value.id) ||
                        itm.value === field.value,
                    )?.label
                  }
                </span>
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
            

            {options?.map((option, index) => (
              <ListboxOption
                key={`${field.name}.${option.value?.id}.${index}`}
                value={option.value}
                disabled={option?.disabled}
                className="group relative cursor-pointer py-2 pr-9 pl-3 select-none data-focus:bg-[#3B8FDD] data-focus:text-white data-focus:outline-hidden hover:bg-gray-200"
              >
                <div className="flex items-center">
                  <span
                    className={clsx(
                      option.disabled ? 'text-gray-400' : 'text-gray-800',
                      'ml-3 block truncate font-normal group-data-selected:font-semibold',
                    )}
                  >
                    {option.label}
                  </span>
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
};
