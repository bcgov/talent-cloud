import type { CaptionProps, DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { Fragment } from 'react';
import { menuItemClass, calendarClass } from '../classes';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { DatePickerHeader } from './DatePickerHeader';
import { Tooltip } from '@/components/ui';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { Filters } from '@/common';

export const DatePicker = ({
  value,
  label,
  field,
  disabled,
  reset,
  searchParams,
  setSearchParams,
}: {
  label: string;
  field: any;
  value: DateRange;
  disabled?: boolean;
  reset?: () => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: any) => any;
}) => {
  const onChange = (newValue?: DateRange) => {
    newValue?.from &&
      searchParams.set(
        Filters.AVAILABILITY_FROM_DATE,
        format(newValue.from, 'yyyy-MM-dd'),
      );
    newValue?.to &&
      searchParams.set(
        Filters.AVAILABILITY_TO_DATE,
        format(newValue.to, 'yyyy-MM-dd'),
      );
    if (!newValue && value.from) {
      searchParams.set(
        Filters.AVAILABILITY_FROM_DATE,
        format(value?.from, 'yyyy-MM-dd'),
      );
      searchParams.set(
        Filters.AVAILABILITY_TO_DATE,
        format(value?.from, 'yyyy-MM-dd'),
      );
    }
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

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
            <MenuButton
              aria-label="Month Select Menu Button"
              disabled={disabled}
              className={menuItemClass[disabled ? 'disabled' : field.name]}
            >
              <span>
                {format(value.from ?? new Date(), 'yyyy-MM-dd') ===
                  format(value.to ?? new Date(), 'yyyy-MM-dd') &&
                format(value.to ?? new Date(), 'yyyy-MM-dd') ===
                  format(new Date(), 'yyyy-MM-dd')
                  ? `${format(value.from ?? new Date(), 'yyyy-MM-dd')} (Today)`
                  : `${format(value.from ?? new Date(), 'yyyy-MM-dd')} - ${format(value.to ?? new Date(), 'yyyy-MM-dd')}`}{' '}
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
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </>
      </Menu>
    </>
  );
};
