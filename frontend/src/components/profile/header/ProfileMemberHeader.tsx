import type { Personnel } from '@/common';
import { Role } from '@/common';
import { PersonnelStatus } from '@/components';

export const ProfileMemberHeader = ({
  personnel,
  role,
}: {
  personnel: Personnel;
  role?: Role;
}) => {
  return (
    <>
      <div className="px-8 float-left hidden lg:inline-block">
        <div className="w-32 h-32 grid rounded-full bg-primaryBlue justify-center content-center">
          <h1 className="text-white font-bold text-5xl">
            {personnel.firstName?.charAt(0)}
            {personnel.lastName?.charAt(0)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col content-center items-start pl-8 lg:pl-0 space-y-6 py-12 h-auto lg:flex-row lg:space-y-0 lg:py-0 lg:items-center lg:pb-4">
          <h2 className="font-semibold px-2">
            {personnel.firstName} {personnel.lastName}
          </h2>
          {role === Role.COORDINATOR && (
            <span>
              <PersonnelStatus status={personnel?.status} />
            </span>
          )}
        </div>
      </div>
    </>
  );
};
