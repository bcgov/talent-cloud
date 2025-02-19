import type { Personnel, Program, RecommitmentCycle } from '@/common';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';
import { offsetTimezoneDate } from '@/utils';
import type { SupervisorInformation } from '@/components/recommitment';
import { addDays } from 'date-fns';

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

  const getProfileRecommitmentStatusText = (personnel: Personnel) => {
    const recommitment = personnel?.recommitment?.find(
      (r) => r.year === new Date().getFullYear(),
    );
    if (!recommitment) {
      return 'Was inactive before start of recommitment cycle.';
    }
    if (
      [
        RecommitmentStatus.MEMBER_NO_RESPONSE,
        RecommitmentStatus.SUPERVISOR_NO_RESPONSE,
      ].includes(recommitment.status)
    ) {
      return 'Recommitment deadline missed by member or their supervisor.';
    }
    if (
      [
        RecommitmentStatus.MEMBER_DENIED,
        RecommitmentStatus.SUPERVISOR_DENIED,
      ].includes(recommitment.status)
    ) {
      return 'Member or their supervisor denied recommitment.';
    }
    if (recommitment.status === RecommitmentStatus.PENDING) {
      return 'Awaiting member decision on recommitment.';
    }
    return '';
  };

  return {
    recommitmentCycle,
    isRecommitmentCycleOpen:
      recommitmentCycle &&
      offsetTimezoneDate(recommitmentCycle.endDate) >= new Date() &&
      offsetTimezoneDate(recommitmentCycle.startDate) <= new Date(),
    isRecommitmentReinitiationOpen:
      recommitmentCycle &&
      recommitmentCycle.reinitiationEndDate &&
      offsetTimezoneDate(addDays(recommitmentCycle.endDate, 1).toString()) <=
        new Date() &&
      offsetTimezoneDate(
        addDays(recommitmentCycle.reinitiationEndDate, 1).toString(),
      ) >= new Date(),
    updateRecommitment,
    getProfileRecommitmentStatusText,
  };
};
