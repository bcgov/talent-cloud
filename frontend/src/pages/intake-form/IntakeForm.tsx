import type { FormikErrors, FormikValues } from 'formik';
import { Form } from 'formik';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';

import { FormButtonNavigation } from './components/FormButtonNavigation';
import { type FormTab, type IntakeFormValues } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { FormStepper } from './components/FormStepper';
import { handleFilterProgram } from './utils/helpers';

const IntakeForm = ({
  validateForm,
  values,
  step,
  handleSetStep,
  saveUpdateForm,
  disabledSteps,
  tabs,
}: {
  validateForm: () => any;
  values: any;

  handleSetStep: (step: number) => void;

  step: number;

  saveUpdateForm: (values: FormikValues) => void;

  disabledSteps: number[];
  tabs: FormTab[];
}) => {
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

  return (
    <Form>
      <div className="h-full flex flex-col justify-between">
        <TabGroup
          vertical
          manual
          selectedIndex={step}
          className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
          onChange={(index) => {
            handleValidateStep(validateForm, index);
            saveUpdateForm(values);
          }}
        >
          <TabList className="flex flex-col">
            {tabs.map((tab: FormTab, index: number) => (
              <FormStepper
                key={tab.value}
                tab={tab}
                index={index}
                formTabs={formTabs}
                stepErrors={stepErrors}
                completedSteps={completedSteps}
                disabled={disabledSteps.includes(index)}
                step={step}
              />
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab: FormTab) => (
              <TabPanel key={tab.value}>
                {() => (
                  <div className="min-h-[calc(100vh-300px)] flex flex-col xl:pr-24 w-[900px]">
                    <h3>{tab.title ?? tab.label}</h3>
                    {tab.description && (
                      <div className="text-sm py-6">{tab.description}</div>
                    )}

                    <div className="flex flex-col space-y-8  w-full">
                      {tab.component({
                        sections: tab.sections
                          ?.filter((itm) =>
                            itm.program && values.program
                              ? handleFilterProgram(itm, values.program)
                              : itm,
                          )
                          .map((itm) => ({
                            ...itm,
                            fields: itm.fields?.filter((itm) =>
                              itm.program && values.program
                                ? handleFilterProgram(itm, values.program)
                                : itm,
                            ),
                          })),
                      })}
                    </div>
                  </div>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>

        <FormButtonNavigation
          step={step}
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
          handleSetCompletedStep={handleSetCompletedStep}
        />
      </div>
    </Form>
  );
};

export default IntakeForm;
