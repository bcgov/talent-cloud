// common
import {
  DriverLicense,
  DriverLicenseName,
  Member,
  Personnel,
  Program,
} from '@/common';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';
import { ToolsName, Tools, ToolsProficiencyName } from '@/common/enums/tools.enum';

// util
import { format, formatDate } from 'date-fns';

export const formatDriversLicenses = (driverLicenses: string[]): string => {
  const licensesFormatted = driverLicenses.map(
    (l) => DriverLicenseName[l as keyof typeof DriverLicense],
  );
  return licensesFormatted.join(', ');
};
export const renderRecommitmentStatus = (
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

const emptyMembershipDetails = [
  {
    title: 'Program',
    content: '--',
  },
  {
    title: 'Status',
    content: '--',
  },
  {
    title: 'Annual Recommitment',
    content: '--',
  },
  {
    title: 'Member since',
    content: '--',
  },
];

export const getMembershipDetails = (personnel: Member) => {
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
  return emptyMembershipDetails;
};

export const skillsData = (personnel: Personnel | Member) => [
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
];
