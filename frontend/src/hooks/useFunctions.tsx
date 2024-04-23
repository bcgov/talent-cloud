import type { FunctionType } from '@/pages/dashboard';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

const useFunctions = () => {
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const { AxiosPrivate } = useAxios();
  useEffect(() => {
    (async () => {
      const { data } = await AxiosPrivate.get('/function');
      setFunctions(data);
    })();
  }, [AxiosPrivate]);

  return {
    functions,
  };
};

export default useFunctions;
