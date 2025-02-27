import { Form, Formik } from 'formik';
import { personalDetailsSchema, programSelectionSchema } from './validation';
import { personalDetails, programFields } from './fields';
import { useKeycloak } from '@react-keycloak/web';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ButtonTypes } from '@/common';
import { Button } from '@/components/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { formTabs } from './tabs';

const IntakeForm = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;
  const [selectedTab, setSelectedTab] = useState(0);

  if (!tokenParsed) {
    return;
  }

  const handleSelectTab = (value: any) => {
    setSelectedTab(value);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Formik
        initialValues={{
          programFields,
          personalDetails: {
            ...personalDetails,
            firstName: tokenParsed.given_name,
            lastName: tokenParsed.family_name,
          },
          // ...etc
        }}
        validationSchema={{
          programSelectionSchema,
          personalDetailsSchema,
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
              {formTabs.map(({ value, children, label, description }) => (
                <TabPanel key={value}>
                  <div className="h-full flex flex-col xl:pr-24">
                    <h3>{label}</h3>
                    <div className="text-sm py-6">{description}</div>

                    {children}
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </Form>
      </Formik>
      <div>
        <div className="border border-t-grey-200"></div>
        <div className="flex flex-row justify-between py-8 px-32">
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
              onClick={() => setSelectedTab(selectedTab - (1 % formTabs.length))}
            />
            <Button
              text="Next"
              variant={ButtonTypes.SOLID}
              disabled={selectedTab === formTabs.length - 1}
              onClick={() => setSelectedTab(selectedTab + (1 % formTabs.length))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;
