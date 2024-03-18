import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { years } from './constants';
import { getYear } from 'date-fns';
import type { SelectorProps } from './interface';

export const YearSelector = (props: SelectorProps) => (
  <Menu>
    <div className="flex flex-row">
      <Menu.Button
        className="w-full flex  font-bold  items-center pb-1"
        aria-label="open"
      >
        <span className="text-md pr-1">{getYear(props.displayMonth)}</span>
        <ChevronDownIcon className="font-bold h-5 w-5 stroke-4 color-icon text-icon" />
      </Menu.Button>
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
      <Menu.Items className="absolute ml-16 z-10 mt-2  text-left  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="flex flex-col py-4">
          {years().map((itm) => (
            <Menu.Item key={itm.value}>
              <button
                aria-label="year selector"
                onClick={() =>
                  props.goToMonth(
                    new Date(itm.value, props.displayMonth.getMonth(), 1),
                  )
                }
                className="py-1 text-sm cursor-pointer px-8 rounded-sm hover:bg-gray-100 font-bold text-left"
              >
                {props.displayMonth.getFullYear() === itm.value ? (
                  <span className="font-bold">{itm.label}</span>
                ) : (
                  <span className="font-normal">{itm.label}</span>
                )}
              </button>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);
