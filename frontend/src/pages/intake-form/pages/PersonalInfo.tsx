import { Field, useFormikContext } from 'formik';
import type { IntakeFormInterface } from '../fields';

export const PersonalInfo = () => {
  const { values, handleChange } = useFormikContext<IntakeFormInterface>();
  console.log(values, handleChange);
  return (
    <>
      {/* Personal Details Section */}
      <div className="flex flex-col space-y-8">
        {/* Program Selection Section */}
        <label>First Name:</label>
        <Field
          name={'firstName'}
          value={values.personalDetails.firstName}
          type="text"
          onChange={handleChange}
        />
        {/* Program Details */}
      </div>
      {/* Employment Details Section */}
      {/* Supervisor Liason Section */}
      {/* Emergency Contact Details */}
    </>
  );
};
