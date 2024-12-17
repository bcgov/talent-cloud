import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import {
  MemberScheduler,
  MemberItemList,
  MemberSkillsAndCertifications,
  DialogUI,
  MemberProfileEditPreferences,
  ProfileEditSkills,
} from '@/components';
import type { BcwsRoleInterface, FunctionType, Personnel } from '@/common';
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
  bcwsRoles,
  functions,
  personnel,
  profileData,
  updatePersonnel,
}: {
  bcwsRoles: BcwsRoleInterface[];
  functions: FunctionType[];
  personnel: MemberProfile;
  profileData: any;
  updatePersonnel: (personnel: Partial<Personnel>) => Promise<void>;
}) => {
  const defaultTab = personnel.bcws ? Program.BCWS : Program.EMCR;
  const [activeSectionRolesTab, setActiveSectionRolesTab] = useState(defaultTab);
  const [openEditSections, setOpenEditSections] = useState(false);
  const [openEditSkills, setOpenEditSkills] = useState(false);

  const handleOpenEditSections = () => {
    setOpenEditSections(!openEditSections);
  };

  const handleOpenEditSkills = () => {
    setOpenEditSkills(!openEditSkills);
  };

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
        callToActionType="text"
        onCallToActionClick={() => {}}
        description={<ScheduleDescription />}
      >
        <MemberScheduler personnelId={personnel.id} />
      </ProfileSectionHeader>
      <ProfileSectionHeader
        title="Section Preferences" // make this depend on bcws / emcr
        description={<ProfileDescription />}
        buttonText="+ Add Preference"
        onButtonClick={handleOpenEditSections}
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
                <MemberItemList
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
                  ]}
                  preferences={{
                    first:
                      personnel.bcws?.firstChoiceSection &&
                      SectionName[personnel.bcws.firstChoiceSection],
                    second:
                      personnel.bcws?.secondChoiceSection &&
                      SectionName[personnel.bcws.secondChoiceSection],
                    third: undefined, // TODO
                  }}
                />
              </TabPanel>
            )}
            {personnel.emcr && (
              <TabPanel value="emcr" className="px-0">
                <MemberItemList
                  data={
                    personnel.emcr.experiences?.map((e) => ({
                      id: e.function.id,
                      section: e.function.name,
                      experience: 'none',
                    })) || []
                  }
                  columns={[
                    {
                      name: 'Section Name',
                      key: 'section',
                    },
                  ]}
                />
              </TabPanel>
            )}
          </TabsBody>
        </Tabs>
      </ProfileSectionHeader>
      <ProfileSectionHeader
        title="Other Skills"
        buttonText="Edit Skills"
        description="&nbsp;"
        onButtonClick={handleOpenEditSkills}
      >
        <MemberSkillsAndCertifications
          personnel={personnel}
          profileData={profileData}
          allowEditing={true}
          updatePersonnel={() => {}}
        />
      </ProfileSectionHeader>

      <DialogUI
        open={openEditSections}
        onClose={handleOpenEditSections}
        handleOpen={handleOpenEditSections}
        title={'Edit Preferences'}
        style={'lg:w-2/3 xl:w-1/2'}
      >
        <MemberProfileEditPreferences
          bcws={
            personnel.bcws
              ? {
                  allRoles: bcwsRoles,
                  originalRoles: personnel.bcws.roles || [],
                  sectionChoices: {
                    firstChoiceSection: personnel.bcws?.firstChoiceSection,
                    secondChoiceSection: personnel.bcws?.secondChoiceSection,
                  },
                }
              : undefined
          }
          emcr={
            personnel.emcr
              ? {
                  allFunctions: functions,
                  originalExperiences: personnel.emcr.experiences || [],
                  sectionChoices: {},
                }
              : undefined
          }
          handleClose={handleOpenEditSections}
          handleSave={updatePersonnel}
        />
      </DialogUI>
      {/* Skills and Certs */}
      <DialogUI
        open={openEditSkills}
        onClose={handleOpenEditSkills}
        handleOpen={handleOpenEditSkills}
        title="Edit Skills & Certifications"
        style="w-5/6"
      >
        <ProfileEditSkills
          originalLanguages={personnel.languages || []}
          originalTools={personnel.tools || []}
          originalCerts={personnel.certifications || []}
          handleClose={handleOpenEditSkills}
          handleSave={(newSkills) => {
            updatePersonnel({
              languages: newSkills.newLanguages,
              tools: newSkills.newTools,
              certifications: newSkills.newCertifications,
            });
            setOpenEditSkills(false);
          }}
        />
      </DialogUI>
    </>
  );
};
