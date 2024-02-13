import type { Role } from '@/common';
import { getUserInfo } from '@/services';
import { useKeycloak } from '@react-keycloak/web';

import type { ReactElement } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

export const RoleContext = createContext<{
  role?: Role;
  username: string;
}>({ role: undefined, username: '' });

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const [role, setRole] = useState<Role>();
  const [username, setUsername] = useState<string>('');

  const { keycloak } = useKeycloak();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { username, role },
        } = await getUserInfo();
        setUsername(username);
        setRole(role as Role);
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }, [keycloak.authenticated]);

  const value = useMemo(
    () => ({
      role,
      username,
    }),
    [role],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
