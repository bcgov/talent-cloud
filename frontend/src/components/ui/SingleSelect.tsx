// react
import { Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

// ui
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Chip } from '.';
import { classes, menuItemClass } from '../filters/classes';

// types
import type { AvailabilityType } from '@/common';
import { AvailabilityTypeName } from '@/common';

// util
import { getLabelFromValue } from '@/utils';

export const SingleSelect = ({
  field,
  handleChange,
  handleClose = () => {},
  label,
  placeholder = 'placeholder',
  styleProp,
  useChip = false,
  value,
}: {
  field: any;
  handleChange?: any;
  handleClose?: () => void;
  label?: string;
  placeholder?: string;
  styleProp?: string;
  useChip?: boolean;
  value?: string;
}) => {
  // set menu style
  const menuStyle = field.name ? menuItemClass[field.name] : classes.menu.container;

  return (
    <>
      {label && <span className="label">{label}</span>}
      <Menu as="div" className="relative inline-block text-left w-full">
        {({ open }) => (
          <>
            {value ? (
              useChip ? (
                <div className={menuStyle}>
                  {' '}
                  <Chip
                    value={value}
                    label={AvailabilityTypeName[value as AvailabilityType]}
                    name={field.name}
                    handleClose={handleClose}
                  />
                </div>
              ) : (
                <MenuButton
                  aria-label="Single Select Menu Button"
                  id={field.name}
                  className={open ? `${menuStyle} ${styleProp}` : menuStyle}
                >
                  <p className={classes.menu.listItem}>
                    {getLabelFromValue(field.options, value)}
                  </p>
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-icon"
                    aria-hidden="true"
                    aria-label="close"
                  />
                </MenuButton>
              )
            ) : (
              <MenuButton
                id={field.name}
                className={open ? `${menuStyle} ${styleProp}` : menuStyle}
                aria-label="Single Select Menu Button"
              >
                <p className={classes.menu.placeholder}>{placeholder}</p>
                {open ? (
                  <ChevronUpIcon
                    className="-mr-1 h-5 w-5 text-icon"
                    aria-hidden="true"
                    aria-label="open"
                  />
                ) : (
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-icon"
                    aria-hidden="true"
                    aria-label="close"
                  />
                )}
              </MenuButton>
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
              <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 w-full">
                  {field.options.map((itm: { label: string; value: string }) => (
                    <MenuItem key={itm.value}>
                      <button
                        aria-label="Single Select Menu Button"
                        onClick={() => {
                          handleChange && handleChange(itm.value);
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 w-full text-left"
                      >
                        {itm.label}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
