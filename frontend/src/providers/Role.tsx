import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from './interface';
import { useAxios } from '@/hooks/useAxios';

export const RoleContext = createContext<User>({});

export const useRoleContext = () => {

  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleContext must be used within a RoleProvider');
  }
  return context;
}

export const RoleProvider = ({ children }: { children: ReactElement }) => {

  const { AxiosPrivate } = useAxios();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()

  const { keycloak } = useKeycloak()

  const getUserPermissions = async () => {

    try {


      const { data } = await AxiosPrivate.get('/auth')

      setUser({ role: data.role, program: data.program, username: data.name, idir: data.idir })


    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  console.log(user?.role)
  useEffect(() => {
    getUserPermissions()
  }, [keycloak.idToken])

  if (loading) {
    return <div>Loading...</div>
  }

  return <RoleContext.Provider value={{
    role: user?.role,
    program: user?.program,
    username: user?.username,
    idir: user?.idir,

  }}>{children}</RoleContext.Provider>
}

