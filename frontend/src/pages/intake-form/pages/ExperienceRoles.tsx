import { useFormikContext } from 'formik';

import type { FormSection } from '../types';

export const ExperienceRoles = ({ sections }: { sections: FormSection[] }) => {
  const { values, handleChange } = useFormikContext();
  console.log(values, handleChange, sections);
  return (
    <>
      {/* Emergency Experience Section */}

      {/* EMCR Core Team Sections  Section */}

      {/* BCWS Section(s) and Role(s)  Section */}
    </>
  );
};
