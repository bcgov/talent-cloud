import { useEffect, useState } from 'react';
import type { Personnel, Role } from '@/common';
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
  roles?: Role[];
  loading?: boolean;
  program?: Program;
} => {
  const { roles, program, loading } = useRoleContext();
  const [personnel, setPersonnel] = useState<Personnel>();
  const { AxiosPrivate } = useAxios();
  const [refetch, setRefetch] = useState(false)
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
  }, [refetch]);

  const updatePersonnel = async (personnel: FormikValues) => {
    if (personnel?.newRoles) {
      personnel.roles = personnel.newRoles;
    }
    try {
      const res =
        program &&
        (await AxiosPrivate.patch(encodeURI(`/${program}/${profileId}`), personnel));
        // update endpoint does not return the same data as the GET endpoint, so triggering refetch
        res && setRefetch(!refetch);
    } catch (e) {
      //TODO error toast
    }
  };

  return {
    personnel,
    updatePersonnel,
    roles,
    loading,
    profileData:
      program === Program.BCWS ? bcwsData(personnel) : emcrData(personnel),
  };
};

export default usePersonnel;
