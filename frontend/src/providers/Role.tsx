import { Role } from '@/common';
import { Loading } from '@/components';
import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from './interface';

export const RoleContext = createContext<User | undefined>(undefined);

export const useRoleContext = () => {

  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleContext must be used within a RoleProvider');
  }
  return context;
}

export const RoleProvider = ({ children }: { children: ReactElement }) => {

  const { AxiosPrivate } = useAxios();

  const [role, setRole] = useState<Role>();
  const [program, setProgram] = useState<Program>();
  const [username, setName] = useState<string>('');
  const [idir, setIdir] = useState<string>('');
  const [loading, setLoading] = useState(false)

  const { keycloak } = useKeycloak()

  const getUserPermissions = async () => {

    try {
      setLoading(true)
      const { data } = await AxiosPrivate.get('/auth')

      setRole(data.role)
      setName(data.name)
      setProgram(data.program)
      setIdir(data.idir)


    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    getUserPermissions()
  }, [keycloak.idToken])



  return <RoleContext.Provider value={{
    role,
    program,
    username,
    idir,
    loading
  }}>{children}</RoleContext.Provider>
}

