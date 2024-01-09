import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';
import userIcon from '../../assets/images/user.png';
import { logout } from '../../services/keycloak';

export const UserMenu = ({ username }: { username: string }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <div className="col-span-1 text-center flex flex-row items-center justify-center space-x-2">
          <h6>{username}</h6>
          <Menu.Button className="hover:bg-gray-50">
            <img src={userIcon} alt="userIcon" />
          </Menu.Button>
        </div>
      </div>

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
              <button className="py-2 px-4 text-sm" onClick={logout}>
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
