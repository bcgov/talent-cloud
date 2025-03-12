import type { IntakeFormSubmissionData } from '@/pages/intake-form/fields';
import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';
import { useProgramFieldData } from './useProgramFieldData';
import { Program } from '@/common';
import { SectionName } from '@/common/enums/sections.enum';
import {
  Expectations,
  ExpectationsBcws,
  ExpectationsEmcr,
} from '@/pages/intake-form/tabs';

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();

  const [formData, setFormData] = useState<IntakeFormSubmissionData>();
  const [loading, setLoading] = useState(false);

  const { functions, locations, sections, tools, certificates } =
    useProgramFieldData(Program.ALL);

  const getOptions = (props: any, program?: string) => {
    switch (props.name) {
      case 'functions':
        return functions.map((itm) => ({
          label: itm.name,
          value: itm,
        }));
      case 'roles':
        return sections.map((itm) => ({
          label: itm.name,
          value: itm,
        }));
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
      case 'firstChoiceSection':
      case 'secondChoiceSection':
      case 'thirdChoiceSection':
        return Object.keys(sections).map((itm) => ({
          label: SectionName[itm as keyof typeof SectionName],
          value: itm,
        })) as unknown as { label: string; value: string }[];
      case 'firstChoiceFunction':
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
        return functions.map((itm) => ({
          label: itm.name,
          value: itm.id,
        })) as unknown as { label: string; value: string }[];
      case 'acknowledgement':
        if (program === Program.BCWS) {
          return Object.values(ExpectationsBcws).map((itm) => ({
            label: itm,
            value: itm,
          }));
        } else if (program === Program.EMCR) {
          return Object.values(ExpectationsEmcr).map((itm) => ({
            label: itm,
            value: itm,
          }));
        } else if (program === Program.ALL) {
          return Object.values(Expectations).map((itm) => ({
            label: itm,
            value: itm,
          }));
        }
        break;
      default:
        return props.options;
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
