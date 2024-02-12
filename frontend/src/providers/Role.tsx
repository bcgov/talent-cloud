import { Role } from '@/common';
import { getUserInfo } from '@/services';
import { useKeycloak } from '@react-keycloak/web';

import { ReactElement, createContext, useEffect, useMemo, useState } from 'react';

export const RoleContext = createContext<{
  role: Role;
  username: string;
}>({role: Role.IDIR, username: ''});

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const [role, setRole] = useState<Role>(Role.IDIR);
  const [username, setUsername] = useState<string>('');
  
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState<boolean>(true);

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
      }finally{
        setLoading(false)
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
