import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import {
  MemberScheduler,
  MemberItemList,
  MemberSkillsAndCertifications,
  DialogUI,
  MemberProfileEditPreferences,
  ProfileEditSkills,
  Button,
} from '@/components';
import type { BcwsRoleInterface, FunctionType, Member } from '@/common';
import {
  ButtonTypes,
  Program,
  Status,
  // type BcwsRoleInterface,
  // type FunctionType,
} from '@/common';
import { useState } from 'react';
import { ProfileSectionHeader } from '../profile/common';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';
import { Banner } from '../ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { BannerTransition } from '../ui/BannerTransition';
import { RecommitmentProfileBanner } from '../profile/banners/RecommitmentProfileBanner';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';

export const MemberAvailabilityTab = ({
  bcwsRoles,
  functions,
  member,
  profileData,
  updateMember,
  handleOpenRecommitmentForm,
}: {
  bcwsRoles: BcwsRoleInterface[];
  functions: FunctionType[];
  member: Member;
  profileData: any;
  updateMember: (member: Member, endpoint?: string) => Promise<void>;
  handleOpenRecommitmentForm: () => void;
}) => {
  const defaultTab = member.bcws ? Program.BCWS : Program.EMCR;
  const [activeSectionRolesTab, setActiveSectionRolesTab] = useState(defaultTab);
  const [openEditSections, setOpenEditSections] = useState(false);
  const [openEditSkills, setOpenEditSkills] = useState(false);
  const [showConfirmAvailability, setShowConfirmAvailability] = useState(false);
  const [showEmcrBanner, setShowEmcrBanner] = useState(true);
  const [showBcwsBanner, setShowBcwsBanner] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const handleCloseBanner = (program?: Program) => {
    if (program === Program.ALL || !program) {
      setShowBanner(false);
    } else if (program === Program.BCWS) {
      setShowBcwsBanner(false);
    } else {
      setShowEmcrBanner(false);
    }
  };
  const { recommitmentCycle, isRecommitmentCycleOpen, isRecommitmentReinitiationOpen } = useRecommitmentCycle();
  const openConfirmAvailability = () => {
    setShowConfirmAvailability(!showConfirmAvailability);
  };

  const handleOpenEditSections = () => {
    setOpenEditSections(!openEditSections);
  };

  const handleOpenEditSkills = () => {
    setOpenEditSkills(!openEditSkills);
  };

  const ScheduleDescription = ({
    openConfirmAvailability,
  }: {
    openConfirmAvailability: () => void;
  }) => (
    <div className="w-full flex justify-between">
      <p className="text-defaultGray text-sm w-2/3">
        Select the calendar dates below to update your availability or view more
        details.{' '}
        <strong>
          {
            'Remember to click "Confirm Availability" each time after updating your availability.'
          }
        </strong>{' '}
        Deployment dates can only be declined and cannot be edited.
      </p>
      <Button
        onClick={openConfirmAvailability}
        text="Confirm Availability"
        variant={ButtonTypes.TERTIARY}
      />
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

  const [showSuccessConfirmationBanner, setShowSuccessConfirmationBanner] =
    useState(false);

  const [showConfirmationWarningBanner, setShowConfirmationWarningBanner] =
    useState(false);

  const handleShowConfirmationWarningBanner = (show: boolean) => {
    setShowConfirmationWarningBanner(show);
  };

  const handleShowSuccessConfirmationBanner = () => {
    setShowSuccessConfirmationBanner(true);
    setTimeout(() => {
      setShowSuccessConfirmationBanner(false);
    }, 5000);
  };
  return (
    <>
      {
        member &&
        recommitmentCycle &&
        member.recommitment && member.recommitment.length > 0 &&
        (isRecommitmentCycleOpen || isRecommitmentReinitiationOpen) &&
        <RecommitmentProfileBanner
          year={recommitmentCycle?.year}
          endDate={(isRecommitmentReinitiationOpen && recommitmentCycle?.reinitiationEndDate) ? recommitmentCycle?.reinitiationEndDate : recommitmentCycle?.endDate}
          member={member}
          handleClick={handleOpenRecommitmentForm}
          handleCloseBanner={handleCloseBanner}
          showBanner={showBanner}
          showEmcrBanner={showEmcrBanner}
          showBcwsBanner={showBcwsBanner}
        />
      }
      {[member.emcr?.status, member.bcws?.status].includes(Status.ACTIVE) &&
        !showSuccessConfirmationBanner && (
          <BannerTransition show={showConfirmationWarningBanner}>
            <Banner
              onClose={() => setShowConfirmationWarningBanner(false)}
              content={
                <p className="text-sm text-yellow-900 xl:pr-12">
                  Remember to click “Confirm Availability” after saving all your
                  changes. Failure to do so will result in inaccurate updates for
                  your coordinator, which could impact your chances for deployment.
                </p>
              }
              title="Confirm Availability Changes for your Coordinator"
              type={BannerType.WARNING}
            />
          </BannerTransition>
        )}
      <BannerTransition show={showSuccessConfirmationBanner}>
        <Banner
          onClose={() => handleShowSuccessConfirmationBanner()}
          content={
            <p className="text-sm text-green-900 xl:pr-12">
              Your coordinator can now see your recent availability changes. You can
              always adjust your availability if needed.
            </p>
          }
          title="Updated availability confirmed and sent successfully."
          type={BannerType.SUCCESS}
        />
      </BannerTransition>

      <div className="border-2 border-gray-200 w-full p-8 mb-8 rounded-sm">
        <ProfileSectionHeader
          title="My Availability"
          description={
            <ScheduleDescription openConfirmAvailability={openConfirmAvailability} />
          }
        >
          <MemberScheduler
            personnelId={member.id}
            openConfirmAvailability={openConfirmAvailability}
            showConfirmAvailability={showConfirmAvailability}
            handleShowSuccessConfirmationBanner={handleShowSuccessConfirmationBanner}
            handleShowConfirmationWarningBanner={handleShowConfirmationWarningBanner}
            memberConfirmedUntil={member.availabilityConfirmedUntil}
          />
        </ProfileSectionHeader>
      </div>
      <div className="border-2 border-gray-200 w-full p-8 mb-8 rounded-sm">
        <ProfileSectionHeader
          title="Section Preferences" // make this depend on bcws / emcr
          description={<ProfileDescription />}
          buttonText="Edit Preferences"
          onButtonClick={handleOpenEditSections}
        >
          <Tabs value={activeSectionRolesTab}>
            {member.bcws && member.emcr && (
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
              {member.bcws && (
                <TabPanel value="bcws" className="px-0">
                  <MemberItemList
                    data={
                      member.bcws.roles?.map((r) => ({
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
                        member.bcws?.firstChoiceSection &&
                        SectionName[member.bcws.firstChoiceSection],
                      second:
                        member.bcws?.secondChoiceSection &&
                        SectionName[member.bcws.secondChoiceSection],
                      third:
                        member.bcws?.thirdChoiceSection &&
                        SectionName[member.bcws.thirdChoiceSection],
                    }}
                  />
                </TabPanel>
              )}
              {member.emcr && (
                <TabPanel value="emcr" className="px-0">
                  <MemberItemList
                    data={
                      member.emcr.experiences?.map((e) => ({
                        id: e.function.id,
                        section: e.function.name,
                        experience: e.experienceType,
                      })) || []
                    }
                    columns={[
                      {
                        name: 'Section Name',
                        key: 'section',
                      },
                    ]}
                    preferences={{
                      first: member.emcr?.firstChoiceFunction,
                      second: member.emcr?.secondChoiceFunction,
                      third: member.emcr?.thirdChoiceFunction,
                    }}
                  />
                </TabPanel>
              )}
            </TabsBody>
          </Tabs>
        </ProfileSectionHeader>
      </div>
      <div className="border-2 border-gray-200 w-full p-8 mb-8 rounded-sm">
        <ProfileSectionHeader
          title="Other Skills"
          buttonText="Edit Skills"
          description="&nbsp;"
          onButtonClick={handleOpenEditSkills}
        >
          <MemberSkillsAndCertifications
            member={member}
            profileData={profileData}
            allowEditing={true}
            updateMember={() => {}}
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
              member.bcws
                ? {
                    allRoles: bcwsRoles,
                    originalRoles: member.bcws.roles || [],
                    sectionChoices: {
                      firstChoiceSection: member.bcws?.firstChoiceSection,
                      secondChoiceSection: member.bcws?.secondChoiceSection,
                      thirdChoiceSection: member.bcws?.thirdChoiceSection,
                    },
                  }
                : undefined
            }
            emcr={
              member.emcr
                ? {
                    allFunctions: functions,
                    originalExperiences: member.emcr.experiences || [],
                    sectionChoices: {
                      firstChoiceSection: member.emcr?.firstChoiceFunction,
                      secondChoiceSection: member.emcr?.secondChoiceFunction,
                      thirdChoiceSection: member.emcr?.thirdChoiceFunction,
                    },
                  }
                : undefined
            }
            handleClose={handleOpenEditSections}
            handleSave={updateMember}
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
            originalLanguages={member.languages || []}
            originalTools={member.tools || []}
            originalCerts={member.certifications || []}
            handleClose={handleOpenEditSkills}
            handleSave={(newSkills) => {
              updateMember(
                {
                  ...member,
                  languages: newSkills.newLanguages,
                  tools: newSkills.newTools,
                  certifications: newSkills.newCertifications,
                },
                'skills',
              );
              setOpenEditSkills(false);
            }}
          />
        </DialogUI>
      </div>
    </>
  );
};
