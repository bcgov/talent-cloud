import { useFormikContext } from 'formik';
import type { IntakeFormInterface } from '../fields';

import type { FormSection } from '../types';

export const ProgramSelection = ({ sections }: { sections: FormSection[] }) => {
  const { values, handleChange } = useFormikContext<IntakeFormInterface>();
  console.log(values, handleChange, sections);
  return (
    <>
      {/* Program Selection Section */}

      {/* Program Details */}
    </>
  );
};
