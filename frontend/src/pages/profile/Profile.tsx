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
  Button,
} from '@/components';
import { useState } from 'react';
import { Status, Role, Program, ButtonTypes } from '@/common';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';
import { ProfileBreadcrumbs, ProfileToggle } from '@/components/profile/common';
import { useRoleContext } from '@/providers';
import { RecommitmentDetails } from '@/components/profile/details/RecommitmentDetails';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { RecommitmentStatus } from '../../common/enums/recommitment-status';
import { RecommitmentConfirmation } from './RecommitmentConfirmation';

const Profile = () => {
  const { loading, roles, personnel, updatePersonnel, profileData, fetch } =
    usePersonnel();
  const { program } = useRoleContext();
  const { functions, bcwsRoles } = useProgramFieldData(program);
  const {
    isRecommitmentCycleOpen,
    isRecommitmentReinitiationOpen,
    updateRecommitment,
  } = useRecommitmentCycle();
  const [confirmReinitiateOpen, setConfirmReinitiateOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const recommitmentStatusText = () => {
    const recommitment = personnel?.recommitment?.find(
      (r) => r.year === new Date().getFullYear(),
    );
    if (!recommitment) {
      return 'Was inactive before start of recommitment cycle.';
    }
    if (
      [
        RecommitmentStatus.MEMBER_NO_RESPONSE,
        RecommitmentStatus.SUPERVISOR_NO_RESPONSE,
      ].includes(recommitment.status)
    ) {
      return 'Recommitment deadline missed by member or their supervisor.';
    }
    if (
      [
        RecommitmentStatus.MEMBER_DENIED,
        RecommitmentStatus.SUPERVISOR_DENIED,
      ].includes(recommitment.status)
    ) {
      return 'Member or their supervisor denied recommitment.';
    }
    if (recommitment.status === RecommitmentStatus.PENDING) {
      return 'Awaiting member decision on recommitment.';
    }
    return '';
  };

  const reinitiateRecommitment = async () => {
    const decision =
      program === Program.BCWS
        ? {
            bcws: {
              program: Program.BCWS,
              year: new Date().getFullYear(),
              status: RecommitmentStatus.PENDING,
              reason: '',
            },
          }
        : {
            emcr: {
              program: Program.EMCR,
              year: new Date().getFullYear(),
              status: RecommitmentStatus.PENDING,
              reason: '',
            },
          };
    await updateRecommitment(personnel!.id, decision);
    fetch();
    setConfirmReinitiateOpen(false);
  };

  return (
    <div
      className={`min-h-screen    w-full overflow-x-hidden lg:px-32 xl:px-32 2xl:px-64`}
    >
      <div
        className={`${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} pt-32`}
      >
        {personnel && <ProfileBreadcrumbs personnel={personnel} />}

        {personnel && (
          <ProfileHeader personnel={personnel} program={program} roles={roles} />
        )}
      </div>

      <div className="bg-white w-full">
        <div className="mx-auto w-auto">
          {personnel?.status === Status.PENDING && (
            <NewApplicantBanner
              program={program}
              personnel={personnel}
              updatePersonnel={updatePersonnel}
            />
          )}
          {personnel && (
            <div className="flex flex-row pt-4 pb-12 bg-white gap-12">
              {personnel.status === Status.INACTIVE &&
                isRecommitmentReinitiationOpen && <p>{recommitmentStatusText()}</p>}
              {personnel.status === Status.INACTIVE &&
                isRecommitmentReinitiationOpen && (
                  <Button
                    variant={ButtonTypes.PRIMARY}
                    text="Restart Recommitment"
                    onClick={() => setConfirmReinitiateOpen(true)}
                    disabled={
                      personnel.recommitment?.find(
                        (r) => r.year === new Date().getFullYear(),
                      )?.status === RecommitmentStatus.PENDING
                    }
                  />
                )}
              <ProfileToggle
                personnel={personnel}
                roles={roles}
                updatePersonnel={updatePersonnel}
                disabled={isRecommitmentCycleOpen}
              />
            </div>
          )}
          {personnel && <RecommitmentDetails />}
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
      <RecommitmentConfirmation
        open={confirmReinitiateOpen}
        handleOpen={() => setConfirmReinitiateOpen(!confirmReinitiateOpen)}
        onClose={() => setConfirmReinitiateOpen(false)}
        onConfirm={reinitiateRecommitment}
      />
    </div>
  );
};

export default Profile;
