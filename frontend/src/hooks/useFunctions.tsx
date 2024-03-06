import type { FunctionType } from '@/pages/dashboard';
import { AxiosPrivate } from '@/utils';
import { useEffect, useState } from 'react';

const useFunctions = () => {
  const [functions, setFunctions] = useState<FunctionType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await AxiosPrivate.get('/function');
      setFunctions(data);
    })();
  }, []);

  return {
    functions,
  };
};

export default useFunctions;
