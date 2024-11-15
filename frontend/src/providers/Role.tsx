import { useKeycloak } from '@react-keycloak/web';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect,  useState } from 'react';
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
  
  const [user, setUser] = useState<User>({})

  const { keycloak } = useKeycloak()

  const getLoggedInUser = async () => {
    try {
      const { data } = await AxiosPrivate.get('/auth')
      setUser({ ...data })
    } catch (e) {
      console.error(e)
    } 
  }

  useEffect(() => {
    getLoggedInUser()
  }, [keycloak.idToken])


  return <RoleContext.Provider value={user}>{children}</RoleContext.Provider>
}

