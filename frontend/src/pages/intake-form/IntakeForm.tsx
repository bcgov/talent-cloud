import type { FormikErrors } from 'formik';
import { Form, Formik } from 'formik';
import { intakeFormInitialValues } from './constants/initial-values';
import { useKeycloak } from '@react-keycloak/web';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import { stepValidation } from './constants/validation';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { FormButtonNavigation } from './components/FormButtonNavigation';
import { FormStatus, type FormTab, type IntakeFormValues } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { FormStepper } from './components/FormStepper';
import { Program } from '@/common';
import { Navigate } from 'react-router';
import { Routes } from '@/routes';

const IntakeForm = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;

  const { formData, saveUpdateForm, loading, step, handleSetStep, handleSubmit } =
    useIntakeForm();
  const [stepErrors, setStepErrors] = useState<number[] | null>();
  const [completedSteps, setCompletedSteps] = useState<number[] | null>();

  const handleSetCompletedStep = (step: number) => {
    if (completedSteps && completedSteps.length > 0) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
    } else {
      setCompletedSteps([step]);
    }
  };

  const handleRemoveCompletedStep = (step: number) => {
    if (completedSteps && completedSteps.length > 0) {
      if (completedSteps.includes(step)) {
        setCompletedSteps(
          completedSteps.filter((completedStep) => completedStep !== step),
        );
      }
    } else {
      setCompletedSteps([]);
    }
  };

  const handleSetErrors = (errorStep: number) => {
    if (stepErrors && stepErrors.length > 0) {
      if (!stepErrors.includes(errorStep)) {
        setStepErrors([...stepErrors, errorStep]);
      }
    } else {
      setStepErrors([errorStep]);
    }
  };

  const handleRemoveStepError = (errorStep: number) => {
    if (stepErrors && stepErrors.length > 0 && stepErrors.includes(errorStep)) {
      setStepErrors(stepErrors.filter((step) => step !== errorStep));
    }
  };

  // call validate form (runs for the current step only)
  // if there are errors, include the current step in the errorSteps array to show red on the stepper
  // if there are no errors on  the current step, remove this from the errorSteps array
  const handleValidateStep = async (
    validateForm: () => Promise<FormikErrors<IntakeFormValues>>,
    index: number,
  ) => {
    const formErrors = await validateForm();
    if (!formErrors || Object.values(formErrors).length === 0) {
      handleRemoveStepError(step);
      handleSetCompletedStep(step);
      return handleSetStep(index);
    } else {
      handleSetErrors(step);
      handleRemoveCompletedStep(step);
      return handleSetStep(index);
    }
  };

  if (!tokenParsed) {
    return;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (formData?.currentProgram === Program.ALL) {
    return <Navigate to={Routes.MemberProfile} />;
  } else {
    return (
      <Formik
        initialValues={{
          ...intakeFormInitialValues,
          ...formData?.personnel,
          firstName: tokenParsed.given_name,
          lastName: tokenParsed.family_name
            ? tokenParsed.family_name
            : tokenParsed.given_name,
          email: tokenParsed.email,
          idir_user_guid: tokenParsed.idir_user_guid,
          program: formData?.program ?? formData?.personnel?.program,
        }}
        validationSchema={stepValidation[step]}
        onSubmit={async (values) => await handleSubmit(values)}
      >
        {({ validateForm }) => (
          <Form>
            <div className="h-full flex flex-col justify-between">
              <TabGroup
                vertical
                manual
                selectedIndex={step}
                className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
                onChange={(index) => handleValidateStep(validateForm, index)}
              >
                <TabList className="flex flex-col">
                  {formTabs.map((tab: FormTab, index: number) => (
                    <FormStepper
                      key={tab.value}
                      tab={tab}
                      index={index}
                      formTabs={formTabs}
                      stepErrors={stepErrors}
                      completedSteps={completedSteps}
                      disabled={formData?.status === FormStatus.SUBMITTED}
                      step={step}
                    />
                  ))}
                </TabList>
                <TabPanels>
                  {formTabs.map((tab: FormTab) => (
                    <TabPanel key={tab.value}>
                      {() => (
                        <div className="min-h-[calc(100vh-300px)] flex flex-col xl:pr-24 w-[900px]">
                          <h3>{tab.title ?? tab.label}</h3>
                          {tab.description && (
                            <div className="text-sm py-6">{tab.description}</div>
                          )}

                          <div className="flex flex-col space-y-8  w-full">
                            {tab.component({ sections: tab.sections })}
                          </div>
                        </div>
                      )}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>

              <FormButtonNavigation
                saveUpdateForm={saveUpdateForm}
                handlePrevious={() =>
                  handleValidateStep(
                    validateForm,
                    step - (1 % Object.keys(formTabs).length),
                  )
                }
                handleNext={() =>
                  handleValidateStep(
                    validateForm,
                    step + (1 % Object.keys(formTabs).length),
                  )
                }
                disableNext={step === formTabs.length - 2}
                disablePrevious={step === 0}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
};

export default IntakeForm;
