import { Program, Status } from '@/common';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { Tools } from '@/common/enums/tools.enum';
import { ToolsName, ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { Personnel } from '@/common';
import { datePST, formatPhone } from '@/utils';
import { FireCentreName } from '../common/enums/firecentre.enum';
import type { TravelPreference } from '../common/enums/travel-preference.enum';
import { TravelPreferenceText } from '../common/enums/travel-preference.enum';
import type { DriverLicense } from '../common/enums/driver-license.enum';
import { DriverLicenseName } from '../common/enums/driver-license.enum';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { format, formatDate } from 'date-fns';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';

const formatDriversLicenses = (driverLicenses: string[]): string => {
  const licensesFormatted = driverLicenses.map(
    (l) => DriverLicenseName[l as keyof typeof DriverLicense],
  );
  return licensesFormatted.join(', ');
};

export const emcrData = (personnel?: Personnel) => {
  return {
    generalInformation: [
      {
        title: 'Work Location, Region',
        content: personnel?.workLocation?.locationName
          ? `${personnel?.workLocation?.locationName}, ${personnel?.workLocation?.region}`
          : 'Not Listed',
      },
      {
        title: 'Home Location, Region',
        content: `${personnel?.homeLocation.locationName}, ${personnel?.homeLocation.region}`,
      },
      {
        title: 'Travel Preference',
        content:
          TravelPreferenceText[
            personnel?.travelPreference as keyof typeof TravelPreference
          ],
      },
      {
        title: "Driver's License",
        content: `${personnel?.driverLicense ? formatDriversLicenses(personnel.driverLicense) : '-'}`,
      },
      {
        title: 'Application Date',
        content: personnel?.dateApplied
          ? datePST(personnel?.dateApplied as Date)
          : '-',
      },
      {
        title: 'Employee ID',
        content: personnel?.employeeId,
      },
      { title: 'Paylist (Dept ID)', content: personnel?.paylistId },
      {
        title: 'Emergency Contact First Name',
        content: personnel?.emergencyContactFirstName ?? 'Not Listed',
      },
      {
        title: 'Emergency Contact Last Name',
        content: personnel?.emergencyContactLastName ?? 'Not Listed',
      },
      {
        title: 'Emergency Phone Number',
        content: formatPhone(personnel?.emergencyContactPhoneNumber) ?? 'Not Listed',
      },
      personnel?.status === Status.PENDING
        ? {
            title: 'ICS Training',
            content: personnel?.icsTraining === true ? 'Completed' : 'Incomplete',
          }
        : {
            title: 'Reviewed Date',
            content: personnel?.dateApproved
              ? datePST(personnel?.dateApproved as Date)
              : '-',
          },
    ],
    contact: [
      {
        title: 'Primary Number',
        content: formatPhone(personnel?.primaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Secondary Number',
        content: formatPhone(personnel?.secondaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Work Phone',
        content: formatPhone(personnel?.workPhone) ?? 'Not Listed',
      },
      { title: 'Email Address', content: personnel?.email },
    ],
    organizational: [
      { title: 'Supervisor First Name', content: personnel?.supervisorFirstName },
      { title: 'Supervisor Last Name', content: personnel?.supervisorLastName },
      {
        title: 'Supervisor Email',
        content: personnel?.supervisorEmail ?? 'Not Listed',
      },
      { title: 'Ministry', content: personnel?.ministry },
      { title: 'Union Membership', content: personnel?.unionMembership },
      {
        title: 'Supervisor Approval',
        content:
          personnel?.approvedBySupervisor === true ? 'Received' : 'Not Received',
      },
    ],
    skills: [
      {
        title: 'Languages',
        header: 'Language',
        subheader: 'Proficiency Level',
        itms: personnel?.languages?.map((l) => ({
          label: l.language,
          value: LanguageProficiencyName[l.level],
        })),
      },
      {
        title: 'Tools',
        header: 'Skill',
        subheader: 'Proficiency Level',
        itms: personnel?.tools?.map((t) => ({
          label: ToolsName[t.tool as keyof typeof Tools],
          value: ToolsProficiencyName[t.proficiencyLevel],
        })),
      },
      {
        title: 'Certifications',
        header: 'Name',
        subheader: 'Expiry Date',
        itms: personnel?.certifications?.map((c) => ({
          label: c.name,
          value: c.expiry,
        })),
      },
    ],
  };
};

export const bcwsData = (personnel?: Personnel) => {
  return {
    intakeRequirements:
      personnel?.status === Status.PENDING
        ? [
            {
              title: 'Willingness Statement',
              content:
                personnel?.willingnessStatement === true ? (
                  <span className="flex flex-row items-center space-x-2 text-success">
                    <CheckCircleIcon className="w-6 h-6" /> <span>Received</span>
                  </span>
                ) : (
                  <span className="flex flex-row items-center space-x-2 text-error">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <span>Not yet received</span>
                  </span>
                ),
            },
            {
              title: 'ParQ',
              content:
                personnel?.parQ === true ? (
                  <span className="flex flex-row items-center space-x-2 text-success">
                    <CheckCircleIcon className="w-6 h-6" /> <span>Received</span>
                  </span>
                ) : (
                  <span className="flex flex-row items-center space-x-2 text-error">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <span>Not yet received</span>
                  </span>
                ),
            },
            {
              title: 'TEAMS Orientation',
              content:
                personnel?.orientation === true ? (
                  <span className="flex flex-row items-center space-x-2 text-success">
                    <CheckCircleIcon className="w-6 h-6" /> <span>Completed</span>
                  </span>
                ) : (
                  <span className="flex flex-row items-center space-x-2 text-error">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <span>Incomplete</span>
                  </span>
                ),
            },
          ]
        : undefined,
    generalInformation: [
      {
        title: 'Date Applied',
        content: personnel?.dateApplied
          ? datePST(personnel?.dateApplied as Date, true)
          : '-',
      },
      {
        title: 'Home Location, Fire Centre',
        content: personnel?.homeLocation
          ? `${personnel.homeLocation.locationName}, ${FireCentreName[personnel.homeLocation.fireCentre]}`
          : 'Not Listed',
      },
      {
        title: 'Work Location, Fire Centre',
        content: personnel?.workLocation
          ? `${personnel.workLocation.locationName}, ${FireCentreName[personnel.workLocation.fireCentre]}`
          : 'Not Listed',
      },
      {
        title: 'Travel Preference',
        content:
          TravelPreferenceText[
            personnel?.travelPreference as keyof typeof TravelPreference
          ],
      },
      {
        title: 'Purchase Card Holder',
        content:
          personnel?.purchaseCardHolder === true ? (
            <span className="text-success">Yes</span>
          ) : (
            <span className="text-errorRed">No</span>
          ),
      },
      {
        title: "Driver's License",
        content: `${personnel?.driverLicense ? formatDriversLicenses(personnel.driverLicense) : '-'}`,
      },
      {
        title: 'Employee ID',
        content: personnel?.employeeId,
      },
      { title: 'Paylist (Dept ID)', content: personnel?.paylistId },
    ],
    contact: [
      {
        title: 'Primary Number',
        content: formatPhone(personnel?.primaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Secondary Number',
        content: formatPhone(personnel?.secondaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Work Number',
        content: formatPhone(personnel?.workPhone) ?? 'Not Listed',
      },
      { title: 'Govt. Email', content: personnel?.email },
      {
        title: 'Emergency Contact First Name',
        content: personnel?.emergencyContactFirstName ?? 'Not Listed',
      },
      {
        title: 'Emergency Contact Last Name',
        content: personnel?.emergencyContactLastName ?? 'Not Listed',
      },
      {
        title: 'Emergency Phone Number',
        content: formatPhone(personnel?.emergencyContactPhoneNumber) ?? 'Not Listed',
      },
    ],
    organizational: [
      { title: 'Supervisor First Name', content: personnel?.supervisorFirstName },
      { title: 'Supervisor Last Name', content: personnel?.supervisorLastName },
      {
        title: 'Supervisor Email',
        content: personnel?.supervisorEmail ?? 'Not Listed',
      },
      {
        title: 'Supervisor Approval',
        content:
          personnel?.approvedBySupervisor === true ? (
            <span className="text-success">Received</span>
          ) : (
            <span className="text-errorRed">Not yet Received</span>
          ),
      },
      {
        title: 'Ministry',
        content: `${personnel?.ministry}`,
      },
      {
        title: 'Division',
        content: `${personnel?.division ?? 'Not Listed'}`,
      },
      { title: 'Union Membership', content: personnel?.unionMembership },
      { title: 'Paylist (Dept ID)', content: personnel?.paylistId },
      {
        title: 'Liaison First Name',
        content: personnel?.liaisonFirstName ?? 'Not Listed',
      },
      {
        title: 'Liaison Last Name',
        content: personnel?.liaisonLastName ?? 'Not Listed',
      },
      {
        title: 'Liaison Phone Number',
        content: formatPhone(personnel?.liaisonPhoneNumber) ?? 'Not Listed',
      },
      { title: 'Liaison Email', content: personnel?.liaisonEmail ?? 'Not Listed' },
    ],
    skills: [
      {
        title: 'Languages',
        header: 'Language',
        subheader: 'Proficiency Level',
        itms: personnel?.languages?.map((l) => ({
          label: l.language,
          value: LanguageProficiencyName[l.level],
        })),
      },
      {
        title: 'Tools',
        header: 'Skill',
        subheader: 'Proficiency Level',
        itms: personnel?.tools?.map((t) => ({
          label: ToolsName[t.tool as keyof typeof Tools],
          value: ToolsProficiencyName[t.proficiencyLevel],
        })),
      },
      {
        title: 'Certifications',
        header: 'Name',
        subheader: 'Expiry Date',
        itms: personnel?.certifications?.map((c) => ({
          label: c.name,
          value: c.expiry,
        })),
      },
    ],
  };
};
const renderRecommitmentStatus = (
  recommitmentStatus: RecommitmentStatus,
  isRecommitmentCycleOpen?: boolean,
) => {
  switch (recommitmentStatus) {
    case RecommitmentStatus.SUPERVISOR_APPROVED:
      return (
        <span className="bg-infoBannerLight px-2 rounded-full ml-2">
          Recommitted
        </span>
      );

    case RecommitmentStatus.MEMBER_NO_RESPONSE:
    case RecommitmentStatus.SUPERVISOR_NO_RESPONSE:
      return (
        <span className="bg-errorBannerLight px-2 rounded-full ml-2 text-error">
          Missed Deadline
        </span>
      );
    case RecommitmentStatus.MEMBER_DENIED:
    case RecommitmentStatus.SUPERVISOR_DENIED:
      return (
        <span className="bg-errorBannerLight px-2 rounded-full ml-2 text-error">
          Not Returning
        </span>
      );
    case RecommitmentStatus.MEMBER_COMMITTED:
      return (
        <span className="bg-warningBannerLight px-2 rounded-full ml-2">
          Pending Approval
        </span>
      );

    case RecommitmentStatus.PENDING:
      if (!isRecommitmentCycleOpen) {
        return (
          <span className="bg-warningBannerLight px-2 rounded-full ml-2">
            Reactivated
          </span>
        );
      } else {
        return (
          <span className="bg-infoBannerLight px-2 rounded-full ml-2">Pending</span>
        );
      }
  }
};
const getMembershipDetails = (personnel: Personnel) => {
  const bcwsStatus = personnel?.recommitment?.find(
    (itm) => itm.program === Program.BCWS,
  )?.status;

  const emcrStatus = personnel?.recommitment?.find(
    (itm) => itm.program === Program.EMCR,
  )?.status;

  const supervisorDecisionDateBcws = personnel?.recommitment?.find(
    (itm) => itm.program === Program.BCWS,
  )?.supervisorDecisionDate;

  const supervisorDecisionDateEmcr = personnel?.recommitment?.find(
    (itm) => itm.program === Program.EMCR,
  )?.supervisorDecisionDate;

  const bcwsMembership = personnel?.recommitment?.find(
    (itm) => itm.program === Program.BCWS,
  ) && [
    {
      title: 'Program',
      content: Program.BCWS.toUpperCase(),
    },
    {
      title: 'Status',
      content: bcwsStatus && renderRecommitmentStatus(bcwsStatus, true),
    },
    {
      title: 'Annual Recommitment',
      content:
        bcwsStatus === RecommitmentStatus.SUPERVISOR_APPROVED &&
        supervisorDecisionDateBcws
          ? `Returned ${format(supervisorDecisionDateBcws, 'yyyy-MM-dd')}`
          : '--',
    },
    {
      title: 'Member since',
      content: personnel?.bcws?.dateApproved
        ? formatDate(personnel?.bcws?.dateApproved, 'yyyy-MM-dd')
        : '--',
    },
  ];

  const emcrMembership = personnel?.recommitment?.find(
    (itm) => itm.program === Program.EMCR,
  ) && [
    {
      title: 'Program',
      content: Program.EMCR.toUpperCase(),
    },
    {
      title: 'Status',
      content: emcrStatus && renderRecommitmentStatus(emcrStatus, true),
    },

    {
      title: 'Annual Recommitment',
      content:
        emcrStatus === RecommitmentStatus.SUPERVISOR_APPROVED &&
        supervisorDecisionDateEmcr
          ? `Returned ${format(supervisorDecisionDateEmcr, 'yyyy-MM-dd')}`
          : '--',
    },
    {
      title: 'Member since',
      content: personnel?.emcr?.dateApproved
        ? formatDate(personnel?.emcr?.dateApproved, 'yyyy-MM-dd')
        : '--',
    },
  ];
  if (bcwsMembership && !emcrMembership) {
    return bcwsMembership;
  } else if (!bcwsMembership && emcrMembership) {
    return emcrMembership;
  } else if (bcwsMembership && emcrMembership) {
    return [...bcwsMembership, ...emcrMembership];
  }
  return [];
};

export const memberData = (personnel?: Personnel) => {
  return {
    generalInformation: [
      {
        title: 'Home Location/Region',
        content: personnel?.homeLocation
          ? `${personnel.homeLocation.locationName}, ${FireCentreName[personnel.homeLocation.fireCentre]}`
          : 'Not Listed',
      },
      {
        title: 'Work Location/Region',
        content: personnel?.workLocation
          ? `${personnel.workLocation.locationName}, ${FireCentreName[personnel.workLocation.fireCentre]}`
          : 'Not Listed',
      },
      {
        title: 'Travel Preference',
        content:
          TravelPreferenceText[
            (personnel?.bcws?.travelPreference ||
              personnel?.emcr?.travelPreference) as keyof typeof TravelPreference // DO SOMETHING?
          ],
      },
      {
        title: "Driver's License Classification",
        content: `${personnel?.driverLicense ? formatDriversLicenses(personnel.driverLicense) : '-'}`,
      },
      {
        title: 'Employee ID',
        content: personnel?.employeeId,
      },
      { title: 'Paylist (Dept ID)', content: personnel?.paylistId },
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
      },
      {
        title: 'Supervisor Email',
        content: personnel?.supervisorEmail ?? '--',
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
      },
      {
        title: 'Division',
        content: `${personnel?.division ?? 'Not Listed'}`,
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

    skills: [
      {
        title: 'Languages',
        header: 'Language',
        subheader: 'Proficiency Level',
        itms: personnel?.languages?.map((l) => ({
          label: l.language,
          value: LanguageProficiencyName[l.level],
        })),
      },
      {
        title: 'Tools',
        header: 'Skill',
        subheader: 'Proficiency Level',
        itms: personnel?.tools?.map((t) => ({
          label: ToolsName[t.tool as keyof typeof Tools],
          value: ToolsProficiencyName[t.proficiencyLevel],
        })),
      },
      {
        title: 'Certifications',
        header: 'Name',
        subheader: 'Expiry Date',
        itms: personnel?.certifications?.map((c) => ({
          label: c.name,
          value: c.expiry,
        })),
      },
    ],
  };
};
