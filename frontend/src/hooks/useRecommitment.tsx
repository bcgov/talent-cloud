import type { Program, RecommitmentCycle } from '@/common';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import type { RecommitmentStatus } from '@/common/enums/recommitment-status';
import { offsetTimezoneDate } from '@/utils';
import type { SupervisorInformation } from '@/components/recommitment';
import { addDays } from 'date-fns';
import { set } from 'lodash';
import { is } from 'cypress/types/bluebird';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

export interface RecommitmentDecision {
  program: Program;
  year: number;
  status: RecommitmentStatus;
  reason?: string;
}

export const useRecommitmentCycle = () => {
  const [recommitmentCycle, setRecommitmentCycle] = useState<RecommitmentCycle>();
const [isRecommitmentReinitCycleOpen, setIsRecommitmentReinitCycleOpen] = useState<boolean>(false);
  const { AxiosPrivate } = useAxios();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosPrivate.get('/recommitment');
        const today = new Date()
        const endDate = data.endDate && new Date(data.endDate);
        const reinitiationEndDate = data.reinitiationEndDate && new Date(data.reinitiationEndDate);
        setRecommitmentCycle(data);
        if (today > endDate && today <= reinitiationEndDate)  {
          setIsRecommitmentReinitCycleOpen(true);
      } else {
        setIsRecommitmentReinitCycleOpen(false);
      }
      } catch (e) {
        console.error(e);
      }
    })()
    
  }, []);
console.log(isRecommitmentReinitCycleOpen)
  const updateRecommitment = async (
    personnelId: string,
    decisions: {
      bcws?: RecommitmentDecision;
      emcr?: RecommitmentDecision;
      supervisorInformation?: SupervisorInformation;
    },
  ) => {
    try {
      const { data } = await AxiosPrivate.patch(
        `/recommitment/${personnelId}`,
        decisions,
      );
      
      return data;
    } catch (e: any) {
      console.error(e);
      return {
        error: {
          message:
            'An error has occurred. Please check your submission and try again',
        },
      };
    }
  };
  

  return {
    recommitmentCycle,
    isRecommitmentCycleOpen:
      recommitmentCycle &&
      offsetTimezoneDate(recommitmentCycle.endDate) >= new Date() &&
      offsetTimezoneDate(recommitmentCycle.startDate) <= new Date(),
    isRecommitmentReinitiationOpen: isRecommitmentReinitCycleOpen,
      
    updateRecommitment,
  };
};
