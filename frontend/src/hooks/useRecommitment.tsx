import type { Program, RecommitmentCycle } from '@/common';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import type { RecommitmentStatus } from '@/common/enums/recommitment-status';

export interface RecommitmentDecision {
  program: Program;
  year: number;
  status: RecommitmentStatus;
  reason?: string;
}

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

  const updateRecommitment = async (
    personnelId: string,
    decisions: {
      bcws?: RecommitmentDecision;
      emcr?: RecommitmentDecision;
    },
  ) => {
    try {
      await AxiosPrivate.patch(`/recommitment/${personnelId}`, decisions);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    recommitmentCycle,
    isRecommitmentCycleOpen:
      recommitmentCycle &&
      new Date(recommitmentCycle.endDate) >= new Date() &&
      new Date(recommitmentCycle.startDate) <= new Date(),
    updateRecommitment,
  };
};
