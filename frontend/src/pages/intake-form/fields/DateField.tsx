import { DayPicker } from 'react-day-picker';
import { Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { classes, calendarClass } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { SingleDateHeader } from './SingleDateHeader';

export const DateField = ({ field }: { field: FieldInputProps<any> }) => {
  const handleChange = (newValue?: Date) => {
    field.onChange({
      target: {
        name: field.name,
        value: newValue,
      },
    });
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-center w-full">
        <>
          <MenuButton
            aria-label="Month Select Menu Button"
            className={classes.menu.container}
          >
            <span>
              {field.value ? format(field.value, 'MM/dd/yyyy') : 'Select Date'}
            </span>

            <CalendarDaysIcon className="h-6 w-6 text-defaultGray" />
          </MenuButton>

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
              <div className="w-full flex flex-col items-center p-6 px-8">
                <MenuItem>
                  <DayPicker
                    classNames={calendarClass}
                    mode="single"
                    selected={field.value}
                    onSelect={handleChange}
                    components={{
                      Caption: SingleDateHeader,
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
