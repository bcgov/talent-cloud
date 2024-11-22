import useMemberProfile from '@/hooks/useMemberProfile';
import { useRoleContext } from '@/providers';
import type { Personnel } from '@/common';
import { Program, Role, Status } from '@/common';
import {
  Loading,
  ProfileFunctions,
  Scheduler,
  SectionsAndRoles,
  SkillsAndCertifications,
} from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { ProfileToggle } from '@/components/profile/common';
import { useProgramFieldData } from '@/hooks';
import { bcwsData, emcrData } from '@/hooks/profileData';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';

const MemberProfile = () => {
  const { personnel, program, loading, updatePersonnel } = useMemberProfile();
  const { role } = useRoleContext();
  const bcwsProfileData =
    (program === Program.BCWS || program === Program.ALL) &&
    bcwsData({ ...personnel, ...personnel?.bcws } as Personnel);
  const emcrProfileData =
    (program === Program.EMCR || program === Program.ALL) &&
    emcrData({ ...personnel, ...personnel?.emcr } as Personnel);

  const profileData = { ...bcwsProfileData, ...emcrProfileData };

  const { functions, bcwsRoles } = useProgramFieldData(program);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen pt-24  ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} w-full overflow-x-hidden`}
    >
      {personnel && <ProfileMemberHeader personnel={personnel} role={role} />}
      <div className="bg-white w-full">
        <div className="md:px-12 xl:px-24 2xl:px-64 mx-auto w-auto">
          {personnel && (
            <ProfileToggle
              personnel={personnel}
              role={role}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && (
            <RecommitmentProfileBanner personnel={personnel} program={program} />
          )}
          {personnel && <Scheduler personnel={personnel} />}

          {personnel && program === Program.EMCR && (
            <ProfileFunctions
              functions={functions}
              personnel={personnel}
              allowEditing={role === Role.COORDINATOR}
              updatePersonnel={updatePersonnel}
            />
          )}

          {personnel && program === Program.BCWS && (
            <>
              <SectionsAndRoles
                personnel={personnel}
                bcwsRoles={bcwsRoles}
                allowEditing={role === Role.COORDINATOR}
                updatePersonnel={updatePersonnel}
              />
              <SkillsAndCertifications
                personnel={personnel}
                profileData={profileData}
                allowEditing={role === Role.COORDINATOR}
                updatePersonnel={updatePersonnel}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
