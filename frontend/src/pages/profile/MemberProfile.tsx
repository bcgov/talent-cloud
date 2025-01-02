import { useState } from 'react';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import useMemberProfile from '@/hooks/useMemberProfile';
import { useRoleContext } from '@/providers';
import { Program, Status } from '@/common';
import { DialogUI, Loading, MemberProfileDetails } from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { MemberAvailabilityTab } from '@/components/tabs/Availability';
import { Tabs as TabIndexes } from '@/common';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';
import { memberData } from '@/hooks/profileData';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { Transition } from '@headlessui/react';
import { useProgramFieldData } from '@/hooks';
import { RecommitmentFormBase } from '@/components/recommitment';

const MemberProfile = () => {
  const { personnel, program, loading, updatePersonnel } = useMemberProfile();
  const [showBanner, setShowBanner] = useState(true);
  const [openRecommitmentForm, setOpenRecommitmentForm] = useState(false);
  const { bcwsRoles, functions } = useProgramFieldData(Program.ALL);

  const handleOpenRecommitmentForm = () => {
    setOpenRecommitmentForm(!openRecommitmentForm);
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };
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
                  <Transition
                    show={isRecommitmentCycleOpen && showBanner}
                    appear={true}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div>
                      <RecommitmentProfileBanner
                        year={recommitmentCycle?.year}
                        endDate={recommitmentCycle.endDate}
                        personnel={personnel}
                        handleClick={handleOpenRecommitmentForm}
                        handleCloseBanner={handleCloseBanner}
                      />
                    </div>
                  </Transition>
                </div>
              )}
              <TabsBody placeholder={undefined}>
                <TabPanel value={TabIndexes.AVAILABILITY}>
                  {personnel && (
                    <MemberAvailabilityTab
                      bcwsRoles={bcwsRoles}
                      functions={functions}
                      personnel={personnel}
                      profileData={profileData}
                      updatePersonnel={updatePersonnel}
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
      {program && personnel && (
        <DialogUI
          open={openRecommitmentForm}
          onClose={updatePersonnel}
          handleOpen={handleOpenRecommitmentForm}
          title={'Confirm Recommitment Status'}
          style={'lg:w-2/3 xl:w-1/2'}
        >
          <RecommitmentFormBase
            program={program}
            personnel={personnel}
            onCancel={() => setOpenRecommitmentForm(false)}
          />
        </DialogUI>
      )}
    </div>
  );
};

export default MemberProfile;
