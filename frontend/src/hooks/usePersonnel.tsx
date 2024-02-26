import { useEffect, useState } from 'react';
import { AxiosPrivate } from '../utils';
import type { Personnel } from '@/pages/dashboard';

const usePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): {
  personnel: Personnel | undefined;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();

  const updatePersonnel = (person: Personnel) => {
    setPersonnel(person);
  };

  useEffect(() => {
    (async () => {
      const response = await AxiosPrivate.get(`/personnel/${personnelId}`);
      updatePersonnel(response.data);
    })();
  }, [personnelId]);

  return {
    personnel,
  };
};

export default usePersonnel;
