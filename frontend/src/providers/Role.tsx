import { Role } from '@/common';
import { Loading } from '@/components';
import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

export enum Program {
  BCWS = 'bcws',
  EMCR = 'emcr',
  ADMIN = 'admin',
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
  program: Program | undefined;
  route: Route | undefined;
  username: string;
}>({
  role: undefined,
  program: undefined,
  username: '',
  route: undefined,
});

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const [userRole, setUserRole] = useState<{ program?: Program; role?: Role }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userInfo = (await keycloak.loadUserInfo()) as UserInfo;
      setUsername(`${userInfo.given_name} ${userInfo.family_name}`);
      if (userInfo.client_roles.includes('emcr'))
        setUserRole((prev) => ({ ...prev, program: Program.EMCR }));
      else if (userInfo.client_roles.includes('bcws'))
        setUserRole((prev) => ({ ...prev, program: Program.BCWS }));
      else navigate('/unauthorized');
      if (userInfo.client_roles.includes('logistics'))
        setUserRole((prev) => ({ ...prev, role: Role.LOGISTICS }));
      else if (userInfo.client_roles.includes('coordinator'))
        setUserRole((prev) => ({ ...prev, role: Role.COORDINATOR }));
      else navigate('/unauthorized');
      setLoading(false);
    })();
  }, []);

  const value = useMemo(
    () => ({
      role: userRole?.role,
      program: userRole?.program,
      username,
      route: userRole?.program as unknown as Route,
    }),
    [userRole, username],
  );

  if (loading) {
    return <Loading />;
  }
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
