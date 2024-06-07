import type { BcwsRoleInterface, FunctionType } from '@/pages/dashboard';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import { Route } from '../providers';

const useFunctions = (route?: Route) => {
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const [bcwsRoles, setBcwsRoles] = useState<BcwsRoleInterface[]>([]);
  const { AxiosPrivate } = useAxios();

  useEffect(() => {
    (async () => {
      if (route && route === Route.EMCR) {
        const { data } = await AxiosPrivate.get('/function');
        setFunctions(data);
      } else if (route && route === Route.BCWS) {
        const { data } = await AxiosPrivate.get('/function/roles');
        setBcwsRoles(data);
      }
    })();
  }, [route]);

  return {
    functions,
    bcwsRoles,
  };
};

export default useFunctions;
