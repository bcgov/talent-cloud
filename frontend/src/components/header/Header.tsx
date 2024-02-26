import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { CloudIcon, EmcrLogo } from '../images';
import { LINKS } from '@/common';
import { Routes } from '@/routes';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { logout } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';

export const Header = ({
  appName,
  username,
  authenticated,
}: {
  appName: string;
  username?: string;
  authenticated?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const showMenu = () => {
    setOpen(!open);
  };
  const { keycloak } = useKeycloak();
  return (
    <header className="relative w-full border-b z-20 py-0">
      <div className="hidden w-full md:flex justify-start md:justify-between items-start md:items-center fixed top-0 mt-0 bg-white border-b border-[#D9D9D9] shadow-sm lg:px-24 py-0">
        <div className="lg:flex">
          <a href={LINKS.EMCR} className="py-0 my-0">
            <EmcrLogo />
          </a>
        </div>
        {authenticated && (
          <>
            <div className="text-center hidden lg:flex flex-row items-center justify-center space-x-2">
              <CloudIcon />
              <Link to={Routes.Dashboard} className="hover:underline">
                <h4>{appName.toUpperCase()}</h4>
              </Link>
            </div>

            <div className="hidden md:flex text-center  md:flex-row items-center justify-end space-x-2 px-8">
              {username && <UserMenu username={username} />}
            </div>
          </>
        )}
      </div>

      <div className="md:hidden">
        {authenticated && (
          <Menu>
            <Menu.Button>
              {({ open }) =>
                open ? (
                  <XMarkIcon className="h-10 w-10 my-4 mx-4" onClick={showMenu} />
                ) : (
                  <Bars3Icon className="h-10 w-10 my-4 mx-4" onClick={showMenu} />
                )
              }
            </Menu.Button>
            <Menu.Items>
              <div className="text-left flex-col items-start justify-start w-full  border border-t-1 border-300">
                <div className="px-8 py-8 hover:bg-grayBackground ">
                  <Link
                    to={Routes.Dashboard}
                    className="hover:bg-grayBackground text-normal font-normal"
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="hover:bg-grayBackground  px-8 py-8 w-full  border border-t-1 border-300">
                  <button
                    className="text-normal font-normal"
                    onClick={() => logout(keycloak, Routes.Home)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </div>
    </header>
  );
};
