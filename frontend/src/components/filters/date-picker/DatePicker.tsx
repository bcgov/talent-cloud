import { format } from 'date-fns';
import type { CaptionProps, DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { menuItemClass, calendarClass } from '../classes';

import { Menu, Transition } from '@headlessui/react';
import { DatePickerHeader } from './DatePickerHeader';

export const DatePicker = ({
  value,
  onChange,
  label,
  field,
}: {
  onChange: (range: DateRange | undefined) => void;
  label: string;
  field: any;
  value?: DateRange;
}) => {
  const dateDisplay =
    value?.to === value?.from
      ? `${format(value?.from ?? new Date(), 'yyyy-MM-dd')}`
      : `${format(value?.from ?? new Date(), 'yyyy-MM-dd')} - ${format(value?.to ?? new Date(), 'yyyy-MM-dd')}`;

  return (
    <>
      <label>{label}</label>
      <Menu as="div" className="relative inline-block text-center w-full">
        {({ open }) => (
          <>
            <Menu.Button className={menuItemClass[field.name]}>
              {value?.from || value?.to ? (
                <span>{dateDisplay}</span>
              ) : (
                <span>Select Date(s)</span>
              )}
              {open ? (
                <ChevronUpIcon
                  className="-mr-1 h-5 w-5 text-gray-900"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-900"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-300"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 w-full flex flex-col items-center pb-6">
                  <Menu.Item>
                    <DayPicker
                      mode="range"
                      selected={value}
                      onSelect={onChange}
                      showOutsideDays
                      captionLayout="dropdown-buttons"
                      className="border-0"
                      classNames={calendarClass}
                      components={{
                        Caption: (props: CaptionProps) => (
                          <DatePickerHeader {...props} onChange={onChange} />
                        ),
                      }}
                    />
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
