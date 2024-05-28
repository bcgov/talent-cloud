import type { FunctionType } from '@/pages/dashboard';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import { useRole } from './useRole';
import { Route } from '../providers';

const useFunctions = () => {
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const [bcwsRoles, setBcwsRoles] = useState<any[]>([]);
  const { AxiosPrivate } = useAxios();
  const { route } = useRole();
  useEffect(() => {
    (async () => {
      if (route === Route.EMCR) {
        const { data } = await AxiosPrivate.get('/function');
        setFunctions(data);
      } else if (route === Route.BCWS) {
        const { data } = await AxiosPrivate.get('/function/bcws/roles');
        setBcwsRoles(data);
      }
    })();
  }, [AxiosPrivate]);

  return {
    functions,
    bcwsRoles,
  };
};

export default useFunctions;
