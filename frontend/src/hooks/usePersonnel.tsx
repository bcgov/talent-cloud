import { useEffect, useState } from 'react';
import { AxiosPrivate } from '../utils';
import type { Availability, Personnel } from '@/pages/dashboard';

const usePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): {
  personnel: Personnel | undefined;
  availability: Availability[];
  getAvailability: (from: string, to: string) => Promise<void>;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();
  const [availability, setAvailability] = useState<Availability[]>([]);

  useEffect(() => {
    (async () => {
      const response = await AxiosPrivate.get(`/personnel/${personnelId}`);
      setPersonnel(response.data);
    })();
  }, [personnelId]);

  const getAvailability = async (from: string, to: string) => {
    const response = await AxiosPrivate.get(
      `/personnel/${personnelId}/availability?from=${from}&to=${to}`,
    );
    setAvailability(response.data);
  };

  return {
    personnel,
    availability,
    getAvailability,
  };
};

export default usePersonnel;
