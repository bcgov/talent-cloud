import type { CaptionProps, DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { Fragment } from 'react';
import { menuItemClass, calendarClass } from '../classes';
import { Menu, Transition } from '@headlessui/react';
import { DatePickerHeader } from './DatePickerHeader';
import { Tooltip } from '@/components/ui';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { getDateDisplay } from './helpers';

export const DatePicker = ({
  value,
  onChange,
  label,
  field,
  disabled,
  reset,
}: {
  onChange: (range: DateRange | undefined) => void;
  label: string;
  field: any;
  value: DateRange | undefined;
  disabled?: boolean;
  reset?: () => void;
}) => {
  return (
    <>
      <span className="label">{label}</span>
      <Menu as="div" className="relative inline-block text-center w-full">
        <>
          <Tooltip
            content={'Please select availability type first'}
            placement={'bottom-start'}
            disabled={!disabled}
          >
            <Menu.Button
              aria-label="Month Select Menu Button"
              disabled={disabled}
              className={menuItemClass[disabled ? 'disabled' : field.name]}
            >
              <span>{getDateDisplay(value)} </span>

              <CalendarDaysIcon className="h-6 w-6 text-defaultGray" />
            </Menu.Button>
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 w-full flex flex-col items-center pb-6">
                <Menu.Item>
                  <DayPicker
                    mode="range"
                    selected={value}
                    onSelect={onChange}
                    defaultMonth={value?.from}
                    showOutsideDays
                    captionLayout="dropdown-buttons"
                    className="border-0"
                    classNames={calendarClass}
                    components={{
                      Caption: (props: CaptionProps) => (
                        <DatePickerHeader
                          {...props}
                          onChange={onChange}
                          reset={reset}
                        />
                      ),
                    }}
                  />
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      </Menu>
    </>
  );
};
