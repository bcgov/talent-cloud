import type { Personnel, Location } from '@/common';
import { fields, memberValidationSchema } from './constants';
import { datePST } from '@/utils';

export const memberFormConfig = (
  personnelData: Partial<Personnel>,
  locations: Location[],
) => {
  delete personnelData?.availability;
  delete personnelData?.experiences;

  const personnel = {
    ...personnelData,
    primaryPhone:
      personnelData?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
      '',
    workPhone:
      personnelData.workPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    dateApproved: datePST(personnelData.dateApproved as Date, true),
    dateApplied: datePST(personnelData.dateApplied as Date, true),
  };

  if (personnelData.secondaryPhone) {
    personnelData.secondaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (personnelData.supervisorPhone) {
    personnelData.supervisorPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (personnelData.liaisonPhoneNumber) {
    personnelData.liaisonPhoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (personnel.emergencyContactPhoneNumber) {
    personnelData.emergencyContactPhoneNumber?.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    );
  }

  fields.homeLocation.locationName.options = locations.map((itm: Location) => ({
    label: itm.locationName,
    value: itm.locationName,
  }));
  fields.workLocation.locationName.options = locations.map((itm: Location) => ({
    label: itm.locationName,
    value: itm.locationName,
  }));

  const memberSections = {
    general: [
      {
        header: 'Edit General Information',
        fields: [
          fields.homeLocation.locationName,
          fields.workLocation.locationName,
          ...(personnelData.emcr ? [fields.homeLocation.region] : []),
          ...(personnelData.emcr ? [fields.workLocation.region] : []),
          ...(personnelData.bcws ? [fields.homeLocation.fireCentre] : []),
          ...(personnelData.bcws ? [fields.workLocation.fireCentre] : []),
          fields.emcrTravelPreference,
          fields.driverLicense,
          fields.employeeId,
          fields.paylistId,
        ],
      },
    ],
    employee: [
      {
        header: 'Edit Employee Information',
        fields: [
          fields.supervisorFirstName,
          fields.supervisorLastName,
          fields.supervisorEmail,
          fields.supervisorPhone,
          fields.liaisonFirstName,
          fields.liaisonLastName,
          fields.liaisonEmail,
          fields.ministry,
          fields.division,
          fields.unionMembership,
        ],
      },
    ],
    contact: [
      {
        header: 'Edit Contact Information',
        fields: [
          fields.primaryPhone,
          fields.secondaryPhone,
          fields.workPhone,
          fields.email,
        ],
      },
    ],
    emergency: [
      {
        header: 'Edit Emergency Contact',
        fields: [
          fields.emergencyContactFirstName,
          fields.emergencyContactLastName,
          fields.emergencyContactPhoneNumber,
          fields.emergencyContactRelationship,
        ],
      },
    ],
  };

  const initialFormValues = {
    general: {
      firstName: personnel.firstName,
      lastName: personnel.lastName,
      homeLocation: personnel.homeLocation,
      workLocation: personnel.workLocation,
      travelPreference:
        personnel.bcws?.travelPreference || personnel.emcr?.travelPreference, // TODO: Probably should change this
      driverLicense: personnel?.driverLicense ?? [],
      employeeId: personnel?.employeeId,
      paylistId: personnel?.paylistId,
    },
    employee: {
      supervisorFirstName: personnel.supervisorFirstName,
      supervisorLastName: personnel.supervisorLastName,
      supervisorEmail: personnel.supervisorEmail,
      supervisorPhone: personnel.supervisorPhone,
      liaisonFirstName: personnel?.bcws?.liaisonFirstName ?? '',
      liaisonLastName: personnel?.bcws?.liaisonLastName ?? '',
      liaisonEmail: personnel?.bcws?.liaisonEmail ?? '',
      ministry: personnel.ministry,
      division: personnel.division ?? '',
      unionMembership: personnel.unionMembership,
    },
    contact: {
      primaryPhone: personnel.primaryPhone,
      secondaryPhone: personnel.secondaryPhone,
      workPhone: personnel.workPhone,
      email: personnel.email,
    },
    emergency: {
      emergencyContactFirstName: personnel.emergencyContactFirstName ?? '',
      emergencyContactLastName: personnel.emergencyContactLastName ?? '',
      emergencyContactPhoneNumber: personnel.emergencyContactPhoneNumber,
      emergencyContactRelationship: personnel.emergencyContactRelationship ?? '',
    },
    // status: personnel.status,
    // approvedBySupervisor: personnel.approvedBySupervisor,
    // purchaseCardHolder: personnel.purchaseCardHolder,
    // dateApproved: personnel.dateApproved,
    // dateApplied: personnel.dateApplied,
    // icsTraining: personnel.icsTraining,
    // parQ: personnel.parQ,
    // willingnessStatement: personnel.willingnessStatement,
    // orientation: personnel.orientation,
  };

  return {
    sections: memberSections,
    validationSchema: memberValidationSchema,
    initialValues: initialFormValues,
  };
};
