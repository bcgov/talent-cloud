import type { FormikProps } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { IntakeFormData } from './fields';
import { intakeFormInitialValues } from './fields';
import { useKeycloak } from '@react-keycloak/web';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ButtonTypes } from '@/common';
import { Button } from '@/components/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { formTabs } from './tabs';
import { FormSections } from './FormSections';
import type { FormFields } from './types';
import { renderField } from './helpers';
import { intakeFormValidationSchema } from './validation';

const IntakeForm = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;
  const [selectedTab, setSelectedTab] = useState(0);
  // const { formData, saveUpdateForm, loading, alreadyEnrolled } = useIntakeForm();

  if (!tokenParsed) {
    return;
  }

  const handleSelectTab = (value: any) => {
    setSelectedTab(value);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (alreadyEnrolled) {
  //   return (
  //     <div className="h-full flex flex-col justify-centre w-full items-center">
  //       <h3>Member is in both programs</h3>
  //       <Link to="/profile">Profile</Link>
  //     </div>
  //   );
  // }

  return (
    <Formik
      initialValues={intakeFormInitialValues}
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
          <div className="h-screen overflow-y-hidden flex flex-col justify-between">
            <div className="h-full  overflow-y-auto">
              <TabGroup
                vertical
                manual
                selectedIndex={selectedTab}
                onChange={setSelectedTab}
                className="flex flex-row space-x-24 xl:space-x-32 px-16 lg:px-24 xl:px-32 w-full pt-24"
              >
                <TabList className="flex flex-col space-y-16 mt-2  border-dashed border-blue-900 border-l">
                  {formTabs.map(({ label, value }, index) => (
                    // {/* <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline"> */}
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => handleSelectTab(value)}
                      className={'data-[selected]:outline-none'}
                    >
                      {({ selected }) => (
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
                      )}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {formTabs.map(
                    ({ value, label, description, title, sections, fields }) => (
                      <TabPanel key={value}>
                        <div className="h-full flex flex-col xl:pr-24 w-[900px]">
                          <h3>{title ?? label}</h3>
                          <h3>{values.program}</h3>

                          <div className="text-sm py-6">{description}</div>
                          {sections && <FormSections sections={sections} />}

                          {fields &&
                            fields.map((fieldItm: FormFields) => (
                              <div
                                key={fieldItm.name}
                                className="w-full flex flex-col"
                              >
                                <label htmlFor={fieldItm.name}>
                                  {fieldItm.label}
                                </label>
                                <Field
                                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full rounded-md"
                                  name={fieldItm.name}
                                  type={fieldItm.type}
                                  placeholder={fieldItm.placeholder}
                                  options={fieldItm?.options}
                                  helper={fieldItm?.helper}
                                >
                                  {(fieldProps: FormikProps<IntakeFormData>) =>
                                    renderField(fieldItm, fieldProps)
                                  }
                                </Field>
                              </div>
                            ))}
                        </div>
                      </TabPanel>
                    ),
                  )}
                </TabPanels>
              </TabGroup>
            </div>

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
                    onClick={() => console.log('clicked')}
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
};

export default IntakeForm;
