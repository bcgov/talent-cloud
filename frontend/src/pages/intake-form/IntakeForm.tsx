import { Form, Formik } from 'formik';
import { ProgramSelection } from './pages/ProgramSelection';
import { PersonalInfo } from './pages/PersonalInfo';
import { ExperienceRoles } from './pages/ExperienceRoles';
import { Skills } from './pages/Skills';
import { ReviewAndSubmit } from './pages/ReviewAndSubmit';
import { Complete } from './pages/Complete';
import { personalDetailsSchema, programSelectionSchema } from './validation';
import { personalDetails, programFields } from './fields';
import { useRoleContext } from '@/providers';
import { useKeycloak } from '@react-keycloak/web';

const IntakeForm = () => {
  const { program } = useRoleContext();
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;

  if (!tokenParsed) {
    return;
  }

  return (
    <div className="pt-24 px-24">
      <Formik
        initialValues={{
          programFields,
          personalDetails: {
            ...personalDetails,
            firstName: tokenParsed.given_name,
            lastName: tokenParsed.family_name,
          },
          // ...etc
        }}
        validationSchema={{
          programSelectionSchema,
          personalDetailsSchema,
        }}
        onSubmit={(values, actions) => {
          // TODO: Update
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        <Form>
          <h1>Intake Form</h1>
          {/* no need to pass props - access values and validation via useFormikContext() hook */}
          <ProgramSelection />
          <PersonalInfo />
          <ExperienceRoles />
          <Skills />
          <ReviewAndSubmit />
          <Complete />
        </Form>
      </Formik>
    </div>
  );
};

export default IntakeForm;
