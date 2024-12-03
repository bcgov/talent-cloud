import type { MemberProfile } from '@/common';
import { MemberProfileDetails } from '../profile';

export const MemberProfileTab = ({
  personnel,
  profileData,
}: {
  personnel: MemberProfile;
  profileData: any;
}) => {
  return (
    <>
      <MemberProfileDetails profileData={profileData} personnel={personnel} />
    </>
  );
};
