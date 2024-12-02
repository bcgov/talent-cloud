import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import {
  MemberScheduler,
  MemberSectionsAndRoles,
  MemberSkillsAndCertifications,
} from '@/components';
import {
  Program,
  // type BcwsRoleInterface,
  // type FunctionType,
  type MemberProfile,
} from '@/common';
import { useState } from 'react';
import { ProfileSectionHeader } from '../profile/common';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';

export const MemberAvailabilityTab = ({
  // bcwsRoles,
  // functions,
  personnel,
  profileData,
}: {
  // bcwsRoles: BcwsRoleInterface[];
  // functions: FunctionType[];
  personnel: MemberProfile;
  profileData: any;
}) => {
  const defaultTab = personnel.bcws ? Program.BCWS : Program.EMCR;
  const [activeSectionRolesTab, setActiveSectionRolesTab] = useState(defaultTab);

  const ScheduleDescription = () => (
    <div>
      <p className="text-defaultGray text-sm">
        Select the calendar dates below to update your availability or view more
        details.
      </p>
      <p className="text-defaultGray text-sm">
        Deployment dates can only be declined and cannot be edited.
      </p>
    </div>
  );

  const ProfileDescription = () => (
    <div>
      <p className="text-defaultGray text-sm">
        The following shows the list of sections that you prefer to be deployed in,
        as indicated in your CORE application.
      </p>
      <p className="text-defaultGray text-sm">
        You can add or remove a section from this table.
      </p>
    </div>
  );

  return (
    <>
      <ProfileSectionHeader
        title="My Schedule"
        callToAction="Show Upcoming Deployments"
        onCallToActionClick={() => {}}
        description={<ScheduleDescription />}
      >
        <MemberScheduler personnelId={personnel.id} />
      </ProfileSectionHeader>
      <ProfileSectionHeader
        title="Section Preferences" // make this depend on bcws / emcr
        description={<ProfileDescription />}
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
              <TabPanel value="bcws" className="px-0">
                <MemberSectionsAndRoles
                  data={
                    personnel.bcws.roles?.map((r) => ({
                      id: r.id,
                      section: SectionName[r.section],
                      role: BcwsRoleName[r.role],
                      experience: 'none',
                    })) || []
                  }
                  columns={[
                    {
                      name: 'Section Name',
                      key: 'section',
                    },
                    {
                      name: 'Role',
                      key: 'role',
                    },
                    {
                      name: 'Action',
                      key: 'remove',
                    },
                  ]}
                  preferences={{
                    first:
                      personnel.firstChoiceSection &&
                      SectionName[personnel.firstChoiceSection],
                    second:
                      personnel.secondChoiceSection &&
                      SectionName[personnel.secondChoiceSection],
                    third: undefined, // TODO
                  }}
                  removeRow={(id: number) => {
                    console.log(id);
                  }}
                />
              </TabPanel>
            )}
            {personnel.emcr && (
              <TabPanel value="emcr" className="px-0">
                <MemberSectionsAndRoles
                  data={
                    personnel.emcr.experiences?.map((e) => ({
                      id: e.id,
                      section: e.functionName,
                      experience: 'none',
                    })) || []
                  }
                  columns={[
                    {
                      name: 'Section Name',
                      key: 'section',
                    },
                    {
                      name: 'Action',
                      key: 'remove',
                    },
                  ]}
                  // preferences: TODO
                  removeRow={(id: number) => {
                    console.log(id);
                  }}
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
