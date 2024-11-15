import { UserMenu } from './UserMenu';
import { CoreLogoHorizontal } from '../../images';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { headerLink } from '@/common/links';
import { logoutUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';

export const Header = () => {
  const [open, setOpen] = useState(false);

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
        
          <>
            <div className="text-center hidden lg:flex flex-row items-center justify-center space-x-2"></div>

            <div className="hidden md:flex text-center  md:flex-row items-center justify-end space-x-2 px-8">
              <UserMenu
                logout={() => window.location.replace(logoutUrl(keycloak))}
              />
            </div>
          </>
        
      </div>

      <div className="md:hidden">
        
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
                <div className="hover:bg-grayBackground  px-8 py-8 w-full  border border-t-1 border-300">
                  <button
                    aria-label="logout"
                    className="text-normal font-normal"
                    onClick={() => window.location.replace(logoutUrl(keycloak))}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Menu.Items>
          </Menu>
        
      </div>
    </header>
  );
};
