import {
  ClockIcon,
  HomeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import type { Personnel } from '../dashboard';
import { Role, Status } from '@/common';
import { PersonnelStatus } from '@/components';
import { Toggle } from '@/components/toggle/Toggle';
import { differenceInDays, format } from 'date-fns';
import { offsetTimezoneDate } from '@/utils';
import { Route } from '../../providers';
import { NewApplicantBanner } from './NewApplicantBanner';
import { FireCentreName } from '../../common/enums/firecentre.enum';

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
  route,
  handleOpenReviewApplicant,
  updatePersonnel,
}: {
  personnel: Personnel;
  handleOpenReviewApplicant: () => void;
  route?: Route;
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

  const reviewItems = route === Route.EMCR ?
    [
      {
        key: 'Supervisor Approval',
        value: personnel.approvedBySupervisor,
      },
      {
        key: 'Completed ICS Training',
        value: personnel.icsTraining,
      },
    ]
    :
    [
      {
        key: 'Willingness Statement',
        value: personnel.willingnessStatement,
      },
      {
        key: 'Signed ParQ Questionnaire',
        value: personnel.parQ,
      },
      {
        key: 'Supervisor Approval',
        value: personnel.approvedBySupervisor,
      },
      {
        key: 'TEAMS Orientation',
        value: personnel.orientation,
      },
    ];
  return (
    <>
      <div className="px-10 float-left hidden lg:inline-block">
        <div className="w-32 h-32 grid rounded-full bg-primaryBlue justify-center content-center">
          <h1 className="text-white font-bold text-5xl">
            {personnel.firstName?.charAt(0)}
            {personnel.lastName?.charAt(0)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        {personnel.employeeId && <p className="px-2 text-xs text-gray-600">Employee #{personnel.employeeId}</p>}
        <div className="flex flex-row content-center items-start pl-8 lg:pl-0 space-y-6 py-12 h-auto lg:flex-row lg:space-y-0 lg:py-0 lg:items-center lg:pb-4">
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
                  {personnel.workLocation
                    ? `${personnel.workLocation?.locationName},
                  ${route === Route.EMCR ? personnel.workLocation?.region : FireCentreName[personnel.workLocation.fireCentre]}`
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
                  {route === Route.EMCR ? personnel.homeLocation?.region : FireCentreName[personnel.homeLocation.fireCentre]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        {personnel.status === Status.PENDING && 
          <NewApplicantBanner
            reviewItems={[
              {
                key: 'Willingness Statement',
                value: personnel.willingnessStatement,
              },
              {
                key: 'Signed ParQ Questionnaire',
                value: personnel.parQ,
              },
              {
                key: 'Supervisor Approval',
                value: personnel.approvedBySupervisor,
              },
              {
                key: 'TEAMS Orientation',
                value: personnel.orientation,
              },
            ]}
            route={route}
            handleOpenReviewApplicant={handleOpenReviewApplicant}
          />
        // (
        //   <Banner
        //     content={
        //       <p className="flex flex-col text-sm text-warningDark">
        //         <span className="font-bold">Complete Review Alert</span>
        //         <span className="pt-2">
        //           {personnel.icsTraining === true &&
        //           personnel.approvedBySupervisor === true
        //             ? 'This applicant fulfilled the following requirements for profile review:'
        //             : 'This applicant is missing the following requirements to complete their profile review:'}
        //         </span>
        //         <span className="pl-2 flex flex-row">
        //           {personnel.approvedBySupervisor === true ? (
        //             <CheckIcon className="h-5 text-calGreenTwo" />
        //           ) : (
        //             <XMarkIcon className="h-5 text-errorRed" />
        //           )}
        //           Supervisor Approval
        //         </span>
        //         <span className="pl-2 flex flex-row">
        //           {personnel.icsTraining === true ? (
        //             <CheckIcon className="h-5 text-calGreenTwo" />
        //           ) : (
        //             <XMarkIcon className="h-5 text-errorRed" />
        //           )}
        //           Completed ICS Training
        //         </span>
        //         {personnel.icsTraining === true &&
        //         personnel.approvedBySupervisor === true ? (
        //           <span>
        //             Please Review the following details before clicking
        //             &apos;Complete Review&apos;.
        //           </span>
        //         ) : (
        //           <span>
        //             Please make sure to update the information above in{' '}
        //             <span className="font-bold">Applicant Details</span> before
        //             changing the applicant&apos;s status to &apos;Active&apos;.
        //           </span>
        //         )}
        //       </p>
        //     }
        //     onClick={
        //       personnel.icsTraining === true &&
        //       personnel.approvedBySupervisor === true
        //         ? handleOpenReviewApplicant
        //         : undefined
        //     }
        //     buttonText={'Complete Review'}
        //     type={BannerType.WARNING}
        //   />
        // )
      }
      {role === Role.COORDINATOR && personnel.status !== Status.PENDING && (
        <div className="px-6 pb-12 bg-white w-full pt-4 lg:pl-48 ">
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
          </div>
        )}
    </>
  );
};

export default ProfileHeader;
