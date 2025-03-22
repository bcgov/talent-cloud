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

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();

  const [formData, setFormData] = useState<IntakeFormSubmissionData>();
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();
  const [disabledSteps, setDisabledSteps] = useState([5]);
  const [step, setStep] = useState<number>(0);
  const [errorSteps, setErrorSteps] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await AxiosPrivate.get(`/intake-form`);
        setFormData(res.data);
        setStep(res.data.personnel.step);
        setErrorSteps(res.data.personnel.errorSteps);
        setCompletedSteps(res.data.personnel.completedSteps);
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

  const handleSubmit = async (values: IntakeFormValues) => {
    values.primaryPhoneNumber = values?.primaryPhoneNumber?.replace(/[^\d]/g, '');
    values.secondaryPhoneNumber = values.secondaryPhoneNumber?.replace(/[^\d]/g, '');
    values.emergencyContactPhoneNumber =
      values?.emergencyContactPhoneNumber?.replace(/[^\d]/g, '');
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
      setDisabledSteps([0, 1, 2, 3, 4]);
      setStep(5);
      showAlert({ type: AlertType.SUCCESS, message: 'Form has been submitted!' });
    } catch (e) {
      showAlert({ type: AlertType.ERROR, message: 'Error Submitting Form' });
    }
  };
  const handleSetStep = (step: number) => {
    setStep(step);
  };
  const handleSetErrorSteps = (steps: number[]) => {
    setErrorSteps(steps);
  };
  const handleSetCompletedSteps = (steps: number[]) => {
    setCompletedSteps(steps);
  };

  return {
    saveUpdateForm,
    formData,
    setFormData,
    loading,
    handleSubmit,
    step,
    handleSetStep,
    disabledSteps,
    handleSetErrorSteps,
    handleSetCompletedSteps,
    errorSteps,
    completedSteps,
  };
};
