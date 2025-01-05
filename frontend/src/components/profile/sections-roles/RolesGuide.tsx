import { Tab, TabPanel, Tabs, TabsHeader, TabsBody } from '@material-tailwind/react';
import { bcws, emcr } from './roles';
import { useState } from 'react';

const BcwsRolesGuide = () => {
  return (
    <>
      {bcws.map((itm, index) => (
        <div key={index} className="py-4 px-4">
          <p className="font-bold pt-4">{itm.section}</p>
          <div className="w-full border border-b-1 border-b-blue-gray-100 mt-4"></div>
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
        </div>
      ))}
    </>
  );
};

const EmcrRoleGuide = () => {
  return (
    <>
      <p className="text-sm text-black px-4">
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
  emcr,
  bcws,
}: {
  emcr: boolean;
  bcws: boolean;
}) => {
  const [activeTab, setActiveTab] = useState('EMCR');
  const handleTabChange = (index: string) => {
    setActiveTab(index);
  };
  return (
    <div className="w-fit">
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

        <TabsBody>
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
