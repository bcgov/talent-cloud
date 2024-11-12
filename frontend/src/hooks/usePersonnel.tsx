import { useEffect, useState } from 'react';
import type { Personnel } from '@/pages/dashboard';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { Route, useRoleContext } from '@/providers';
import { bcwsData, emcrData } from './profileData';
import type { ProfileData } from '@/pages/profile/types';
import { Program, Role } from '@/common';
import { useParams } from 'react-router';


const usePersonnel = ({
  personnelId,
  route,
}: {
  personnelId: string;
  route?: Route;
}): {
  personnel: Personnel | undefined;
  updatePersonnel: (person: FormikValues | Personnel) => Promise<void>;
  profileData: ProfileData;
} => {
  const [personnel, setPersonnel] = useState<Personnel>();
  const { AxiosPrivate } = useAxios();
  const { role, program } = useRoleContext();
  const {profileId} = useParams()
  
    

  useEffect(() => {
    (async () => {
      try {
        const response =
          route && (await AxiosPrivate.get(`/${route}/${personnelId}`));
        response && setPersonnel(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [personnelId, route, AxiosPrivate]);

  const updatePersonnel = async (personnel: FormikValues | Personnel) => {
    try {
      const res =
        route &&
        (await AxiosPrivate.patch(
          encodeURI(`/${route}/${personnelId}`),
          personnel,
        ));
      res && setPersonnel(res.data);
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
