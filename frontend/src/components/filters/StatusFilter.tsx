import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { classes } from '@/components/filters/classes';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { Filters,  StatusNames } from '@/common';
import { Fragment } from 'react';

export const StatusFilter = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: any;
  setSearchParams: (searchParams: any) => any;
}) => {
  const statusFilter = [StatusNames.ALL, StatusNames.NEW, StatusNames.RECOMMITTED];
  const value = searchParams.get(Filters.AVAILABLE_STATUS) ?? StatusNames.ALL;

  const onChange = (value: string) => {
    searchParams.set(Filters.AVAILABLE_STATUS, value);
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };
  return (
    <>
      <div className="w-full border border-slate-500"></div>
      <div className="py-1 px-2 lg:w-3/4">
        <Menu as="div" className="relative inline-block text-left w-1/4">
          {({ open }) => (
            <>
              <MenuButton
                className={classes.menu.container}
                aria-label="Single Select Menu Button"
              >
                <p className={classes.menu.placeholder}>{value}</p>
                {open ? (
                  <ChevronUpIcon aria-hidden="true" aria-label="open" />
                ) : (
                  <ChevronDownIcon aria-hidden="true" aria-label="close" />
                )}
              </MenuButton>

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
                    {statusFilter.map((itm) => (
                      <MenuItem key={itm}>
                        <button
                          aria-label="Single Select Menu Button"
                          onClick={() => onChange(itm)}
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 w-full text-left"
                        >
                          {itm}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </>
  );
};
