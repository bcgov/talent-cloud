import { useEffect, useState } from 'react';
import { AxiosPrivate } from '../utils';
import type { Availability, AvailabilityRange, Personnel } from '@/pages/dashboard';
import dayjs from 'dayjs';

const usePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): {
  personnel: Personnel | undefined;
  availability: Availability[];
  setCurrentAvailability: (from: string, to: string) => void;
  getAvailability: () => Promise<void>;
  saveAvailability: (dates: AvailabilityRange) => Promise<void>;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [currentAvailabilityRange, setCurrentAvailabilityRange] = useState<{
    from: string;
    to: string;
  }>({
    from: dayjs().format('YYYY-MM-DD'),
    to: dayjs().format('YYYY-MM-DD'),
  });

  const setCurrentAvailability = (from: string, to: string) => {
    setCurrentAvailabilityRange({ from, to });
  };

  const getAvailability = async () => {
    const response = await AxiosPrivate.get(
      encodeURI(
        `/personnel/${personnelId}/availability?from=${currentAvailabilityRange.from}&to=${currentAvailabilityRange.to}`,
      ),
    );
    setAvailability(response.data);
  };

  const saveAvailability = async (dates: AvailabilityRange) => {
    await AxiosPrivate.patch(
      encodeURI(`/personnel/${personnelId}/availability`),
      dates,
    );
    getAvailability();
  };
  
  useEffect(() => {
    getAvailability();
  }, [currentAvailabilityRange]);

  useEffect(() => {
    (async () => {
      const response = await AxiosPrivate.get(`/personnel/${personnelId}`);
      setPersonnel(response.data);
    })();
  }, [personnelId]);

  return {
    personnel,
    availability,
    setCurrentAvailability,
    getAvailability,
    saveAvailability,
  };
};

export default usePersonnel;
