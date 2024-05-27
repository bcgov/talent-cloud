import { useContext, useEffect, useState } from 'react';
import type { Personnel } from '@/pages/dashboard';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { RoleContext, Route } from '@/providers';
import { bcwsData, emcrData } from './profileData';
import type { ProfileData } from '@/pages/profile/types';

const usePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): {
  personnel: Personnel | undefined;
  updatePersonnel: (person: FormikValues | Personnel) => Promise<void>;
  profileData: ProfileData;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();
  const { AxiosPrivate } = useAxios();
  const { route } = useContext(RoleContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosPrivate.get(
          `/personnel/${route}/id/${personnelId}`,
        );
        setPersonnel(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [personnelId, AxiosPrivate]);

  const updatePersonnel = async (personnel: FormikValues | Personnel) => {
    try {
      const res = await AxiosPrivate.patch(
        encodeURI(`/personnel/${route}/id/${personnelId}`),
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
    profileData: route === Route.BCWS ? bcwsData(personnel) : emcrData(personnel),
  };
};

export default usePersonnel;
