import { calendarClass, classes } from '@/components/filters/classes';
import { DatePickerHeader } from '@/components/filters/date-picker/DatePickerHeader';
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from '@headlessui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '@material-tailwind/react';

import { format } from 'date-fns';
import type { FieldInputProps } from 'formik';
import { Fragment } from 'react';
import type { CaptionProps } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';

export const DateField = ({
  field,
  // form,
  // props,
  // options,
}: {
  field: FieldInputProps<any>;
  // form: FormikFormProps;
  // props: FormFields;
  // options?: any[];
}) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-center w-full">
        <>
          <Tooltip
            content={'Please select availability type first'}
            placement={'bottom-start'}
          >
            <MenuButton
              aria-label="Month Select Menu Button"
              className={classes.menu.container}
            >
              <span>
                {format(field.value.from ?? new Date(), 'yyyy-MM-dd') ===
                  format(field.value.to ?? new Date(), 'yyyy-MM-dd') &&
                format(field.value.to ?? new Date(), 'yyyy-MM-dd') ===
                  format(new Date(), 'yyyy-MM-dd')
                  ? `${format(field.value.from ?? new Date(), 'yyyy-MM-dd')} (Today)`
                  : `${format(field.value.from ?? new Date(), 'yyyy-MM-dd')} - ${format(field.value.to ?? new Date(), 'yyyy-MM-dd')}`}{' '}
              </span>

              <CalendarDaysIcon className="h-6 w-6 text-defaultGray" />
            </MenuButton>
          </Tooltip>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 w-full flex flex-col items-center pb-6">
                <MenuItem>
                  <DayPicker
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value?.from}
                    showOutsideDays
                    captionLayout="dropdown-buttons"
                    className="border-0"
                    classNames={calendarClass}
                    components={{
                      Caption: (props: CaptionProps) => (
                        <DatePickerHeader
                          {...props}
                          onChange={field.onChange}
                          reset={() => field.onChange({ from: null, to: null })}
                        />
                      ),
                    }}
                  />
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </>
      </Menu>
    </>
  );
};
