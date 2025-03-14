import { Form, Formik } from 'formik';
import { intakeFormInitialValues } from './constants/initial-values';
import { useKeycloak } from '@react-keycloak/web';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import { intakeFormValidationSchema } from './constants/validation';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { FormButtonNavigation } from './components/FormButtonNavigation';
import type { FormTab } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { FormStepper } from './components/FormStepper';
import { Program } from '@/common';
import { Navigate } from 'react-router';
import { Routes } from '@/routes';

const IntakeForm = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { formData, saveUpdateForm, loading } = useIntakeForm();
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
        initialValues={{ ...intakeFormInitialValues, ...formData?.personnel }}
        validationSchema={intakeFormValidationSchema}
        onSubmit={(values, actions) => {
          // TODO: Update
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        <Form>
          <div className="h-full flex flex-col justify-between">
            <TabGroup
              vertical
              manual
              selectedIndex={selectedTab}
              className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
            >
              <TabList className="flex flex-col">
                {formTabs.map((tab: FormTab, index: number) => (
                  <FormStepper
                    key={tab.value}
                    tab={tab}
                    handleClickTab={setSelectedTab}
                    index={index}
                    formTabs={formTabs}
                  />
                ))}
              </TabList>
              <TabPanels>
                {formTabs.map((tab: FormTab) => (
                  <TabPanel key={tab.value}>
                    {() => (
                      <div className="min-h-[calc(100vh-300px)] flex flex-col xl:pr-24 w-[900px]">
                        <h3>{tab.title ?? tab.label}</h3>

                        <div className="text-sm py-6">{tab.description}</div>

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
              setSelectedTab(selectedTab - (1 % Object.keys(formTabs).length))
            }
            handleNext={() =>
              setSelectedTab(selectedTab + (1 % Object.keys(formTabs).length))
            }
            disableNext={selectedTab === formTabs.length - 1}
            disablePrevious={selectedTab === 0}
          />
        </div>
      </Form>
    </Formik>
  );
};
};

export default IntakeForm;
