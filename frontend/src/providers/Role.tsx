import { Role } from '@/common';
import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

export enum Program {
  BCWS = 'bcws',
  EMCR = 'emcr',
}

export enum Route {
  BCWS = 'bcws',
  EMCR = 'emcr',
}

type UserInfo = {
  given_name: string;
  family_name: string;
  client_roles: string[];
};

export const RoleContext = createContext<{
  role: Role | undefined;
  route: Route | undefined;

  username: string;
}>({
  role: undefined,
  username: '',
  route: undefined,
});

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const { keycloak } = useKeycloak();
  const [role, setRole] = useState<Role>();
  const [username, setUsername] = useState<string>('');
  const [route, setRoute] = useState<Route | undefined>();

  useEffect(() => {
    (async () => {
      if (!keycloak.authenticated) {
        return;
      }
      const userInfo = (await keycloak.loadUserInfo()) as UserInfo;
      setUsername(`${userInfo.given_name} ${userInfo.family_name}`);
      if (userInfo?.client_roles?.includes('emcr')) {
        setRoute(Route.EMCR);
      } else if (userInfo?.client_roles?.includes('bcws')) {
        setRoute(Route.BCWS);
      }
      if (userInfo?.client_roles?.includes('coordinator')) {
        setRole(Role.COORDINATOR);
      } else if (userInfo?.client_roles?.includes('logistics')) {
        setRole(Role.LOGISTICS);
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      role,
      setRole,
      username,
      setUsername,
      route,
      setRoute,
    }),
    [role, username, route],
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
