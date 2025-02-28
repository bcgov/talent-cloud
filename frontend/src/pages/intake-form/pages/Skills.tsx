import { useFormikContext } from 'formik';

import type { FormSection } from '../types';

export const Skills = ({ sections }: { sections: FormSection[] }) => {
  const { values, handleChange } = useFormikContext();
  console.log(values, handleChange, sections);
  return (
    <>
      {/* Language */}
      {/* Tools */}
      {/* Certifications */}
    </>
  );
};
