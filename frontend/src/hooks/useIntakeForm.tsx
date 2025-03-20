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
import type {
  IntakeFormSubmissionData,
  IntakeFormValues,
} from '@/pages/intake-form/constants/types';
import {
  expectationsBcws,
  expectationsBoth,
  expectationsEmcr,
} from '@/pages/intake-form/constants/enums';
import { AlertType } from '@/providers/Alert';
import { useAlert } from './useAlert';

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();

  const [formData, setFormData] = useState<IntakeFormSubmissionData>();
  const [loading, setLoading] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program>();
  const { functions, locations, tools, sections, certificates } =
    useProgramFieldData(Program.ALL);
  const { showAlert } = useAlert();
  const [step, setStep] = useState(0);

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
      case 'roles':
        return sections;

      case 'homeLocation':
        return locations.map((loc) => ({
          label: loc.locationName,
          value: loc.id,
        })) as unknown as { label: string; value: string }[];
      case 'toolId':
        return tools.map((tool) => ({
          label: tool.fullName,
          value: tool.id,
        })) as unknown as { label: string; value: string }[];
      case 'certificationId':
        return certificates.map((cert) => ({
          label: cert.name,
          value: cert.id,
        })) as unknown as { label: string; value: string }[];
      case 'firstChoiceFunction':
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
      case 'functions':
        return functions.map((itm) => ({
          label: itm.name,
          value: itm.id.toString(),
        })) as unknown as { label: string; value: string }[];
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
        setCurrentProgram(res.data.currentProgram);
        setStep(res.data.step);
      } catch (e) {
        showAlert({ type: AlertType.ERROR, message: 'Error Loading Form' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveUpdateForm = async (values: any) => {
    try {
      await AxiosPrivate.patch(`/intake-form/${formData?.id}`, {
        ...formData,
        step,
        personnel: values,
      });
    } catch (e) {
      showAlert({ type: AlertType.ERROR, message: 'Error Saving Form' });
    }
  };

  const handleSubmit = async (values: IntakeFormValues) => {
    values.primaryPhoneNumber = values.primaryPhoneNumber.replace(/[^\d]/g, '');
    values.secondaryPhoneNumber = values.secondaryPhoneNumber?.replace(/[^\d]/g, '');
    values.emergencyContactPhoneNumber = values.emergencyContactPhoneNumber.replace(
      /[^\d]/g,
      '',
    );
    values.secondaryPhoneNumber = values.supervisorPhoneNumber?.replace(
      /[^\d]/g,
      '',
    );
    values.workPhoneNumber = values.workPhoneNumber?.replace(/[^\d]/g, '');

    try {
      const res = await AxiosPrivate.post(`/intake-form/${formData?.id}/submit`, {
        ...formData,
        step,
        personnel: values,
      });
      setFormData(res.data);
      setStep(5);
      showAlert({ type: AlertType.SUCCESS, message: 'Form has been submitted!' });
    } catch (e) {
      showAlert({ type: AlertType.ERROR, message: 'Error Submitting Form' });
    }
  };
  const handleSetStep = (step: number) => {
    setStep(step);
  };
  return {
    saveUpdateForm,
    formData,
    setFormData,
    loading,
    handleSubmit,
    getOptions,
    currentProgram,
    step,
    handleSetStep,
  };
};
