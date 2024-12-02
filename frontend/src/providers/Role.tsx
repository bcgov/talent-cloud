import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from './interface';
import { useAxios } from '@/hooks/useAxios';
import type { Program, Role } from '@/common';
import { type RecommitmentCycle } from '@/common';

export const RoleContext = createContext<{
  program?: Program;
  roles?: Role[];
  username?: string;
  idir?: string;
  member?: boolean;
  supervisor?: boolean;
  loading?: boolean;
  recommitmentCycle: RecommitmentCycle | null;
}>({
  program: undefined,
  roles: [],
  username: undefined,
  idir: undefined,
  member: false,
  supervisor: false,
  loading: false,
  recommitmentCycle: null,
});

export const useRecommitmentCycle = () => {
  const { recommitmentCycle } = useContext(RoleContext);
  return recommitmentCycle;
};

export const useRoleContext = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRoleContext must be used within a RoleProvider');
  const { roles, program, username, idir, member, supervisor, loading } = ctx;
  return { roles, program, username, idir, member, supervisor, loading };
};

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const { AxiosPrivate } = useAxios();
  const [recommitmentCycle, setRecommitmentCycle] =
    useState<RecommitmentCycle | null>(null);
  const [user, setUser] = useState<User>({
    program: undefined,
    roles: [],
    username: undefined,
    idir: undefined,
    member: false,
    supervisor: false,
    loading: false,
  });

  const { keycloak } = useKeycloak();

  const getLoggedInUser = async () => {
    try {
      setUser((prev) => ({ ...prev, loading: true }));
      const { data } = await AxiosPrivate.get('/auth');
      console.log(data, 'DATA');
      setRecommitmentCycle(data.recommitment);
      setUser((prev) => ({ ...prev, ...data, loading: false }));
    } catch (e) {
      console.error(e);
    } finally {
      setUser((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, [keycloak.token]);

  return (
    <RoleContext.Provider
      value={{
        recommitmentCycle,
        roles: user?.roles,
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
