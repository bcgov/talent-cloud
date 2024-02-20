import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { months } from './constants';
import type { SelectorProps } from './interface';

export const MonthSelector = (props: SelectorProps) => (
  <Menu>
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Menu.Button className="w-full flex  font-bold  items-center pb-1">
          <span className="text-md pr-1">
            {months.find((itm) => itm.value === props.displayMonth.getMonth())
              ?.label ?? ''}
          </span>
          <ChevronDownIcon className="font-bold h-5 w-5 stroke-4" />
        </Menu.Button>
      </div>
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
          {months.map((itm) => (
            <Menu.Item key={itm.value}>
              <button
                onClick={() =>
                  props.goToMonth(
                    new Date(props.displayMonth.getFullYear(), itm.value, 1),
                  )
                }
                className="py-1 text-sm cursor-pointer px-8 rounded-sm hover:bg-gray-100 font-bold text-left"
              >
                {props.displayMonth.getMonth() === itm.value ? (
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
