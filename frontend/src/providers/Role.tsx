import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from './interface';
import { useAxios } from '@/hooks/useAxios';

export const RoleContext = createContext<User>({});

export const useRoleContext = () => {
  const { role, program, username, idir, member, supervisor, loading } =
    useContext(RoleContext);

  return { role, program, username, idir, member, supervisor, loading };
};

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const { AxiosPrivate } = useAxios();

  const [user, setUser] = useState<User>();

  const { keycloak } = useKeycloak();

  const getLoggedInUser = async () => {
    try {
      setUser((prev) => ({ ...prev, loading: true }));
      const { data } = await AxiosPrivate.get('/auth');
      console.log(data);
      setUser((prev) => ({ ...prev, ...data }));
    } catch (e) {
      console.error(e);
    } finally {
      setUser((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, [keycloak.idToken]);

  return (
    <RoleContext.Provider
      value={{
        role: user?.role,
        program: user?.program,
        username: user?.username,
        idir: user?.idir,
        member: user?.member,
        supervisor: user?.supervisor,
        loading: user?.loading,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
