import { useFormikContext } from 'formik';
import type { IntakeFormInterface } from '../fields';

export const ProgramSelection = () => {
  const { values, handleChange } = useFormikContext<IntakeFormInterface>();
  console.log(values, handleChange);
  return (
    <>
      {/* Program Selection Section */}

      {/* Program Details */}
    </>
  );
};
