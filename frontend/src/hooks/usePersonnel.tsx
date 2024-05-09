import { useContext, useEffect, useState } from 'react';
import type { ExperienceInterface, Personnel } from '@/pages/dashboard';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { RoleContext } from '@/providers';

const usePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): {
  personnel: Personnel | undefined;
  updatePersonnel: (person: FormikValues) => Promise<void>;
  updateExperiences: (experiences: ExperienceInterface[]) => Promise<void>;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();
  const { AxiosPrivate } = useAxios();
  const {route} = useContext(RoleContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosPrivate.get(`/personnel/${route}/${personnelId}`);
        setPersonnel(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [personnelId, AxiosPrivate]);

  const updatePersonnel = async (personnel: FormikValues) => {
    try {
      const res = await AxiosPrivate.patch(
        encodeURI(`/personnel/${route}/${personnelId}`),
        personnel,
      );
      setPersonnel(res.data);
    } catch (e) {
      //TODO error toast
    }
  };

  const updateExperiences = async (experiences: ExperienceInterface[]) => {
    try {
      const res = await AxiosPrivate.patch(encodeURI(`/personnel/${route}/${personnelId}`), {
        experiences,
      });
      setPersonnel(res.data);
    } catch (e) {
      // TODO error toast
    }
  };

  return {
    personnel,
    updatePersonnel,
    updateExperiences,
  };
};

export default usePersonnel;
