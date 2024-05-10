import { Program, RoleContext } from '@/providers/Role';
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
          setRoute((localStorage.getItem('route') as Program) ?? Program.BCWS);
        } else {
          setRoute(program);
        }
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }, [AxiosPrivate]);

  console.log(route, program, role, username);

  const handleToggle = () => {
    if (route === Program.EMCR) {
      setRoute(Program.BCWS);
      localStorage.setItem('route', Program.BCWS);
    } else {
      setRoute(Program.EMCR);
      localStorage.setItem('route', Program.EMCR);
    }
  };

  return { role, program, username, handleToggle, route };
};
