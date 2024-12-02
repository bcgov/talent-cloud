import { useState } from 'react';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import useMemberProfile from '@/hooks/useMemberProfile';
import { useRoleContext } from '@/providers';
import type { Personnel } from '@/common';
import { Program, Status } from '@/common';
import { Loading } from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { useProgramFieldData } from '@/hooks';
import { MemberAvailabilityTab } from '@/components/tabs/Availability';
import { MemberProfileTab } from '@/components/tabs/Details';
import { Tabs as TabIndexes } from '@/common';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';
import { bcwsData, emcrData } from '@/hooks/profileData';

const MemberProfile = () => {
  const { personnel, program, loading } = useMemberProfile();
  const { roles } = useRoleContext();
  const [activeTab, setActiveTab] = useState('availability');

  const bcwsProfileData =
    (program === Program.BCWS || program === Program.ALL) &&
    bcwsData({ ...personnel, ...personnel?.bcws } as Personnel);
  const emcrProfileData =
    (program === Program.EMCR || program === Program.ALL) &&
    emcrData({ ...personnel, ...personnel?.emcr } as Personnel);

  const profileData = { ...bcwsProfileData, ...emcrProfileData };

  const { functions, bcwsRoles } = useProgramFieldData(program);

  const handleTabChange = (index: string) => {
    setActiveTab(index);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen pt-24  ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} w-full overflow-x-hidden`}
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
          <div className="md:px-12 xl:px-24 2xl:px-64 mx-auto w-auto">
            {personnel && (
              <RecommitmentProfileBanner personnel={personnel} program={program} />
            )}
            <TabsBody placeholder={undefined}>
              <TabPanel value={TabIndexes.AVAILABILITY}>
                {personnel && (
                  <MemberAvailabilityTab
                    bcwsRoles={bcwsRoles}
                    functions={functions}
                    personnel={personnel}
                    profileData={profileData}
                  />
                )}
              </TabPanel>
              <TabPanel value={TabIndexes.PROFILE}>
                {personnel && <MemberProfileTab />}
              </TabPanel>
            </TabsBody>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MemberProfile;
