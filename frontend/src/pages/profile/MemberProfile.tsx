import { useState } from 'react';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import useMemberProfile from '@/hooks/useMemberProfile';
import { useRoleContext } from '@/providers';
import { ButtonTypes, Program, Status } from '@/common';
import { Button, Loading, MemberProfileDetails } from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { MemberAvailabilityTab } from '@/components/tabs/Availability';
import { Tabs as TabIndexes } from '@/common';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';
import { memberData } from '@/hooks/profileData';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { Transition } from '@headlessui/react';
import { useProgramFieldData } from '@/hooks';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';

const MemberProfile = () => {
  const { personnel, loading, updatePersonnel,updatePersonnelRecommitment } = useMemberProfile();
  const [showBanner, setShowBanner] = useState(true);
  const { bcwsRoles, functions } = useProgramFieldData(Program.ALL);

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
  
  // TODO - remove this - using for testing purposes  
  const handleRecommit = async (status: RecommitmentStatus, program: Program) => {
    if (personnel?.recommitment && program === Program.BCWS)
      personnel.recommitment.bcws = status;
    if (personnel?.recommitment && program === Program.EMCR)
      personnel.recommitment.bcws = status;
    if (personnel?.recommitment && program === Program.ALL) {
      personnel.recommitment.bcws = status;
      personnel.recommitment.emcr = status;
    }
    if (personnel && recommitmentCycle) {
      try{
        

    const res  =  await updatePersonnelRecommitment(recommitmentCycle.year, status,personnel.id, program );
    console.log(res)
      }catch(e){
        console.log(e)
      }
    }
  };

  return (
    <div
      className={`min-h-screen    w-full overflow-x-hidden lg:px-32 xl:px-32 2xl:px-64`}
    >
      <div
        className={`${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} pt-32`}
      >
            <div className='flex flex-row w-100 space-x-8 px-12'>
            {/*  TODO - remove this - using for testing purposes   */}
{personnel &&
  personnel.recommitment?.bcws ===
    RecommitmentStatus.PENDING && (
    <div className="flex flex-col">
      <Button
        onClick={() =>
          handleRecommit(
            RecommitmentStatus.MEMBER_COMMITTED,
            Program.BCWS,
          )
        }
        variant={ButtonTypes.TERTIARY}
        text={'Accept BCWS Recommitment'}
      />
      <Button
        onClick={() =>
          handleRecommit(
            RecommitmentStatus.MEMBER_DENIED,
            Program.BCWS,
          )
        }
        variant={ButtonTypes.SECONDARY}
        text={'Decline BCWS Recommitment'}
      />
    </div>
  )}
{personnel &&
  personnel.recommitment?.emcr ===
    RecommitmentStatus.PENDING && (
      <div className="flex flex-col">
      <Button
        onClick={() =>
          handleRecommit(
            RecommitmentStatus.MEMBER_COMMITTED,
            Program.EMCR,
          )
        }
        variant={ButtonTypes.TERTIARY}
        text={'Accept EMCR Recommitment'}
      />
      <Button
        onClick={() =>
          handleRecommit(
            RecommitmentStatus.MEMBER_DENIED,
            Program.EMCR,
          )
        }
        variant={ButtonTypes.SECONDARY}
        text={'Decline EMCR Recommitment'}
      />
    </div>
  )}
{personnel &&
  
      <Button
        text="Reset Recomittment"
        variant={ButtonTypes.TERTIARY}
        onClick={() =>
          handleRecommit(RecommitmentStatus.PENDING, Program.ALL)
        }
      />
    }
    </div>
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
                <>
              
              
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
                          handleCloseBanner={handleCloseBanner}
                        />
                      </div>
                    </Transition>
                  </div>
                </>
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
    </div>
  );
};

export default MemberProfile;
