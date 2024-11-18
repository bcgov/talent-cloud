import { useEffect, useState } from 'react';
import type { Personnel } from '@/common';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { useRoleContext } from '@/providers';
import { bcwsData, emcrData } from './profileData';
import type { ProfileData } from '@/pages/profile/types';
import { Program } from '@/common';
import { useParams } from 'react-router';

const usePersonnel = (): {
  personnel: Personnel | undefined;
  updatePersonnel: (person: FormikValues | Personnel) => Promise<void>;
  profileData: ProfileData;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();
  const { AxiosPrivate } = useAxios();
  const { program } = useRoleContext();
  const { profileId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response =
          program && (await AxiosPrivate.get(`/${program}/${profileId}`));
        response && setPersonnel(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [profileId, program, AxiosPrivate]);

  const updatePersonnel = async (personnel: FormikValues | Personnel) => {
    try {
      const res =
        program &&
        (await AxiosPrivate.patch(encodeURI(`/${program}/${profileId}`), personnel));
      res && setPersonnel(res.data);
    } catch (e) {
      //TODO error toast
    }
  };

  return {
    personnel,
    updatePersonnel,
    profileData:
      program === Program.BCWS ? bcwsData(personnel) : emcrData(personnel),
  };
};

export default usePersonnel;
