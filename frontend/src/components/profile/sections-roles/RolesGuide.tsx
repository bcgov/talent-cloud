import { Tab, TabPanel, Tabs, TabsHeader, TabsBody } from '@material-tailwind/react';
import { bcws, emcr } from './roles';
import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

const BcwsRolesGuide = () => {
  return (
    <>
      <p className="text-sm text-black">BCWS sections consist of the following:</p>
      {bcws.map((itm, index) => (
        <Disclosure defaultOpen={index === 0} key={index}>
          {({ open }) => (
            <>
              <div className="w-full">
                <DisclosureButton className="w-full pt-6">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-info font-bold pt-4">{itm.section}</p>{' '}
                    {open ? (
                      <MinusIcon className="w-5 text-info" />
                    ) : (
                      <PlusIcon className="w-5 text-info" />
                    )}
                  </div>
                </DisclosureButton>
                <div className="w-full border border-b-1 border-b-blue-gray-100 mt-4"></div>
              </div>

              <DisclosurePanel
                transition
                className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                {itm.roles.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-start justify-start space-x-2 py-4"
                  >
                    <div className="font-bold text-info text-sm w-1/3">
                      <h6>{item.title}</h6>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};

const EmcrRoleGuide = () => {
  return (
    <>
      <p className="text-sm text-black text-left">
        EMCR sections consist of the following:
      </p>
      {emcr.map((itm, index) => (
        <div key={index} className="py-4 px-4">
          <div className="flex flex-row items-start justify-start space-x-1 py-4">
            <div className="font-bold text-info text-sm w-1/3">
              <h6>{itm.title}</h6>
            </div>
            <div className="w-2/3">
              <p className="text-sm">{itm.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const RolesAndFunctionsDescriptionsTabs = ({
  bcws,
  emcr,
}: {
  bcws: boolean;
  emcr: boolean;
}) => {
  const [activeTab, setActiveTab] = useState(!emcr ? 'BCWS' : 'EMCR');
  const handleTabChange = (index: string) => {
    setActiveTab(index);
  };
  return (
    <div className="w-full">
      <Tabs value={activeTab} onChange={handleTabChange}>
        <TabsHeader
          className="rounded-none  bg-transparent px-6 pt-8 whitespace-nowrap gap-6"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 px-6 border-primaryBlue shadow-none rounded-none',
          }}
        >
          <div className="flex gap-4">
            {emcr && (
              <Tab
                className={`${activeTab === 'EMCR' ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
                value={'EMCR'}
              >
                <p className={'font-bold text-info'}>EMCR Sections</p>
              </Tab>
            )}
            {bcws && (
              <Tab
                value={'BCWS'}
                className={`${activeTab === 'BCWS' ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
              >
                <p className={'font-bold text-info'}>BCWS Roles</p>
              </Tab>
            )}
          </div>
        </TabsHeader>

        <TabsBody className="px-4">
          {bcws && (
            <TabPanel value={'BCWS'}>
              <BcwsRolesGuide />
            </TabPanel>
          )}

          {emcr && (
            <TabPanel value={'EMCR'}>
              <EmcrRoleGuide />
            </TabPanel>
          )}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default RolesAndFunctionsDescriptionsTabs;
