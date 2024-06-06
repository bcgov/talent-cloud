import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { CloudIcon, CoreLogoHorizontal } from '../images';
import { Routes } from '@/routes';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { headerLink } from '@/common/links';
import { logout } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';
import { useRole } from '@/hooks';

export const Header = ({
  appName,
  authenticated,
}: {
  appName: string;
  authenticated?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const { username } = useRole();

  const showMenu = () => {
    setOpen(!open);
  };
  const { keycloak } = useKeycloak();
  return (
    <header className="relative w-full border-b z-40">
      <div className="hidden w-full md:flex justify-start md:justify-between items-start md:items-center fixed top-0 mt-0 bg-white border-b border-[#D9D9D9] shadow-sm md:px-12 lg:px-24  2xl:px-64">
        <div className="lg:flex">
          <a
            href={headerLink}
            className="p-2 my-0"
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            <CoreLogoHorizontal />
          </a>
        </div>
        {authenticated && (
          <>
            <div className="text-center hidden lg:flex flex-row items-center justify-center space-x-2">
              <CloudIcon />
              <Link to={Routes.Dashboard} reloadDocument className="hover:underline">
                <h3>{appName.toUpperCase()}</h3>
              </Link>
            </div>

            <div className="hidden md:flex text-center  md:flex-row items-center justify-end space-x-2 px-8">
              {username && (
                <UserMenu username={username} logout={() => logout(keycloak)} />
              )}
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
                    aria-label="logout"
                    className="text-normal font-normal"
                    onClick={() => logout(keycloak)}
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
