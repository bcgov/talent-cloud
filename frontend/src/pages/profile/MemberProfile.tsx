import { useState } from 'react';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import useMemberProfile from '@/hooks/useMemberProfile';
import { Program, Status, Tabs as TabsEnum } from '@/common';
import { DialogUI, Loading, MemberProfileDetails } from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { MemberAvailabilityTab } from '@/components/tabs/Availability';
import { Tabs as TabIndexes } from '@/common';
import { memberData } from '@/hooks/memberProfileData';
import { useProgramFieldData } from '@/hooks';
import { RecommitmentFormBase } from '@/components/recommitment';

const MemberProfile = () => {
  const {
    member,
    program,
    recommitmentProgram,
    loading,
    updateMember,
    openRecommitmentForm,
    handleOpenRecommitmentForm,
  } = useMemberProfile();

  const { bcwsRoles, functions } = useProgramFieldData(Program.ALL);

  const [activeTab, setActiveTab] = useState('availability');

  const profileData = memberData(member);

  const handleTabChange = (index: string) => {
    if (
      ![TabsEnum.AVAILABILITY, TabsEnum.PROFILE, TabsEnum.TRAINING].includes(
        index as TabsEnum,
      )
    ) {
      setActiveTab(TabsEnum.AVAILABILITY);
    } else {
      setActiveTab(index);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden lg:px-32 xl:px-32 2xl:px-64`}
    >
      <div
        className={`${member?.bcws?.status === Status.PENDING || member?.emcr?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} pt-32`}
      >
        <Tabs value={activeTab} onChange={handleTabChange}>
          {member && <ProfileMemberHeader member={member} currentTab={activeTab} />}

          <div className="bg-white w-full">
            <div className="mx-auto w-auto">
              <TabsBody placeholder={undefined}>
                <TabPanel value={TabIndexes.AVAILABILITY}>
                  {member && (
                    <MemberAvailabilityTab
                      bcwsRoles={bcwsRoles}
                      functions={functions}
                      member={member}
                      profileData={profileData}
                      updateMember={updateMember}
                      handleOpenRecommitmentForm={handleOpenRecommitmentForm}
                    />
                  )}
                </TabPanel>
                <TabPanel value={TabIndexes.PROFILE}>
                  {member && (
                    <MemberProfileDetails
                      profileData={profileData}
                      member={member}
                      updateMember={updateMember}
                    />
                  )}
                </TabPanel>
              </TabsBody>
            </div>
          </div>
        </Tabs>
      </div>
      {program && member && (
        <DialogUI
          open={openRecommitmentForm}
          onClose={updateMember}
          handleOpen={handleOpenRecommitmentForm}
          title={`Confirm Recommitment Status for ${recommitmentProgram === Program.ALL ? 'BCWS and EMCR' : recommitmentProgram?.toUpperCase()}`}
          style={'lg:w-2/3 xl:w-1/2'}
        >
          <RecommitmentFormBase
            program={recommitmentProgram}
            member={member}
            onClose={handleOpenRecommitmentForm}
          />
        </DialogUI>
      )}
    </div>
  );
};

export default MemberProfile;
