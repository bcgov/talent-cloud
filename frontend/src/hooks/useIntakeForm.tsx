import type { IntakeFormData } from '@/pages/intake-form/fields';
import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();

  const [formData, setFormData] = useState<IntakeFormData>();
  const [loading, setLoading] = useState(false);

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
      personnel: values,
    });
    console.log(res);
  };

  const submitForm = async (values: any) => {
    const res = await AxiosPrivate.post(`/intake-form/${formData?.id}/submit`, {
      personnel: values,
    });
    console.log(res);
  };
  return {
    saveUpdateForm,
    formData,
    setFormData,
    loading,

    submitForm,
  };
};
