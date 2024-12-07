import type { RecommitmentCycle } from '@/common';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

export const useRecommitmentCycle = () => {
  const [recommitmentCycle, setRecommitmentCycle] = useState<RecommitmentCycle>();

  const { AxiosPrivate } = useAxios();

  useEffect(() => {
    const fetchRecommitmentCycle = async () => {
      try {
        const { data } = await AxiosPrivate.get('/recommitment');
        setRecommitmentCycle(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecommitmentCycle();
  }, []);

  return {
    recommitmentCycle,
    isRecommitmentCycleOpen:
      recommitmentCycle &&
      new Date(recommitmentCycle.endDate) >= new Date() &&
      new Date(recommitmentCycle.startDate) <= new Date(),
  };
};
