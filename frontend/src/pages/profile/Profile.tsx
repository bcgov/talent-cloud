import usePersonnel from '@/hooks/usePersonnel';

import {
  Scheduler,
  ProfileFunctions,
  SectionsAndRoles,
  SkillsAndCertifications,
  NewApplicantBanner,
  ProfileDetails,
  ProfileHeader,
  ProfileNotes,
  Loading,
} from '@/components';
import { Status, Role, Program } from '@/common';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';
import { ProfileBreadcrumbs, ProfileToggle } from '@/components/profile/common';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';
import { useRoleContext } from '@/providers';

const Profile = () => {
  const { loading, roles, personnel, updatePersonnel, profileData } = usePersonnel();
  const { program } = useRoleContext();
  const { functions, bcwsRoles } = useProgramFieldData(program);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen pt-24  ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} w-full overflow-x-hidden`}
    >
      {personnel && <ProfileBreadcrumbs personnel={personnel} />}

      {personnel && (
        <ProfileHeader personnel={personnel} program={program} roles={roles} />
      )}

      <div className="bg-white w-full">
        <div className="md:px-12 xl:px-24 2xl:px-64 mx-auto w-auto">
          {personnel?.status === Status.PENDING && (
            <NewApplicantBanner
              program={program}
              personnel={personnel}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && (
            <ProfileToggle
              personnel={personnel}
              roles={roles}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && (
            <RecommitmentProfileBanner personnel={personnel} program={program} />
          )}

          {personnel && <ProfileDetails />}
          {personnel && program === Program.EMCR && (
            <ProfileFunctions
              functions={functions}
              personnel={personnel}
              allowEditing={roles?.includes(Role.COORDINATOR) ?? false}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && <Scheduler personnel={personnel} />}

          {personnel && program === Program.BCWS && (
            <>
              <SectionsAndRoles
                personnel={personnel}
                bcwsRoles={bcwsRoles}
                allowEditing={roles?.includes(Role.COORDINATOR) ?? false}
                updatePersonnel={updatePersonnel}
              />
            </>
          )}
          {personnel && (
            <SkillsAndCertifications
              personnel={personnel}
              profileData={profileData}
              allowEditing={roles?.includes(Role.COORDINATOR) ?? false}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && (
            <ProfileNotes
              roles={roles}
              personnel={personnel}
              updatePersonnel={updatePersonnel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
