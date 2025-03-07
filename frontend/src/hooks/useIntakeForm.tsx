import type { IntakeFormData } from '@/pages/intake-form/fields';
import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';
import { Program } from '@/common';
import { FormTab, formTabs } from '@/pages/intake-form/tabs';

export const useIntakeForm = () => {
  const { AxiosPrivate } = useAxios();
  const [program, setProgram] = useState<Program>();
  const [formData, setFormData] = useState<IntakeFormData>();
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<FormTab[]>(formTabs);


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

  // useEffect(() => {
  //   // tabs.forEach((itm: any) => {
  //   //   const sectionFields  = itm.section?.fields?.filter((item: any) => item.program ? item.program === program || item.program === Program.ALL : true)
  //   //   const section = itm.section?.filter((item: any) => item.program ? item.program === program || item.program === Program.ALL : true)
  //   //   const fields = itm.fields?.filter((item: any) => item.program ? item.program === program || item.program === Program.ALL : true)
  //   //   itm.section.fields = sectionFields
  //   //   itm.section = section
  //   //   itm.fields = fields
  //   //   })

  // },  [program])

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
tabs    
  };
};
