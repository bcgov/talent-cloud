// hooks
import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';
import { useProgramFieldData } from './useProgramFieldData';
// enums & types
import { DriverLicense, DriverLicenseName, Program } from '@/common';
import {
  LanguageProficiency,
  LanguageProficiencyName,
} from '@/common/enums/language.enum';
import { ToolsProficiency, ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { IntakeFormSubmissionData } from '@/pages/intake-form/constants/types';
import {
  expectationsBcws,
  expectationsBoth,
  expectationsEmcr,
} from '@/pages/intake-form/constants/enums';

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();

  const [formData, setFormData] = useState<IntakeFormSubmissionData>();
  const [loading, setLoading] = useState(false);

  const { functions, locations, tools, certificates } = useProgramFieldData(
    Program.ALL,
  );

  const getOptions = (name: string, program?: string) => {
    switch (name) {
      case 'driversLicense':
        return Object.values(DriverLicense).map((itm) => ({
          label: DriverLicenseName[itm],
          value: itm,
        }));
      case 'toolProficiency':
        return Object.values(ToolsProficiency).map((itm) => ({
          label: ToolsProficiencyName[itm].toString(),
          value: itm.toString(),
        }));
      case 'languageProficiency':
        return Object.values(LanguageProficiency).map((itm) => ({
          label: LanguageProficiencyName[itm].toString(),
          value: itm.toString(),
        }));
      case 'program':
        return Object.values(Program).map((itm) => ({
          label: itm,
          value: itm,
        }));
      // case 'roles':
      //   return sections.map((itm) => ({
      //     label: itm.name,
      //     value: itm.id,
      //   }));
      case 'homeLocation':
        return locations.map((loc) => ({
          label: loc.locationName,
          value: loc.id,
        })) as unknown as { label: string; value: string }[];
      case 'tool':
        return tools.map((tool) => ({
          label: tool.fullName,
          value: tool.id,
        })) as unknown as { label: string; value: string }[];
      case 'certificate':
        return certificates.map((cert) => ({
          label: cert.name,
          value: cert.id,
        })) as unknown as { label: string; value: string }[];
      // case 'firstChoiceSection':
      // case 'secondChoiceSection':
      // case 'thirdChoiceSection':
      //   return Object.keys(sections).map((itm) => ({
      //     label: SectionName[itm as keyof typeof SectionName],
      //     value: itm,
      //   })) as unknown as { label: string; value: string }[];
      case 'firstChoiceFunction':
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
      case 'functions':
        return functions.map((itm) => ({
          label: itm.name,
          value: itm.id.toString(),
        })) as unknown as { label: string; value: string }[];

      //TODO - you can just hardcode these values here instead of using the enums
      case 'acknowledgement':
        if (program === Program.BCWS) {
          return expectationsBcws;
        } else if (program === Program.EMCR) {
          return expectationsEmcr;
        } else return expectationsBoth;

      default:
        return [];
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await AxiosPrivate.get(`/intake-form`);
        setFormData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveUpdateForm = async (values: any) => {
    const res = await AxiosPrivate.patch(`/intake-form/${formData?.id}`, {
      ...formData,
      personnel: values,
    });
    //TODO
    console.log(res);
  };

  const submitForm = async (values: any) => {
    const res = await AxiosPrivate.post(`/intake-form/${formData?.id}/submit`, {
      ...formData,
      personnel: values,
    });
    //TODO
    console.log(res);
  };

  return {
    saveUpdateForm,
    formData,
    setFormData,
    loading,
    submitForm,
    getOptions,
  };
};
