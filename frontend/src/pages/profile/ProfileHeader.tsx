import { Button } from '@material-tailwind/react';
import { HomeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import type { Personnel } from '../dashboard';
import { Role } from '@/common';
import { PersonnelStatus } from '@/components';

function HorizontalLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={1}
      stroke="gray"
      className="h-10 w-10"
    >
      <path id="triangle" d="M1 5 L0 35" />
    </svg>
  );
}

const ProfileHeader = ({
  personnel,
  role,
}: {
  personnel: Personnel;
  role?: Role;
}) => {
  return (
    <div className="flex items-center flex-row pb-2 pr-12">
      <div className="flex items-center pr-12">
        <h2 className="font-semibold">
          {personnel.firstName} {personnel.lastName}
        </h2>
        {role === Role.COORDINATOR && (
          <div className="pl-4">
            <PersonnelStatus status={personnel.status} />
          </div>
        )}
      </div>
      <div>
        <HorizontalLine />
      </div>
      <div className="pl-16">
        <div className="flex flex-row">
          <MapPinIcon className="h-7 w-7" />
          <div className="pl-2">
            <p className="text-textGray">Work Location</p>
            <p>
              {personnel.workLocation}, {personnel.region}
            </p>
          </div>
        </div>
      </div>
      <div className="pl-12 grow">
        <div className="flex flex-row">
          <HomeIcon className="h-7 w-7" />
          <div className="pl-2">
            <p className="text-textGray">Home Location</p>
            <p>
              {personnel.workLocation}
              {/* TODO: When Home Location is made on backend, use this */}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button
          placeholder="Edit Info"
          className="bg-primaryBlue font-thin capitalize text-base"
        >
          Edit Info
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
