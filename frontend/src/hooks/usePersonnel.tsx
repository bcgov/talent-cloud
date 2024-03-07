import { useEffect, useState } from 'react';
import { AxiosPrivate } from '../utils';
import type { Personnel } from '@/pages/dashboard';
import type { FormikValues } from 'formik';

const usePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): {
  personnel: Personnel | undefined;
  updatePersonnel: (person: FormikValues) => Promise<void>;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();

  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosPrivate.get(`/personnel/${personnelId}`);
        setPersonnel(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [personnelId]);

  const updatePersonnel = async (personnel: FormikValues) => {
    try {
      const res = await AxiosPrivate.patch(
        encodeURI(`/personnel/${personnelId}`),
        personnel,
      );
      setPersonnel(res.data);
    } catch (e) {
      //TODO error toast
    }
  };

  return {
    personnel,
    updatePersonnel,
  };
};

export default usePersonnel;
