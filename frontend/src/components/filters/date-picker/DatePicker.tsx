import { format } from 'date-fns';
import type { CaptionProps, DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { menuItemClass } from '../classes';

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
                      classNames={{
                        caption: 'flex pl-2 py-2 relative self-start text-black',
                        caption_label: 'text-sm text-black font-bold',
                        nav: 'flex items-center',
                        nav_button:
                          'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                        nav_button_previous: 'absolute right-5',
                        nav_button_next: 'absolute right-1',
                        table: 'w-full border-collapse',
                        head_row: 'flex font-medium text-gray-900',
                        head_cell: 'm-0.5 w-9 font-normal text-sm',
                        row: 'flex w-full',
                        cell: 'text-gray-600  h-10 w-10 text-center text-sm p-0 m-0 relative  focus-within:relative focus-within:z-20 aria-selected:bg-infoBannerLight',
                        day: 'h-10 w-10 p-0 font-normal aria-selected:infoBannerLight aria-selected:rounded-none',
                        day_range_middle: 'bg-infoBannerLight',
                        dropdown_year: 'text-sm',
                        day_selected: 'bg-infoBannerLight rounded-none',
                        day_range_end:
                          'aria-selected:bg-infoBannerLight aria-selected:rounded-r-full',
                        day_range_start:
                          'aria-selected:bg-infoBannerLight aria-selected:rounded-l-full',
                        day_today: ' rounded-full bg-gray-200 text-gray-900 ',
                        day_outside:
                          'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                        day_disabled: 'text-gray-500 opacity-50',
                        day_hidden: 'invisible',
                      }}
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
