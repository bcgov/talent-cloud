import { Formik } from 'formik';
import { useKeycloak } from '@react-keycloak/web';
import { stepValidation } from './constants/validation';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { type IntakeFormValues } from './constants/types';
import { Program } from '@/common';
import { Navigate } from 'react-router';
import { Routes } from '@/routes';
import IntakeForm from './IntakeForm';
import { Loading } from '@/components';
import { intakeFormInitialValues } from './constants/initial-values';
import { useStepContext } from '@/providers/StepperContext';
import { StepProvider } from '../../providers/StepperContext';

const Form = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;
  const { formData, tabs, handleSubmit, saveUpdateForm } = useIntakeForm();

  const {
    step,
    handleSetStep,
    disabledSteps,
    errorSteps,
    completedSteps,
    handleRemoveStepError,
    handleSetErrors,
    handleSetCompletedStep,
  } = useStepContext();

  const initialValues: IntakeFormValues = {
    ...intakeFormInitialValues,
    ...formData?.personnel,
    firstName: tokenParsed?.given_name,
    lastName: tokenParsed?.family_name
      ? tokenParsed?.family_name
      : tokenParsed?.given_name,
    email: tokenParsed?.email,
    program: formData?.personnel?.program,
  };

  if (!tokenParsed) {
    return;
  }
  
  if (formData?.currentProgram === Program.ALL) {
    return <Navigate to={Routes.MemberProfile} />;
  } else {
    return (
      <>
        {!formData?.personnel ? (
          <Loading />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={stepValidation[step]}
            onSubmit={handleSubmit}
            validateOnBlur={true}
          >
            {({ values }) => (
              <IntakeForm
                step={step}
                saveUpdateForm={saveUpdateForm}
                tabs={tabs(values)}
                handleSetStep={handleSetStep}
                disabledSteps={disabledSteps}
                errorSteps={errorSteps}
                completedSteps={completedSteps}
                handleRemoveStepError={handleRemoveStepError}
                handleSetErrors={handleSetErrors}
                handleSetCompletedStep={handleSetCompletedStep}
              />
            )}
          </Formik>
        )}
      </>
    );
  }
};

const FormWrapper = () => {
  return (
    <StepProvider>
      <Form />
    </StepProvider>
  );
};

export default FormWrapper;
