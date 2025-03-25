import type { FormikErrors } from 'formik';
import { Form } from 'formik';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { FormButtonNavigation } from './components/FormButtonNavigation';
import { type FormTab, type IntakeFormValues } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { FormStepper } from './components/FormStepper';
import { handleFilterProgram } from './utils/helpers';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';


const IntakeForm = ({
  values,
  validateForm,
  step,
  handleSetStep,
  completedSteps,
  errorSteps,
  handleSetCompletedSteps,
  handleSetErrorSteps,
  saveUpdateForm,
  disabledSteps,
  tabs,
}: {
  handleSetErrorSteps: (steps: number[]) => void;
  handleSetCompletedSteps: (steps: number[]) => void;
  errorSteps: number[];
  completedSteps: number[];

  handleSetStep: (step: number) => void;

  step: number;

  saveUpdateForm: (values: IntakeFormValues) => Promise<void>;
  values: IntakeFormValues;
  validateForm: () => Promise<FormikErrors<IntakeFormValues>>;
  disabledSteps: number[];
  tabs: FormTab[];
}) => {
  const handleSetCompletedStep = (step: number) => {
    if (completedSteps && completedSteps.length > 0) {
      if (!completedSteps.includes(step)) {
        handleSetCompletedSteps([...completedSteps, step]);
      }
    } else {
      handleSetCompletedSteps([step]);
    }
  };

  const handleRemoveCompletedStep = (step: number) => {
    if (completedSteps && completedSteps.length > 0) {
      if (completedSteps.includes(step)) {
        handleSetCompletedSteps(
          completedSteps.filter((completedStep) => completedStep !== step),
        );
      }
    } else {
      handleSetCompletedSteps([]);
    }
  };

  const handleSetErrors = (errorStep: number) => {
    if (errorSteps && errorSteps.length > 0) {
      if (!errorSteps.includes(errorStep)) {
        handleSetErrorSteps([...errorSteps, errorStep]);
      }
    } else {
      handleSetErrorSteps([errorStep]);
    }
  };

  const handleRemoveStepError = (errorStep: number) => {
    if (errorSteps && errorSteps.length > 0 && errorSteps.includes(errorStep)) {
      handleSetErrorSteps(errorSteps.filter((step) => step !== errorStep));
    }
  };
  
  const bannerContent =
    'Based on your IDIR credentials, it looks like you are already a registered member of one of the two CORE Team programs. We have automatically set your selection to the program that you are applying for as a new member.';

  // call validate form (runs for the current step only)
  // if there are errors, include the current step in the errorSteps array to show red on the stepper
  // if there are no errors on  the current step, remove this from the errorSteps array
  const handleValidateStep = async (index: number) => {
    const formErrors = await validateForm();

    if (Object.values(formErrors).length === 0) {
      handleRemoveStepError(step);
      handleSetCompletedStep(step);
      await saveUpdateForm(values);
      values.program && handleSetStep(index);
    } else {
      handleSetErrors(step);
      handleRemoveCompletedStep(step);
      await saveUpdateForm(values);
      values.program && handleSetStep(index);
    }
  };
  
  return (
    <Form>
      <div className="h-full flex flex-col justify-between">
        <TabGroup
          vertical
          // manual
          selectedIndex={step}
          className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
          onChange={(index) => {
            handleValidateStep(index);
            saveUpdateForm({ ...values, step, errorSteps, completedSteps });
          }}
        >
          <TabList className="flex flex-col">
            {tabs.map((tab: FormTab, index: number) => (
              <FormStepper
                key={tab.value}
                tab={tab}
                index={index}
                formTabs={formTabs}
                errorSteps={errorSteps}
                completedSteps={completedSteps}
                disabled={disabledSteps.includes(index)}
                step={step}
              />
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab: FormTab, index: number) => (
              <TabPanel key={tab.value}>
                {() => (
                  <div className="min-h-[calc(100vh-300px)] flex flex-col max-w-4xl">
                    {index===0 && values.disabledProgram !== undefined && (
                      <div className="pb-16">
                      <Banner content={bannerContent} type={BannerType.INFO} />
                      </div>
                    )}
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
                            segments: itm.segments
                              ?.filter((itm: any) =>
                                itm.program && values.program
                                  ? handleFilterProgram(itm, values.program)
                                  : itm,
                              )
                              .map((itm: any) => ({
                                ...itm,
                                fields: itm.fields?.filter((field: any) =>
                                  field.program && values.program
                                    ? handleFilterProgram(field, values.program)
                                    : field,
                                ),
                              })),
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
            handleValidateStep(step - (1 % Object.keys(formTabs).length))
          }
          handleNext={() =>
            handleValidateStep(step + (1 % Object.keys(formTabs).length))
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
