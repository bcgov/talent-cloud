import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { years } from './constants';
import { getYear } from 'date-fns';
import type { SelectorProps } from './interface';

export const YearSelector = (props: SelectorProps) => (
  <Menu>
    <div className="flex flex-row">
      <MenuButton
        className="w-full flex  font-bold  items-center mb-1"
        type="button"
        aria-label="open"
        >
        <span className="text-gray-900 pr-1">{getYear(props.displayMonth)}</span>
        <ChevronDownIcon className="font-bold h-5 w-5 stroke-4 color-icon text-icon" />
      </MenuButton>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-300"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems className="absolute ml-16 z-10 mt-2  text-left  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="flex flex-col py-4">
          {years().map((itm) => (
            <MenuItem key={itm.value}>
              <button
                aria-label="year selector"
                type="button"
                onClick={() =>
                  props.goToMonth(
                    new Date(itm.value, props.displayMonth.getMonth(), 1),
                  )
                }
                className="py-1 text-sm cursor-pointer px-8 rounded-sm hover:bg-gray-100 font-bold text-left text-black"
              >
                {props.displayMonth.getFullYear() === itm.value ? (
                  <span className="font-bold text-black">{itm.label}</span>
                ) : (
                  <span className="font-normal text-black">{itm.label}</span>
                )}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Transition>
  </Menu>
);
