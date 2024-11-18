import { ClockIcon, HomeIcon, MapPinIcon } from '@heroicons/react/24/solid';

import type { Personnel } from '@/common';
import { FireCentreName, Program, Role } from '@/common';
import { PersonnelStatus } from '@/components';
import { differenceInDays, format } from 'date-fns';
import { offsetTimezoneDate } from '@/utils';

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

export const ProfileHeader = ({
  personnel,
  role,
  program,
}: {
  personnel: Personnel;
  role?: Role;
  program?: Program;
}) => {
  const getLastDeployed = () => {
    if (personnel?.lastDeployed) {
      const difference = differenceInDays(
        offsetTimezoneDate(format(new Date(), 'yyyy-MM-dd')),
        offsetTimezoneDate(personnel.lastDeployed),
      );
      if (difference === 0) return 'Currently Deployed';
      else return `${difference} days ago`;
    }
    return '-';
  };

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
        {personnel.employeeId && (
          <p className="px-2 text-xs text-gray-600">
            Employee #{personnel.employeeId}
          </p>
        )}
        <div className="flex flex-col content-center items-start pl-8 lg:pl-0 space-y-6 py-12 h-auto lg:flex-row lg:space-y-0 lg:py-0 lg:items-center lg:pb-4">
          <h2 className="font-semibold px-2">
            {personnel.firstName} {personnel.lastName}
          </h2>
          {role === Role.COORDINATOR && (
            <span>
              <PersonnelStatus status={personnel?.status} />
            </span>
          )}

          <div className="hidden lg:flex lg:px-6">
            <HorizontalLine />
          </div>

          <div className="flex flex-col space-y-6  lg:space-y-0 lg:flex-row lg:space-x-12">
            <div className="flex flex-row">
              <ClockIcon className="h-7 w-7 text-defaultGray" />
              <div className="px-2">
                <p className="subtext">Last Deployed</p>
                <p>{getLastDeployed()}</p>
              </div>
            </div>
            <div className="flex flex-row">
              <MapPinIcon className="text-defaultGray h-7 w-7" />
              <div className="pl-2">
                <p className="subtext">Work Location</p>
                <p>
                  {personnel.workLocation
                    ? `${personnel.workLocation?.locationName},
                  ${program === Program.EMCR ? personnel.workLocation?.region : FireCentreName[personnel.workLocation.fireCentre]}`
                    : '-'}
                </p>
              </div>
            </div>

            <div className="flex flex-row">
              <HomeIcon className="h-7 w-7 text-defaultGray" />
              <div className="pl-2">
                <p className="subtext">Home Location</p>
                <p>
                  {personnel.homeLocation.locationName},{' '}
                  {program === Program.EMCR
                    ? personnel.homeLocation?.region
                    : FireCentreName[personnel.homeLocation.fireCentre]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
