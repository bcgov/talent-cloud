import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import type { Program, Role } from '@/common';
import { useKeycloak } from '@react-keycloak/web';

interface RoleContext {
  program?: Program;
  roles?: Role[];
  username?: string;
  idir?: string;
  loading?: boolean;
}
export const RoleContext = createContext<RoleContext>({});

export const useRoleContext = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRoleContext must be used within a RoleProvider');
  return ctx;
};

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const { AxiosPrivate } = useAxios();
  const [program, setProgram] = useState<Program>();
  const [roles, setRoles] = useState<Role[]>();
  const [username, setUsername] = useState<string>();
  const [idir, setIdir] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const { data } = await AxiosPrivate.get('/auth');
      setProgram(data.program);
      setRoles(data.roles);
      setUsername(data.username);
      setIdir(data.idir);
      setLoading(data.loading);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const { keycloak } = useKeycloak();

  useEffect(() => {
    getLoggedInUser();
  }, [keycloak.idToken]);

  const value = useMemo(() => {
    return {
      roles,
      program,
      username,
      idir,
      loading,
    };
  }, [roles, program, username, idir, loading]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
