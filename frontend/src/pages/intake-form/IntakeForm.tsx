import { Form, Formik } from 'formik';
import { ProgramSelection } from './pages/ProgramSelection';
import { PersonalInfo } from './pages/PersonalInfo';
import { ExperienceRoles } from './pages/ExperienceRoles';
import { Skills } from './pages/Skills';
import { ReviewAndSubmit } from './pages/ReviewAndSubmit';
import { Complete } from './pages/Complete';
import {
  experienceRolesSchema,
  personalInfoSchema,
  programSelectionSchema,
  skillsSchema,
} from './validation';

export const IntakeForm = () => {
  return (
    <Formik
      initialValues={{
        programSelection: {},
        personalInfo: {},
        experienceRoles: [],
        skills: {},
        reviewAndSubmit: {},
        complete: {},
      }}
      validationSchema={{
        programSelectionSchema,
        personalInfoSchema,
        experienceRolesSchema,
        skillsSchema,
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
        {/* no need to pass props - access values and validation via useFormikContext() hook */}
        <ProgramSelection />
        <PersonalInfo />
        <ExperienceRoles />
        <Skills />
        <ReviewAndSubmit />
        <Complete />
      </Form>
    </Formik>
  );
};
