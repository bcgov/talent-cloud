import { useEffect, useState } from 'react';
import type { MemberProfile, Personnel } from '@/common';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { Program } from '@/common';

const useMemberProfile = (): {
  personnel?: MemberProfile;
  updatePersonnel: (person: FormikValues | Personnel) => Promise<void>;
  loading: boolean;
  program?: Program;
} => {
  const [personnel, setPersonnel] = useState<MemberProfile>();
  const { AxiosPrivate } = useAxios();

  const [loading, setIsLoading] = useState(false);
  const [program, setProgram] = useState<Program>();

  const getProfileDetails = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosPrivate.get(`/personnel`);
      response && setPersonnel({ ...response.data });
      if (response?.data?.bcws && response?.data?.emcr) {
        setProgram(Program.ALL);
      } else if (response?.data?.emcr && !response?.data?.bcws) {
        setProgram(Program.EMCR);
      } else if (response?.data?.bcws && !response?.data?.emcr) {
        setProgram(Program.BCWS);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const updatePersonnel = async (personnel: FormikValues | MemberProfile) => {
    try {
      const res =
        program && (await AxiosPrivate.patch(encodeURI(`/personnel`), personnel));
      if (res) {
        setPersonnel(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    personnel,
    loading,
    updatePersonnel,
    program,
  };
};

export default useMemberProfile;
