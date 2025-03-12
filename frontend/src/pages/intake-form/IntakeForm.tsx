import { Form, Formik } from 'formik';
import { intakeFormInitialValues } from './fields';
import { useKeycloak } from '@react-keycloak/web';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Program } from '@/common';
import { useState } from 'react';
import type { FormTab } from './tabs';
import { formTabs } from './tabs';
import { intakeFormValidationSchema } from './validation';
import { Navigate } from 'react-router-dom';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { FormPage } from '@/pages/intake-form/FormPage';
import { Routes } from '@/routes';
import { FormButtonNavigation } from './FormButtonNavigation';
import { FormStepper } from './FormStepper';

const IntakeForm = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { formData, saveUpdateForm, loading, getOptions } = useIntakeForm();

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
        initialValues={{ ...intakeFormInitialValues, ...formData?.formData }}
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
                    <FormPage getOptions={getOptions} tab={tab} />
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
  }
};

export default IntakeForm;
