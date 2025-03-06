import { useEffect, useState } from 'react';
import type {
  BcwsPersonnelRoleInterface,
  ExperienceInterface,
  Personnel,
  Role,
  UpdateBcwsRoles,
} from '@/common';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { useRoleContext } from '@/providers';
import { bcwsData, emcrData } from './coordinatorProfileData';
import type { ProfileData } from '@/pages/profile/types';
import { Program } from '@/common';
import { useParams } from 'react-router';
import { PersonnelEndpoint } from '@/common/enums/personnel-endpoint';
import { Training } from '@/common/enums/trainings.enum';

const usePersonnel = (): {
  personnel: Personnel | undefined;
  updatePersonnel: (person: FormikValues | Personnel) => Promise<void>;
  fetch: () => Promise<void>;
  profileData: ProfileData;
  roles?: Role[];
  loading?: boolean;
  program?: Program;
} => {
  const { roles, program, loading } = useRoleContext();
  const [personnel, setPersonnel] = useState<Personnel>();
  const { AxiosPrivate } = useAxios();
  const { profileId } = useParams();
  const [refetch, setRefetch] = useState(false);

  const fetch = async () => {
    try {
      const response =
        program && (await AxiosPrivate.get(`/${program}/${profileId}`));
      if (response?.data) {
        setPersonnel(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, [refetch]);

  const updatePersonnel = async (personnel: FormikValues, endpoint = '') => {
    //TODO: refactor this to use the training array on the FE or set as a single field on the emcr personnel in the BE
    if (personnel.icsTraining) {
      if (personnel.icsTraining === 'true' || personnel.icsTraining === true) {
        personnel.trainings = [{ name: Training.ICS_TRAINING_NAME }];
        delete personnel.icsTraining;
      } else {
        personnel.trainings = [];
        delete personnel.icsTraining;
      }
    }
    if (endpoint === PersonnelEndpoint.Roles) {
      const roles: UpdateBcwsRoles[] = personnel.roles.map(
        (r: BcwsPersonnelRoleInterface) => ({
          roleId: r.id,
          expLevel: r.expLevel,
        }),
      );
      personnel = { ...personnel, roles };
    }
    if (endpoint === PersonnelEndpoint.Experiences) {
      personnel = personnel.experiences.map((e: ExperienceInterface) => ({
        functionId: e.id,
        id: e.id,
        experienceType: e.experienceType,
      }));
    }
    if (endpoint === PersonnelEndpoint.Roles) {
      personnel = {
        ...personnel,
        secondChoiceSection: personnel.secondChoiceSection ?? null,
      };
    }

    try {
      const res =
        program &&
        (await AxiosPrivate.patch(
          encodeURI(`/${program}/${profileId}/${endpoint}`),
          personnel,
        ));
      // update endpoint does not return the same data as the GET endpoint, so triggering refetch
      if (res) {
        setRefetch(!refetch);
      }
    } catch (e) {
      //TODO error toast
    }
  };

  return {
    personnel,
    updatePersonnel,
    fetch,
    roles,
    loading,
    profileData:
      program === Program.BCWS ? bcwsData(personnel) : emcrData(personnel),
  };
};

export default usePersonnel;
