import { Form, useFormikContext } from 'formik';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { FormButtonNavigation } from './components/FormButtonNavigation';
import { type FormTab, type IntakeFormValues } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { FormStepper } from './components/FormStepper';
import { handleFilterProgram } from './utils/helpers';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { useEffect } from 'react';

const IntakeForm = ({
  saveUpdateForm,
  tabs,
  step,
  handleSetStep,
  disabledSteps,
  errorSteps,
  completedSteps,
  handleRemoveStepError,
  handleSetErrors,
  handleSetCompletedStep,
}: {
  saveUpdateForm: (values: IntakeFormValues) => Promise<void>;
  tabs: FormTab[];
  step: number;
  disabledSteps: number[];
  errorSteps?: number[];
  completedSteps?: number[];
  handleSetStep: (step: number) => void;
  handleRemoveStepError: (step: number) => void;
  handleSetErrors: (step: number) => void;
  handleSetCompletedStep: (step: number) => void;
}) => {
  const { values, validateForm } = useFormikContext<IntakeFormValues>();

  // call validate form (runs for the current step only)
  // if there are errors, include the current step in the errorSteps array to show red on the stepper
  // if there are no errors on  the current step, remove this from the errorSteps array
  const handleValidateStep = async (step: number, index: number) => {
    const formErrors = await validateForm();
    
    if (!formErrors || Object.values(formErrors).length === 0) {
      handleRemoveStepError(4);
      handleRemoveStepError(step);
      handleSetCompletedStep(step);
      values.program && values.acknowledgement && handleSetStep(index);
      await saveUpdateForm(values);
    } else {
      handleSetErrors(step);

      values.program && values.acknowledgement && handleSetStep(index);
      await saveUpdateForm(values);
    }

    const element = document.getElementById('top');
    element && element.scrollIntoView({ inline: 'start' });
  };

  useEffect(() => {
    (async () => {
      if (errorSteps?.includes(step)) {
        const errors = await validateForm();

        if (!errors) {
          handleRemoveStepError(step);
        }
      }
    })();
  }, [step]);

  return (
    <Form>
      <div id="top" className="h-full flex flex-col justify-between">
        <TabGroup
          vertical
          // manual
          selectedIndex={step}
          className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
          onChange={(index) => handleValidateStep(step, index)}
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
                values={values}
              />
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab: FormTab, index: number) => (
              <TabPanel key={tab.value}>
                {() => (
                  <div className="min-h-[calc(100vh-300px)] flex flex-col max-w-4xl">
                    {index === 0 && values.disabledProgram && (
                      <div className="pb-16">
                        <Banner
                          content={
                            'Based on your IDIR credentials, it looks like you are already a registered member of one of the two CORE Team programs. We have automatically set your selection to the program that you are applying for as a new member.'
                          }
                          type={BannerType.INFO}
                        />
                      </div>
                    )}
                    <h3>{tab.title ?? tab.label}</h3>
                    {tab.description && (
                      <div className="text-sm py-6">{tab.description}</div>
                    )}

                    <div className="flex flex-col   w-full">
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
            handleValidateStep(step, step - (1 % Object.keys(formTabs).length))
          }
          handleNext={() =>
            handleValidateStep(step, step + (1 % Object.keys(formTabs).length))
          }
          disableNext={step === formTabs.length - 2}
          disablePrevious={step === 0}
        />
      </div>
    </Form>
  );
};

export default IntakeForm;
