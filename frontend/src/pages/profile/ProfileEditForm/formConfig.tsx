import { Status } from '@/common';
import type { Personnel, Location, DivisionType } from '@/pages/dashboard';
import {
  fields,
  bcwsProfileValidationSchema,
  emcrPendingValidationSchema,
  bcwsPendingValidationSchema,
  emcrValidationSchema,
} from '@/pages/profile/ProfileEditForm/constants';
import { datePST } from '@/utils';
import { Route } from '@/providers';

export const formConfig = (
  personnelData: Partial<Personnel>,
  locations: Location[],
  divisions: DivisionType[],
  route: Route,
) => {
  delete personnelData?.availability;
  delete personnelData?.experiences;

  const personnel = {
    ...personnelData,
    primaryPhone:
      personnelData?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
      '',
    secondaryPhone:
      personnelData.secondaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
      '',
    workPhone:
      personnelData.workPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    dateApproved: datePST(personnelData.dateApproved as Date, true),
    liaisonPhoneNumber:
      personnelData.liaisonPhoneNumber?.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '($1) $2-$3',
      ) ?? '',
    emergencyContactPhoneNumber:
      personnelData.emergencyContactPhoneNumber?.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '($1) $2-$3',
      ) ?? '',
    dateApplied: datePST(personnelData.dateApplied as Date, true),
  };

  fields.homeLocation.locationName.options = locations.map((itm: Location) => ({
    label: itm.locationName,
    value: itm.locationName,
  }));
  fields.workLocation.locationName.options = locations.map((itm: Location) => ({
    label: itm.locationName,
    value: itm.locationName,
  }));
  fields.division.division.options = divisions.map((itm: DivisionType) => ({
    label: itm.divisionName,
    value: itm.divisionName,
  }));

  const bcwsSections = [
    {
      header: 'Intake Requirements',
      fields: [fields.willingnessStatement, fields.parQ, fields.orientation],
    },
    {
      header: 'General Information',
      fields: [
        fields.dateApplied,
        fields.dateApproved,
        fields.remoteOnly,
        fields.willingToTravel,
        fields.homeLocation.locationName,
        fields.homeLocation.fireCentre,

        fields.workLocation.locationName,
        fields.workLocation.fireCentre,

        fields.driverLicense,
        fields.purchaseCardHolder,
      ].filter((itm) =>
        personnel.status === Status.PENDING
          ? itm !== fields.dateApproved
          : itm !== fields.dateApplied,
      ),
    },
    {
      header: 'Contact Information',
      fields: [
        fields.primaryPhone,
        fields.secondaryPhone,
        fields.workPhone,
        fields.email,
        fields.emergencyContactFirstName,
        fields.emergencyContactLastName,
        fields.emergencyContactRelationship,
        fields.emergencyContactNumber,
      ],
    },
    {
      header: 'Organization Information',
      fields: [
        fields.supervisorFirstName,
        fields.supervisorLastName,
        fields.supervisorEmail,
        fields.approvedBySupervisor,
        fields.paylistId,
        fields.unionMembership,
        fields.division.division,
        fields.division.ministry,
        fields.liaisonFirstName,
        fields.liaisonLastName,
        fields.liaisonNumber,
        fields.liaisonEmail,
      ],
    },
  ];

  const emcrSections = [
    {
      header: 'Intake Requirements',
      fields: [fields.approvedBySupervisor, fields.icsTraining],
    },
    {
      header: 'General Information',
      fields: [
        fields.dateApplied,
        fields.dateApproved,
        fields.remoteOnly,
        fields.willingToTravel,
        fields.homeLocation.locationName,
        fields.homeLocation.region,

        fields.workLocation.locationName,
        fields.workLocation.region,
        fields.driverLicense,
      ].filter((itm) =>
        personnel.status === Status.PENDING
          ? itm !== fields.dateApproved
          : itm !== fields.dateApplied,
      ),
    },
    {
      header: 'Contact Information',
      fields: [fields.primaryPhone, fields.secondaryPhone, fields.email],
    },
    {
      header: 'Organization Information',
      fields: [
        fields.supervisorFirstName,
        fields.supervisorLastName,
        fields.supervisorEmail,
        fields.unionMembership,
        fields.ministry,
      ],
    },
  ];

  const initialFormValues = {
    dateApproved: personnel.dateApproved,
    homeLocation: personnel.homeLocation,
    workLocation: personnel.workLocation,
    remoteOnly: personnel.remoteOnly,
    willingToTravel: personnel.willingToTravel,
    primaryPhone: personnel.primaryPhone,
    secondaryPhone: personnel.secondaryPhone,
    workPhone: personnel.workPhone,
    supervisorFirstName: personnel.supervisorFirstName,
    supervisorLastName: personnel.supervisorLastName,
    supervisorEmail: personnel.supervisorEmail,
    unionMembership: personnel.unionMembership,
    driverLicense: personnel?.driverLicense,
    status: personnel.status,
    approvedBySupervisor: personnel.approvedBySupervisor,
    email: personnel.email,
  };

  const bcwsValues = {
    ...initialFormValues,
    purchaseCardHolder: personnel.purchaseCardHolder,
    paylistId: personnel.paylistId,
    liaisonFirstName: personnel.liaisonFirstName,
    liaisonLastName: personnel.liaisonLastName,
    liaisonNumber: personnel.liaisonPhoneNumber,
    liaisonEmail: personnel.liaisonEmail,
    division: personnel?.division,
    emergencyContactFirstName: personnel.emergencyContactFirstName,
    emergencyContactLastName: personnel.emergencyContactLastName,
    emergencyContactNumber: personnel.emergencyContactPhoneNumber,
    emergencyContactRelationship: personnel.emergencyContactRelationship,
    dateApplied: personnel.dateApplied,
  };

  const emcrPendingValues = {
    ...initialFormValues,
    dateApplied: personnel.dateApplied,
    icsTraining: personnel.icsTraining,
  };
  const bcwsPendingValues = {
    ...bcwsValues,
    parQ: personnel.parQ,
    willingnessStatement: personnel.willingnessStatement,
    orientation: personnel.orientation,

    dateApplied: personnel.dateApplied,
  };
  if (route === Route.BCWS) {
    if (personnel.status === Status.PENDING) {
      return {
        sections: bcwsSections,
        validationSchema: bcwsPendingValidationSchema,
        initialValues: bcwsPendingValues,
      };
    } else {
      return {
        sections: bcwsSections.filter((itm) => itm.header !== 'Intake Requirements'),
        validationSchema: bcwsProfileValidationSchema,
        initialValues: bcwsValues,
      };
    }
  } else {
    if (personnel.status === Status.PENDING) {
      return {
        sections: emcrSections,
        validationSchema: emcrPendingValidationSchema,
        initialValues: { ...emcrPendingValues, ministry: personnel.ministry },
      };
    } else {
      return {
        sections: emcrSections.filter((itm) => itm.header !== 'Intake Requirements'),
        validationSchema: emcrValidationSchema,
        initialValues: { ...initialFormValues, ministry: personnel.ministry },
      };
    }
  }
};
