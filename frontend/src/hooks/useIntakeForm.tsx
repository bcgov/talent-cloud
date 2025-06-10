// hooks
import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';
// enums & types
import type {
  IntakeFormSubmissionData,
  IntakeFormValues,
} from '@/pages/intake-form/constants/types';
import { AlertType } from '@/providers/Alert';
import { useAlert } from './useAlert';
import { Program } from '@/common';
import { BcwsRoleName, Section, SectionName } from '@/common/enums/sections.enum';
import { useProgramFieldData } from './useProgramFieldData';
import { formTabs } from '@/pages/intake-form/utils/tab-fields';
import { useStepContext } from '@/providers/StepperContext';

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();

  const [formData, setFormData] = useState<IntakeFormSubmissionData>();
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();

  const {
    step,
    handleSetStep,
    errorSteps,
    completedSteps,
    handleSetErrors,
    handleSetCompletedSteps,
    handleSetDisabledSteps,
  } = useStepContext();

  useEffect(() => {
    (async () => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        const res = await AxiosPrivate.get(`/intake-form`);
        setFormData({
          ...res.data,
          disabledProgram: res.data.currentProgram ? true : false,
        });
        if (!res.data.personnel) {
          if (!res.data.currentProgram) {
            throw new Error();
          } else {
            return;
          }
        }
        handleSetStep(res.data.personnel.step);
        handleSetErrors(res.data.personnel.errorSteps);
        handleSetCompletedSteps(res.data.personnel.completedSteps);
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
        personnel: { ...values, step, errorSteps, completedSteps },
      });
    } catch (e) {
      showAlert({ type: AlertType.ERROR, message: 'Error Saving Form' });
    }
  };

  const { handleRemoveStepError, handleSetCompletedStep } = useStepContext();

  const handleSubmit = async (values: IntakeFormValues, actions: any) => {
    const errors = await actions.validateForm();
    if (errors && Object.keys(errors).length > 0) {
      handleSetErrors(4);
      return showAlert({
        type: AlertType.ERROR,
        message: 'Please resolve validation errors.',
      });
    } else {
      handleRemoveStepError(4);
      handleSetCompletedStep(4);
    }

    values.primaryPhoneNumber = values?.primaryPhoneNumber?.replace(/[^\d]/g, '');
    values.secondaryPhoneNumber = values.secondaryPhoneNumber?.replace(/[^\d]/g, '');
    values.emergencyContactPhoneNumber =
      values?.emergencyContactPhoneNumber?.replace(/[^\d]/g, '');
    values.supervisorPhoneNumber = values.supervisorPhoneNumber?.replace(
      /[^\d]/g,
      '',
    );
    values.liaisonPhoneNumber = values.liaisonPhoneNumber?.replace(/[^\d]/g, '');
    values.workPhoneNumber = values.workPhoneNumber?.replace(/[^\d]/g, '');

    values.languages = values.languages?.filter((itm) => itm.language !== '');

    values.certifications = values.certifications?.filter(
      (itm) => itm.certification !== '',
    );

    values.tools = values.tools?.filter((itm) => itm.tool !== '');

    if (values.languages?.length === 0) {
      delete values.languages;
    }
    if (values.certifications?.length === 0) {
      delete values.certifications;
    }
    if (values.tools?.length == 0) {
      delete values.tools;
    }

    if (values.program === Program.BCWS) {
      delete values.functions;
      delete values.firstChoiceFunction;
      delete values.secondChoiceFunction;
      delete values.thirdChoiceFunction;
      delete values.emergencyExperience;
      delete values.firstNationsExperience;
      delete values.preocExperience;
      delete values.peccExperience;
    }
    if (values.program === Program.EMCR) {
      Object.keys(Section).forEach(
        (itm) => delete values[itm as keyof typeof values],
      );

      delete values.firstChoiceSection;
      delete values.secondChoiceSection;
      delete values.thirdChoiceSection;
      delete values.liaisonEmail;
      delete values.liaisonFirstName;
      delete values.liaisonPhoneNumber;
      delete values.liaisonUnknown;
      delete values.purchaseCardHolder;
    }

    try {
      const res = await AxiosPrivate.post(`/intake-form/${formData?.id}/submit`, {
        ...formData,
        step,
        personnel: values,
      });
      setFormData(res.data);
      handleSetDisabledSteps([0, 1, 2, 3, 4]);
      handleSetStep(5);
      showAlert({ type: AlertType.SUCCESS, message: 'Form has been submitted!' });
    } catch (e) {
      showAlert({ type: AlertType.ERROR, message: 'Error Submitting Form' });
    }
  };

  const { functions, locations, tools, sections, certificates, bcwsRoles } =
    useProgramFieldData(Program.ALL);

  const getFieldOptions = (name: string, values: IntakeFormValues) => {
    switch (name) {
      case 'homeLocation':
        return locations.map((loc: any) => ({
          label: loc.locationName,
          value: { id: loc.id, name: loc.locationName },
        }));
      case 'tool':
        return tools.map((tool: any) => ({
          label: tool.fullName,
          value: { id: tool.id, name: tool.fullName },
        }));
      case 'certification':
        return certificates.map((cert: any) => ({
          label: cert.name,
          value: { id: cert.id, name: cert.name },
        }));
      case 'firstChoiceSection':
        return Object.keys(sections).map((itm: any) => ({
          label: SectionName[itm as keyof typeof SectionName],
          value: { id: itm, name: SectionName[itm as keyof typeof SectionName] },
          disabled: [
            values.firstChoiceSection?.id,
            values.secondChoiceSection?.id,
            values.thirdChoiceSection?.id,
          ].includes(itm),
        }));
      case 'secondChoiceSection':
      case 'thirdChoiceSection':
        return [
          { label: 'None', value: { id: 'None', name: 'None' }, disabled: false },
          ...Object.keys(sections).map((itm: any) => ({
            label: SectionName[itm as keyof typeof SectionName],
            value: { id: itm, name: SectionName[itm as keyof typeof SectionName] },
            disabled: [
              values.firstChoiceSection?.id,
              values.secondChoiceSection?.id,
              values.thirdChoiceSection?.id,
            ].includes(itm),
          })),
        ];
      case 'firstChoiceFunction':
        return functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
          disabled: [
            values.firstChoiceFunction,
            values.secondChoiceFunction,
            values.thirdChoiceFunction,
          ].includes(itm),
        })) as unknown as { label: string; value: any }[];
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
        return [
          { label: 'None', disabled: false, value: { name: 'None', id: 'None' } },
          ...(functions.map((itm: any) => ({
            label: itm.name,
            value: itm,
            disabled: [
              values.firstChoiceFunction?.id,
              values.secondChoiceFunction?.id,
              values.thirdChoiceFunction?.id,
            ].includes(itm),
          })) as unknown as { label: string; value: any }[]),
        ];
      case Section.PLANNING:
        return bcwsRoles
          .filter((itm) => itm.section === Section.PLANNING)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.AVIATION:
        return bcwsRoles
          .filter((itm) => itm.section === Section.AVIATION)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.COMMAND:
        return bcwsRoles
          .filter((itm) => itm.section === Section.COMMAND)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.OPERATIONS:
        return bcwsRoles
          .filter((itm) => itm.section === Section.OPERATIONS)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.FINANCE_ADMIN:
        return bcwsRoles
          .filter((itm) => itm.section === Section.FINANCE_ADMIN)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.LOGISTICS:
        return bcwsRoles
          .filter((itm) => itm.section === Section.LOGISTICS)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));

      case 'functions':
        return functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
        }));

      default:
        return [];
    }
  };

  return {
    saveUpdateForm,
    formData,
    setFormData,
    loading,
    handleSubmit,
    getFieldOptions,
    tabs: (values: IntakeFormValues) =>
      formTabs.map((tab) => ({
        ...tab,
        sections: tab.sections?.map((section) => ({
          ...section,
          fields: section.fields?.map((field) => ({
            ...field,
            nestedFields: field.nestedFields?.map((nestedField) => ({
              ...nestedField,
              options:
                nestedField.options?.length === 0
                  ? getFieldOptions(nestedField.name, values)
                  : nestedField.options,
            })),
            options:
              field.options?.length === 0
                ? getFieldOptions(field.name, values)
                : field.options,
          })),
        })),
      })),
  };
};
