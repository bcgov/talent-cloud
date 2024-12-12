import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
import { UserIcon } from '../../images';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/routes';
import { useRoleContext } from '@/providers';
import { useKeycloak } from '@react-keycloak/web';
import { Role } from '@/common';

export const UserMenu = ({ logout }: { logout: () => void }) => {
  const navigate = useNavigate();
  const { username, roles } = useRoleContext();
  const keycloak = useKeycloak();
  const keycloakUsername = keycloak?.keycloak?.idTokenParsed?.preferred_username;
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="hover:bg-gray-50 flex flex-row items-center justify-center space-x-2">
        <p className="font-bold">{username ?? keycloakUsername}</p>
        <UserIcon />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 min-w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
          {roles?.find(
            (role) => role === Role.COORDINATOR || role === Role.LOGISTICS,
          ) && (
            <MenuItem>
              <button
                aria-label="profile"
                onClick={() => navigate(Routes.Dashboard)}
                className="py-2 px-4 text-sm text-left"
              >
                CORE Dashboard
              </button>
            </MenuItem>
          )}
          {roles?.includes(Role.MEMBER) && (
            <MenuItem>
              <button
                aria-label="profile"
                onClick={() => navigate(Routes.MemberProfile)}
                className="py-2 px-4 text-sm text-left"
              >
                My Profile
              </button>
            </MenuItem>
          )}
          {roles?.includes(Role.SUPERVISOR) && (
            <MenuItem>
              <button
                aria-label="supervisor"
                onClick={() => navigate(Routes.SupervisorDashboard)}
                className="py-2 px-4 text-sm text-left text-nowrap"
              >
                Supervisor Dashboard
              </button>
            </MenuItem>
          )}
          <MenuItem>
            <button
              aria-label="logout"
              onClick={logout}
              className="py-2 px-4 text-sm text-left"
            >
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
