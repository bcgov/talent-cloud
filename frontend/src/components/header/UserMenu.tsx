import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserIcon } from '../images';

export const UserMenu = ({
  username,
  logout,
}: {
  username?: string;
  logout: () => void;
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="hover:bg-gray-50 flex flex-row items-center justify-center space-x-2">
        {username && <p className="font-bold">{username}</p>}
        <UserIcon />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <button
                aria-label="logout"
                onClick={logout}
                className="py-2 px-4 text-sm"
              >
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
