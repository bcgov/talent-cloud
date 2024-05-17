import { Status } from '@/common';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { Personnel } from '@/pages/dashboard';
import { datePST, formatPhone } from '@/utils';

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
        title: 'Remote Only',
        content: `${personnel?.remoteOnly === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Home Location, Region',
        content: `${personnel?.homeLocation.locationName}, ${personnel?.homeLocation.region}`,
      },
      {
        title: 'Willingness to Travel',
        content: `${personnel?.willingToTravel === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Application Date',
        content: personnel?.dateApplied
          ? datePST(personnel?.dateApplied as Date)
          : '-',
      },
      personnel?.status === Status.PENDING
        ? {
            title: 'ICS Training',
            content: personnel?.icsTraining === true ? 'Completed' : 'Incomplete',
          }
        : {
            title: 'Reviewed Date',
            content: personnel?.dateApproved
              ? datePST(personnel?.dateApproved)
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
      { title: 'Supervisor Email', content: personnel?.supervisorEmail ?? '-' },
      { title: 'Ministry', content: personnel?.ministry },
      { title: 'Union Membership', content: personnel?.unionMembership },
      {
        title: 'Supervisor Approval',
        content:
          personnel?.approvedBySupervisor === true ? 'Received' : 'Not Recieved',
      },
    ],
    skills: [],
  };
};
export const bcwsData = (personnel?: Personnel) => {
  return {
    generalInformation: [
      {
        title: 'Date Applied',
        content: personnel?.dateApplied
          ? datePST(personnel?.dateApplied as Date)
          : '-',
      },
      {
        title: 'Home Location, Fire Centre',
        content: `${personnel?.homeFireCentre?.locationName}, ${personnel?.homeFireCentre?.region}`,
      },
      {
        title: 'Work Location, Region',
        content: personnel?.workFireCentre
          ? `${personnel?.workFireCentre?.locationName}, ${personnel?.workFireCentre?.region}`
          : 'Not Listed',
      },
      {
        title: 'Remote Only',
        content: `${personnel?.remoteOnly === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Willingness to Travel',
        content: `${personnel?.willingToTravel === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Purchase Card Holder',
        content: `${personnel?.purchaseCardHolder === true ? 'Yes' : 'No'}`,
      },
      {
        title: "Driver's License",
        content: `${personnel?.driverLicense ? personnel?.driverLicense : '-'}`,
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
        title: 'Work Number',
        content: formatPhone(personnel?.workPhone) ?? 'Not Listed',
      },
      { title: 'Govt Email', content: personnel?.email },
      {
        title: 'Emergency Contactee',
        content:
          personnel?.emergencyContactFirstName && personnel?.emergencyContactLastName
            ? `${personnel?.emergencyContactFirstName} ${personnel?.emergencyContactLastName}`
            : '-',
      },
      {
        title: 'Emergency Phone Number',
        content: formatPhone(personnel?.emergencyContactPhoneNumber) ?? 'Not Listed',
      },
    ],
    organizational: [
      { title: 'Supervisor First Name', content: personnel?.supervisorFirstName },
      { title: 'Supervisor Last Name', content: personnel?.supervisorLastName },
      { title: 'Supervisor Email', content: personnel?.supervisorEmail ?? '-' },
      {
        title: 'Supervisor Approval',
        content: personnel?.approvedBySupervisor ? 'Recieved' : 'Not Recieved',
      },
      { title: 'Ministry/Branch', content: personnel?.ministry },
      { title: 'Union Membership', content: personnel?.unionMembership },
      { title: 'Paylist', content: personnel?.paylistId },
      { title: 'Liason First Name', content: personnel?.liaisonFirstName },
      { title: 'Liason Last Name', content: personnel?.liaisonLastName },
      {
        title: 'Liason Phone Number',
        content: formatPhone(personnel?.liaisonPhoneNumber) ?? 'Not Listed',
      },
      { title: 'Liason Email', content: personnel?.liaisonEmail ?? '-' },
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
          label: t.tool,
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
