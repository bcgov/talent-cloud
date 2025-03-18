import type { Member } from '@/common';
import { RegionName, FireCentreName } from '@/common';
import type {
  BcwsTravelPreference,
  EmcrTravelPreference,
} from '@/common/enums/travel-preference.enum';
import { TravelPreferenceText } from '@/common/enums/travel-preference.enum';
import { formatPhone } from '@/utils';
import {
  formatDriversLicenses,
  getMembershipDetails,
  skillsData,
} from './commonProfileData';
import { QuestionIcon } from '../components/ui/Icons';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export const memberData = (personnel?: Member) => {
  let homeLocationTitle;
  let workLocationTitle;
  let homeLocation;
  let workLocation;
  if (personnel?.bcws && personnel?.emcr) {
    homeLocationTitle = 'Home Location/Region/Fire Centre';
    workLocationTitle = 'Work Location/Region/Fire Centre';
    homeLocation = personnel?.homeLocation
      ? `${personnel.homeLocation.locationName} / ${RegionName[personnel.homeLocation.region]} / ${FireCentreName[personnel.homeLocation.fireCentre]}`
      : 'Not Listed';
    workLocation = personnel?.workLocation
      ? `${personnel.workLocation.locationName} / ${RegionName[personnel.workLocation.region]} / ${FireCentreName[personnel.workLocation.fireCentre]}`
      : 'Not Listed';
  } else if (personnel?.bcws) {
    homeLocationTitle = 'Home Location/Fire Centre';
    workLocationTitle = 'Work Location/Fire Centre';
    homeLocation = personnel?.homeLocation
      ? `${personnel.homeLocation.locationName} / ${FireCentreName[personnel.homeLocation.fireCentre]}`
      : 'Not Listed';
    workLocation = personnel?.workLocation
      ? `${personnel.workLocation.locationName} / ${FireCentreName[personnel.workLocation.fireCentre]}`
      : 'Not Listed';
  } else {
    homeLocationTitle = 'Home Location/Region';
    workLocationTitle = 'Work Location/Region';
    homeLocation = personnel?.homeLocation
      ? `${personnel.homeLocation.locationName} / ${RegionName[personnel.homeLocation.region]}`
      : 'Not Listed';
    workLocation = personnel?.workLocation
      ? `${personnel.workLocation.locationName} / ${RegionName[personnel.workLocation.region]}`
      : 'Not Listed';
  }
  return {
    generalInformation: [
      {
        title: homeLocationTitle,
        content: homeLocation,
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon
            className={`w-5 h-5 ${personnel?.chipsIssues?.['workLocation'] ? 'text-red-700' : 'text-info'}`}
          />
        ),
        tooltipTitle: personnel?.chipsIssues?.['workLocation'],
      },
      {
        title: workLocationTitle,
        content: workLocation,
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon
            className={`w-5 h-5 ${personnel?.chipsIssues?.['homeLocation'] ? 'text-red-700' : 'text-info'}`}
          />
        ),
        tooltipTitle: personnel?.chipsIssues?.['homeLocation'],
      },
      {
        title: 'Travel Preference BCWS',
        content:
          TravelPreferenceText[
            personnel?.bcws?.travelPreference as keyof typeof BcwsTravelPreference // DO SOMETHING?
          ],
      },
      {
        title: 'Travel Preference EMCR',
        content:
          TravelPreferenceText[
            personnel?.emcr?.travelPreference as keyof typeof EmcrTravelPreference // DO SOMETHING?
          ],
      },
      {
        title: "Driver's License Classification",
        content: `${personnel?.driverLicense ? formatDriversLicenses(personnel.driverLicense) : '-'}`,
      },
      {
        title: 'Employee ID',
        content: personnel?.employeeId,
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon className="text-info w-5 h-5" />
        ),
      },
      {
        title: 'Paylist (Dept ID)',
        content: personnel?.paylistId,
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon className="text-info w-5 h-5" />
        ),
      },
    ],
    contact: [
      {
        title: 'Primary Number',
        content: formatPhone(personnel?.primaryPhone) ?? '--',
      },
      {
        title: 'Secondary Number',
        content: formatPhone(personnel?.secondaryPhone) ?? '--',
      },
      {
        title: 'Work Phone',
        content: formatPhone(personnel?.workPhone) ?? '--',
      },
      { title: 'Email Address', content: personnel?.email },
    ],
    organizational: [
      {
        title: 'Supervisor Name',
        content:
          personnel?.supervisorFirstName && personnel?.supervisorLastName
            ? `${personnel?.supervisorFirstName} ${personnel?.supervisorLastName}`
            : '--',
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon className="text-info w-5 h-5" />
        ),
      },
      {
        title: 'Supervisor Email',
        content: personnel?.supervisorEmail ?? '--',
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon className="text-info w-5 h-5" />
        ),
      },
      {
        title: 'Supervisor Phone Number',
        content: formatPhone(personnel?.supervisorPhone) ?? '--',
      },
      { title: 'Union Membership', content: personnel?.unionMembership },
      {
        title: 'Liaison Name',
        content:
          personnel?.bcws?.liaisonFirstName && personnel?.bcws?.liaisonLastName
            ? `${personnel?.bcws?.liaisonFirstName} ${personnel?.bcws?.liaisonLastName}`
            : '--',
        tooltipIcon: <QuestionIcon />,
        tooltipTitle: 'How can I find my liaison?',
        tooltipContent: (
          <div className="py-2">
            <div className="flex flex-col gap-y-4 px-8 py-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                If you are unsure who your liaison is, please reach out to your
                supervisor or manager.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                For more information on liaisons, please reach out to your Fire
                Centre, or refer to the{' '}
                <a
                  href="https://intranet.gov.bc.ca/assets/intranet/bcws-intranet/wildfire-teams/documents/core_team_guidelines.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  CORE Team Guidelines
                </a>
                . Note that this should not be confused with the Liaison section in a
                PECC/PREOC.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                You do NOT need to provide liaison information if you are only a
                member of EMCR.
              </p>
            </div>
          </div>
        ),
      },
      { title: 'Liaison Email', content: personnel?.bcws?.liaisonEmail ?? '--' },
      {
        title: 'Ministry',
        content: `${personnel?.ministry}`,
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon className="text-info w-5 h-5" />
        ),
        tooltipTitle: personnel?.chipsIssues?.['ministry'],
      },
      {
        title: 'Division',
        content: `${personnel?.division ?? 'Not Listed'}`,
        tooltipIcon: !personnel?.chipsProfileMissing && (
          <ExclamationCircleIcon className="text-info w-5 h-5" />
        ),
      },
    ],
    emergency: [
      {
        title: 'Emergency Contact Name',
        content:
          personnel?.emergencyContactFirstName && personnel?.emergencyContactLastName
            ? `${personnel?.emergencyContactFirstName} ${personnel?.emergencyContactLastName}`
            : '--',
      },
      {
        title: 'Emergency Contact Number',
        content: formatPhone(personnel?.emergencyContactPhoneNumber) ?? '--',
      },
      {
        title: 'Relationship',
        content: personnel?.emergencyContactRelationship,
      },
    ],
    membership: personnel && getMembershipDetails(personnel),

    skills: personnel && skillsData(personnel),
  };
};
