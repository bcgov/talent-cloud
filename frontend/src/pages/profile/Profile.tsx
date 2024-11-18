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
} from '@/components';
import { Status, Role, Program } from '@/common';
import { useRoleContext } from '@/providers';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';
import { ProfileBreadcrumbs, ProfileToggle } from '@/components/profile/common';

const Profile = () => {
  const { role, program } = useRoleContext();

  const { personnel, updatePersonnel, profileData } = usePersonnel();

  const { functions, bcwsRoles } = useProgramFieldData(program);

  return (
    <div
      className={`min-h-screen pt-24  ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} w-full overflow-x-hidden`}
    >
      {personnel && <ProfileBreadcrumbs personnel={personnel} />}

      {personnel && (
        <ProfileHeader personnel={personnel} program={program} role={role} />
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
              role={role}
              updatePersonnel={updatePersonnel}
            />
          )}

          <ProfileDetails />
          {personnel && program === Program.EMCR && (
            <ProfileFunctions
              functions={functions}
              personnel={personnel}
              allowEditing={role === Role.COORDINATOR}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && <Scheduler name={personnel?.firstName} />}

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
          {personnel && (
            <ProfileNotes
              role={role}
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
