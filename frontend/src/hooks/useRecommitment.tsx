import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import type { RecommitmentCycle } from '@/common';

export const useRecommitment = () => {
  const [recommitment, setRecommitment] = useState<RecommitmentCycle | null>(null);
  const { AxiosPrivate } = useAxios();

  useEffect(() => {
    (async () => {
      try {
        const res = await AxiosPrivate.get('/personnel/recommitment');
        res.data && setRecommitment(res.data);
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return {
    recommitment,
  };
};
