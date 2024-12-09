import { useState } from 'react';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import useMemberProfile from '@/hooks/useMemberProfile';
import { useRoleContext } from '@/providers';
import { Status } from '@/common';
import { Loading, MemberProfileDetails } from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { MemberAvailabilityTab } from '@/components/tabs/Availability';
import { Tabs as TabIndexes } from '@/common';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';
import { memberData } from '@/hooks/profileData';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';

const MemberProfile = () => {
  const { personnel, loading, updatePersonnel } = useMemberProfile();
  const { roles } = useRoleContext();
  const [activeTab, setActiveTab] = useState('availability');

  const profileData = memberData(personnel);
  const { recommitmentCycle, isRecommitmentCycleOpen } = useRecommitmentCycle();
  const handleTabChange = (index: string) => {
    setActiveTab(index);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen    w-full overflow-x-hidden lg:px-32 xl:px-32 2xl:px-64`}
    >
      <div
        className={`${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} pt-32`}
      >
        <Tabs value={activeTab} onChange={handleTabChange}>
          {personnel && (
            <ProfileMemberHeader
              personnel={personnel}
              currentTab={activeTab}
              roles={roles}
            />
          )}

          <div className="bg-white w-full">
            <div className="mx-auto w-auto">
              {personnel && recommitmentCycle && (
                <div className="py-24">
                  <RecommitmentProfileBanner
                    year={recommitmentCycle?.year}
                    endDate={recommitmentCycle.endDate}
                    showWarningBanner={isRecommitmentCycleOpen ?? false}
                  />
                </div>
              )}
              <TabsBody placeholder={undefined}>
                <TabPanel value={TabIndexes.AVAILABILITY}>
                  {personnel && (
                    <MemberAvailabilityTab
                      // bcwsRoles={bcwsRoles}
                      // functions={functions}
                      personnel={personnel}
                      profileData={profileData}
                    />
                  )}
                </TabPanel>
                <TabPanel value={TabIndexes.PROFILE}>
                  {personnel && (
                    <MemberProfileDetails
                      profileData={profileData}
                      personnel={personnel}
                      updatePersonnel={updatePersonnel}
                    />
                  )}
                </TabPanel>
              </TabsBody>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default MemberProfile;
