import { Program, RoleContext, Route } from '@/providers/Role';
import { useContext, useEffect } from 'react';
import { useAxios } from './useAxios';

export const useRole = () => {
  const {
    role,
    setRole,
    program,
    setProgram,
    username,
    setUsername,
    route,
    setRoute,
  } = useContext(RoleContext);

  const { AxiosPrivate } = useAxios();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { username, role, program },
        } = await AxiosPrivate.get('/auth/userInfo');
        setUsername(username);
        setRole(role);
        setProgram(program);

        if (program === 'admin') {
          setRoute((localStorage.getItem('route') as Route) ?? Route.BCWS);
        } else {
          setRoute(program);
        }
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }, [AxiosPrivate]);

  const handleToggle = () => {
    if (route === Route.EMCR) {
      setRoute(Route.BCWS);
      localStorage.setItem('route', Route.BCWS);
    } else {
      setRoute(Route.EMCR);
      localStorage.setItem('route', Program.EMCR);
    }
  };

  return { role, program, username, handleToggle, route };
};
