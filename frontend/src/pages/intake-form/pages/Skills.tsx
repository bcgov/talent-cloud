import { useFormikContext } from 'formik';

export const Skills = () => {
  const { values, handleChange } = useFormikContext();
  console.log(values, handleChange);
  return (
    <>
      {/* Language */}
      {/* Tools */}
      {/* Certifications */}
    </>
  );
};
