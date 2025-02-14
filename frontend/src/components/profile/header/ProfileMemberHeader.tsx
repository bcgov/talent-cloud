import { useState } from 'react';
import { Tab, TabsHeader } from '@material-tailwind/react';
import type { Member } from '@/common';
import { Tabs, TabNames } from '@/common';
import { renderStatus } from './helpers';

export const ProfileMemberHeader = ({
  currentTab = Tabs.AVAILABILITY,
  member,
}: {
  currentTab: string;
  member: Member;
}) => {
  const [activeTab, setActiveTab] = useState(currentTab);

  return (
    <>
      <div className="px-8 float-left hidden lg:inline-block">
        <div className="w-32 h-32 grid rounded-full bg-primaryBlue justify-center content-center">
          <h1 className="text-white font-bold text-5xl">
            {member.firstName?.charAt(0)}
            {member.lastName?.charAt(0)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col content-center items-start pl-8 lg:pl-0 space-y-6 py-12 h-auto lg:flex-row lg:space-y-0 lg:py-0 lg:items-center lg:pb-4">
          <h2 className="font-semibold px-2">
            {member.firstName} {member.lastName}
          </h2>

          <div className="flex flex-col space-y-2">{renderStatus(member)}</div>
        </div>
        <div className="w-fit">
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 whitespace-nowrap gap-6"
            indicatorProps={{
              className:
                'bg-transparent border-b-2 border-primaryBlue shadow-none rounded-none',
            }}
            placeholder={undefined}
          >
            <div className="flex gap-4">
              <Tab
                placeholder={undefined}
                className={`${activeTab === Tabs.AVAILABILITY ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
                onClick={() => setActiveTab(Tabs.AVAILABILITY)}
                value={Tabs.AVAILABILITY}
              >
                {TabNames.AVAILABILITY}
              </Tab>
              <Tab
                placeholder={undefined}
                className={`${activeTab === Tabs.PROFILE ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
                onClick={() => setActiveTab(Tabs.PROFILE)}
                value={Tabs.PROFILE}
              >
                {TabNames.PROFILE}
              </Tab>
              <Tab
                placeholder={undefined}
                className={`${activeTab === Tabs.TRAINING ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
                onClick={() => setActiveTab(Tabs.TRAINING)}
                value={Tabs.TRAINING}
              >
                {TabNames.TRAINING}
              </Tab>
            </div>
          </TabsHeader>
        </div>
      </div>
    </>
  );
};
