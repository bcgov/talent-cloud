import { useEffect, useState } from 'react';
import type { Member, Recommitment } from '@/common';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { Program } from '@/common';

const useMemberProfile = (): {
  openRecommitmentForm: boolean;
  handleOpenRecommitmentForm: () => void;
  member?: Member;
  updateMember: (person: FormikValues | Member) => Promise<void>;
  loading: boolean;
  program?: Program;
  recommitmentProgram?: Program;
} => {
  const [member, setMember] = useState<Member>();
  const { AxiosPrivate } = useAxios();
  const [refetch, setRefetch] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [program, setProgram] = useState<Program>();
  const [recommitmentProgram, setRecommitmentProgram] = useState<Program>();
  const [openRecommitmentForm, setOpenRecommitmentForm] = useState(false);

  const getProfileDetails = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosPrivate.get(`/personnel`);
      response && setMember({ ...response.data });
      // set program of personnel for personal data
      if (response?.data?.bcws && response?.data?.emcr) {
        setProgram(Program.ALL);
      } else if (response?.data?.emcr && !response?.data?.bcws) {
        setProgram(Program.EMCR);
      } else if (response?.data?.bcws && !response?.data?.emcr) {
        setProgram(Program.BCWS);
      }
      const bcwsRecommitment = response?.data?.recommitment?.find(
        (itm: Recommitment) => itm.program === Program.BCWS,
      );
      const emcrRecommitment = response?.data?.recommitment?.find(
        (itm: Recommitment) => itm.program === Program.EMCR,
      );
      // set program of recommitment for recommitment data
      if (bcwsRecommitment && emcrRecommitment) {
        setRecommitmentProgram(Program.ALL);
      } else if (emcrRecommitment && !response?.data?.recommitment.bcws) {
        setRecommitmentProgram(Program.EMCR);
      } else if (bcwsRecommitment && !emcrRecommitment) {
        setRecommitmentProgram(Program.BCWS);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, [refetch]);

  const updateMember = async (member: FormikValues, endpoint?: string) => {
    try {
      await AxiosPrivate.patch(encodeURI(`/personnel/${endpoint ?? ''}`), member);

      setRefetch(!refetch);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenRecommitmentForm = () => {
    setOpenRecommitmentForm(!openRecommitmentForm);
    if (openRecommitmentForm) setRefetch(!refetch);
  };
  return {
    openRecommitmentForm,
    handleOpenRecommitmentForm,
    member,
    loading,
    updateMember,
    program,
    recommitmentProgram,
  };
};

export default useMemberProfile;
