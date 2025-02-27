import { useFormikContext } from 'formik';

export const ExperienceRoles = () => {
  const { values, handleChange } = useFormikContext();
  console.log(values, handleChange);
  return (
    <>
      {/* Emergency Experience Section */}

      {/* EMCR Core Team Sections  Section */}

      {/* BCWS Section(s) and Role(s)  Section */}
    </>
  );
};
