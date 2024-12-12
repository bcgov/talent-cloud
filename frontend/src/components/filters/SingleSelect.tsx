import { Fragment } from 'react';
import { classes, menuItemClass } from './classes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { Chip } from '../ui';
import type { AvailabilityType } from '@/common';
import { AvailabilityTypeName } from '@/common';

export const SingleSelect = ({
  onChange,
  label,
  field,
  handleClose,
  value,
}: {
  onChange: (name: string, value: string) => any;
  label: string;
  field: any;
  handleClose: () => void;
  value?: string;
}) => {
  const placeholder = 'Select availability type';

  return (
    <>
      <span className="label">{label}</span>
      <Menu as="div" className="relative inline-block text-left w-full">
        {({ open }) => (
          <>
            {value ? (
              <div className={menuItemClass[field.name]}>
                <Chip
                  value={value}
                  label={AvailabilityTypeName[value as AvailabilityType]}
                  name={field.name}
                  handleClose={handleClose}
                />
                <Menu.Button aria-label="Single Select Menu Button" id={field.name}>
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-dark-600"
                    aria-hidden="true"
                    aria-label="close"
                  />
                </Menu.Button>
              </div>
            ) : (
              <Menu.Button
                id={field.name}
                className={menuItemClass[field.name]}
                aria-label="Single Select Menu Button"
              >
                <p className={classes.menu.placeholder}>{placeholder}</p>
                {open ? (
                  <ChevronUpIcon
                    className="-mr-1 h-5 w-5 text-dark-600"
                    aria-hidden="true"
                    aria-label="open"
                  />
                ) : (
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-dark-600"
                    aria-hidden="true"
                    aria-label="close"
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
                        aria-label="Single Select Menu Button"
                        onClick={() => onChange(field.name, itm.value)}
                        className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-dark-300 w-full text-left"
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
