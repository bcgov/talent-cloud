import { Form, Formik } from 'formik';
import { intakeFormInitialValues } from './fields';
import { useKeycloak } from '@react-keycloak/web';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ButtonTypes, Program } from '@/common';
import { Button } from '@/components/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { formTabs, programTab } from './tabs';
import { intakeFormValidationSchema } from './validation';
import { Navigate } from 'react-router-dom';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { FormPage } from '@/pages/intake-form/FormPage';
import { Routes } from '@/routes';

const IntakeForm = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;
  const [selectedTab, setSelectedTab] = useState(0);
  const { formData, saveUpdateForm, loading } = useIntakeForm();

  if (!tokenParsed) {
    return;
  }

  const handleSelectTab = (value: any) => {
    setSelectedTab(value);
  };

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
          program: formData?.program ?? Program.ALL,
        }}
        validationSchema={intakeFormValidationSchema}
        onSubmit={(values, actions) => {
          // TODO: Update
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="h-full flex flex-col justify-between">
              <TabGroup
                vertical
                manual
                selectedIndex={selectedTab}
                onChange={setSelectedTab}
                className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
              >
                <TabList className="flex flex-col">
                  {[programTab, ...formTabs].map(({ label, value }, index) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => handleSelectTab(value)}
                      className={clsx(
                        'data-[selected]:outline-none pb-16',
                        index !== formTabs.length &&
                          'border-blue-800 border-l border-dashed',
                      )}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex flex-row space-x-2 flex-nowrap text-nowrap h-full">
                            <div
                              className={clsx(
                                selected &&
                                  'bg-blue-800 text-white border-2 border-blue-800',
                                !selected && ' border-2 border-[#606060] bg-white',
                                ' px-2 -ml-3 rounded-full ',
                              )}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p
                                className={clsx(
                                  selected && 'outline-none text-blue-800 font-bold',
                                  'text-sm  text-[#606060]',
                                )}
                              >
                                {label}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormPage
                      key={programTab.value}
                      label={programTab.label}
                      description={programTab.description}
                      fields={programTab.fields.map((itm) => ({
                        ...itm,
                        disabled: !!formData?.currentProgram,
                      }))}
                    />
                  </TabPanel>

                  {formTabs.map(
                    ({ value, label, description, title, sections, fields }) => (
                      <TabPanel key={value}>
                        <FormPage
                          key={value}
                          label={label}
                          description={description}
                          title={title}
                          sections={sections}
                          fields={fields}
                        />
                      </TabPanel>
                    ),
                  )}
                </TabPanels>
              </TabGroup>

              <div>
                <div className="border border-t-grey-200"></div>
                <div className="flex flex-row justify-between px-32 py-8">
                  <div className="flex flex-row space-x-6">
                    <Button
                      text="Cancel"
                      variant={ButtonTypes.TEXT}
                      onClick={() => console.log('clicked')}
                    />
                    <Button
                      text="Save For Later"
                      variant={ButtonTypes.OUTLINED}
                      onClick={() => saveUpdateForm(values)}
                    />
                  </div>
                  <div className="flex flex-row space-x-6">
                    <Button
                      text="Previous"
                      disabled={selectedTab === 0}
                      variant={ButtonTypes.OUTLINED}
                      onClick={() =>
                        setSelectedTab(selectedTab - (1 % formTabs.length))
                      }
                    />
                    <Button
                      text="Next"
                      variant={ButtonTypes.SOLID}
                      disabled={selectedTab === formTabs.length - 1}
                      onClick={() =>
                        setSelectedTab(selectedTab + (1 % formTabs.length))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
};

export default IntakeForm;
