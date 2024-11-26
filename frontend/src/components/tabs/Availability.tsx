import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import {
  MemberScheduler,
  MemberSectionsAndRoles,
  MemberProfileFunctions,
  MemberSkillsAndCertifications,
} from '@/components';
import {
  Program,
  type BcwsRoleInterface,
  type FunctionType,
  type MemberProfile,
} from '@/common';
import { useState } from 'react';
import { ProfileSectionHeader } from '../profile/common';

export const MemberAvailabilityTab = ({
  bcwsRoles,
  functions,
  personnel,
  profileData,
}: {
  bcwsRoles: BcwsRoleInterface[];
  functions: FunctionType[];
  personnel: MemberProfile;
  profileData: any;
}) => {
  const defaultTab = personnel.bcws ? Program.BCWS : Program.EMCR;
  const [activeSectionRolesTab, setActiveSectionRolesTab] = useState(defaultTab);

  return (
    <>
      <ProfileSectionHeader
        title="My Schedule"
        callToAction="Show Upcoming Deployments"
        onCallToActionClick={() => {}}
        description={
          'Select the calendar dates below to update your availability or view more details'
        }
      >
        <MemberScheduler personnelId={personnel.id} />
      </ProfileSectionHeader>
      <ProfileSectionHeader
        title="Section Preferences" // make this depend on bcws / emcr
        description="The following shows the list of sections that you prefer to be deployed in, as indicated in your CORE application."
        buttonText="+ Add Preference"
        onButtonClick={() => {}}
      >
        <Tabs value={activeSectionRolesTab}>
          {personnel.bcws && personnel.emcr && (
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 whitespace-nowrap w-fit gap-6"
              indicatorProps={{
                className:
                  'bg-transparent border-b-2 border-primaryBlue shadow-none rounded-none',
              }}
            >
              <Tab
                className={`${activeSectionRolesTab === Program.BCWS ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
                value={Program.BCWS}
                onClick={() => setActiveSectionRolesTab(Program.BCWS)}
              >
                BCWS Roles
              </Tab>
              <Tab
                className={`${activeSectionRolesTab === Program.EMCR ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
                value={Program.EMCR}
                onClick={() => setActiveSectionRolesTab(Program.EMCR)}
              >
                EMCR Sections
              </Tab>
            </TabsHeader>
          )}
          <TabsBody>
            {personnel.bcws && (
              <TabPanel value="bcws">
                <MemberSectionsAndRoles
                  personnel={personnel}
                  bcwsRoles={bcwsRoles}
                  allowEditing={true}
                  updatePersonnel={() => {}}
                />
              </TabPanel>
            )}
            {personnel.emcr && (
              <TabPanel value="emcr">
                <MemberProfileFunctions
                  personnel={personnel}
                  functions={functions}
                  allowEditing={true}
                  updatePersonnel={() => {}}
                />
              </TabPanel>
            )}
          </TabsBody>
        </Tabs>
      </ProfileSectionHeader>
      <ProfileSectionHeader title="Other Skills">
        <MemberSkillsAndCertifications
          personnel={personnel}
          profileData={profileData}
          allowEditing={true}
          updatePersonnel={() => {}}
        />
      </ProfileSectionHeader>
    </>
  );
};
