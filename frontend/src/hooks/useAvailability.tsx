import { useState } from 'react';
import { AxiosPrivate } from '../utils';
import type { Availability, AvailabilityRange, Personnel } from '@/pages/dashboard';

const useAvailability = ({
  personnelId,
}: {
  personnelId: string
}): {
  availability: Availability[];
  getAvailability: (from: string, to: string) => Promise<void>;
  saveAvailability: (dates: AvailabilityRange) => Promise<void>;
} => {
  const [availability, setAvailability] = useState<Availability[]>([]);

  const getAvailability = async (from: string, to: string) => {
    const response = await AxiosPrivate.get(
      encodeURI(
        `/personnel/${personnelId}/availability?from=${from}&to=${to}`,
      ),
    );
    setAvailability(response.data);
  };

  const saveAvailability = async (dates: AvailabilityRange) => {
    await AxiosPrivate.patch(
      encodeURI(`/personnel/${personnelId}/availability`),
      dates,
    );
  };

  return {
    availability,
    getAvailability,
    saveAvailability,
  };
}

export default useAvailability;