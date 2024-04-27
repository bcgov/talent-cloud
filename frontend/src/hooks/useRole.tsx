import { Program } from '@/common';
import { RoleContext } from '@/providers/Role';
import { useContext, useEffect, useState } from 'react';
import { useAxios } from './useAxios';

export const useRole = () => {
  const { user, setUser } = useContext(RoleContext);
  const { AxiosPrivate } = useAxios();
  const [route, setRoute] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosPrivate.get('/auth/userInfo');
        const { username, role, program } = data;
        setUser({ role, program, username });
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }, [AxiosPrivate]);

  useEffect(() => {
    const isAdmin = user.program === 'admin';

    const isBcws = user.program === 'bcws';
    const isEmcr = user.program === 'emcr';
    if (isBcws) {
      setRoute('bcws');
    }
    if (isEmcr) {
      setRoute('emcr');
    }
    if (isAdmin) {
      const userView = localStorage.getItem('view');
      if (userView && userView !== undefined) {
        setRoute(userView);
      } else {
        localStorage.setItem('view', 'emcr');
        setRoute('emcr');
      }
    }
  }, []);

  const handleViewToggle = () => {
    if (route === Program.EMCR) {
      setRoute(Program.BCWS);
    } else {
      setRoute(Program.EMCR);
    }
  };

  return {
    user,
    route,
    handleViewToggle,
  };
};
