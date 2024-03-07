import { type ChangeEvent, Fragment } from 'react';
import { menuItemClass } from './classes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { Chip } from '../ui';
import type { DateRange } from 'react-day-picker';

export const SingleSelect = ({
  onChange,
  label,
  field,

  resetDates,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  label: string;
  field: any;

  resetDates: (dates: DateRange) => void;
  value?: string;
}) => {
  const handleChange = (name: string, value: string) => {
    const event = {
      target: { name: name, value: value },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };
  const placeholder = 'Select Availability Status';

  const handleClose = () => {
    resetDates({ from: undefined, to: undefined });
    handleChange(field.name, '');
  };

  return (
    <>
      <label>{label}</label>
      <Menu as="div" className="relative inline-block text-left w-full">
        {({ open }) => (
          <>
            {value ? (
              <div className={menuItemClass[field.name]}>
                <Chip value={value} handleClose={handleClose} />
                <Menu.Button>
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-900"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
            ) : (
              <Menu.Button className={menuItemClass[field.name]}>
                <span>{placeholder}</span>
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
            )}

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
                <div className="py-1 w-full">
                  {field.options.map((itm: { label: string; value: string }) => (
                    <Menu.Item key={itm.value}>
                      <button
                        onClick={() => handleChange(field.name, itm.value)}
                        className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 w-full text-left"
                      >
                        {itm.label}
                      </button>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
