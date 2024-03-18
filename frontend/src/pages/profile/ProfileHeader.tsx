import { ClockIcon, HomeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import type { Personnel } from '../dashboard';
import { Role, Status } from '@/common';
import { PersonnelStatus } from '@/components';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { Toggle } from '@/components/toggle/Toggle';
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

const ProfileHeader = ({
  personnel,
  role,
  handleOpenReviewApplicant,
  updatePersonnel,
}: {
  personnel: Personnel;
  handleOpenReviewApplicant: () => void;
  role?: Role;
  updatePersonnel: (personnel: Partial<Personnel>) => void;
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
      <div className="px-10 float-left hidden lg:inline-block">
        <div className="w-32 h-32 grid rounded-full bg-blue justify-center content-center">
          <h1 className="text-white font-bold text-5xl">
            {personnel.firstName?.charAt(0)}
            {personnel.lastName?.charAt(0)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start pl-8 lg:pl-0 space-y-6 py-12 h-auto lg:flex-row lg:space-y-0 lg:py-0 lg:items-center lg:pb-4">
        <h2 className="font-semibold px-2">
          {personnel.firstName} {personnel.lastName}
        </h2>
        {role === Role.COORDINATOR && (
          <span>
            <PersonnelStatus status={personnel?.status} />
          </span>
        )}

        <div className="hidden lg:flex lg:px-6 xl:px-12">
          <HorizontalLine />
        </div>

        <div className="flex flex-col space-y-6  lg:space-y-0 lg:flex-row lg:space-x-16 xl:space-x-24">
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
                {personnel.workLocation?.locationName ?? '-'},{' '}
                {personnel.workLocation?.region ?? '-'}
              </p>
            </div>
          </div>

          <div className="flex flex-row">
            <HomeIcon className="h-7 w-7 text-defaultGray" />
            <div className="pl-2">
              <p className="subtext">Home Location</p>
              <p>
                {personnel.homeLocation.locationName},{' '}
                {personnel.homeLocation.region}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-12 bg-white w-full pt-4 lg:pl-48 ">
        {personnel.status === Status.PENDING && (
          <Banner
            content={
              <p className="flex flex-col lg:flex-row items-center text-center space-y-8 lg:space-y-0 text-sm text-warningDark">
                <span className="font-bold">Pending Applicant Alert: </span>
                <span className="pl-2">
                  This profile requires coordinator review to ensure deployment
                  readiness.
                </span>
              </p>
            }
            onClick={handleOpenReviewApplicant}
            buttonText={'Complete Review'}
            type={BannerType.WARNING}
          />
        )}
        {role === Role.COORDINATOR && personnel.status !== Status.PENDING && (
          <div className="flex flex-row justify-start md:items-center md:mr-12">
            <Toggle
              value={personnel.status === Status.ACTIVE}
              handleToggle={(checked: boolean) =>
                updatePersonnel({
                  status: checked ? Status.ACTIVE : Status.INACTIVE,
                })
              }
              label={`Switch to ${personnel.status === Status.ACTIVE ? 'Inactive' : 'Active'}`}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
