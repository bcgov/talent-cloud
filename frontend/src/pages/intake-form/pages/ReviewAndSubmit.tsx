import { useFormikContext } from 'formik';

import type { FormSection } from '../types';

export const ReviewAndSubmit = ({ sections }: { sections: FormSection[] }) => {
  const { values, handleChange } = useFormikContext();
  console.log(values, handleChange, sections);
  return <></>;
};
