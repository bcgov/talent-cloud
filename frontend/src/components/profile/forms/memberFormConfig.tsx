import type { Location, Member } from '@/common';
import { fields, memberValidationSchema } from './constants';
import { datePST } from '@/utils';
import {
  BcwsTravelPreference,
  EmcrTravelPreference,
} from '@/common/enums/travel-preference.enum';

export const memberFormConfig = (personnelData: Member, locations: Location[]) => {
  const personnel = {
    ...personnelData,
    primaryPhone:
      personnelData?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
      '',
    workPhone:
      personnelData.workPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    emcr: {
      ...personnelData.emcr,
      dateApproved: datePST(personnelData.emcr?.dateApproved as Date, true),
      dateApplied: datePST(personnelData.emcr?.dateApplied as Date, true),
      travelPreference:
        personnelData?.emcr?.travelPreference &&
        EmcrTravelPreference[
          personnelData.emcr.travelPreference as keyof typeof EmcrTravelPreference
        ],
      status: personnelData.emcr?.status,
    },
    bcws: {
      ...personnelData.bcws,
      dateApproved: datePST(personnelData.bcws?.dateApproved as Date, true),
      dateApplied: datePST(personnelData.bcws?.dateApplied as Date, true),
      travelPreference:
        personnelData?.bcws?.travelPreference &&
        BcwsTravelPreference[
          personnelData.bcws.travelPreference as keyof typeof BcwsTravelPreference
        ],
      status: personnelData.bcws?.status,
      liaisonPhoneNumber: personnelData.bcws?.liaisonPhoneNumber?.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '($1) $2-$3',
      ),
      liaisonEmail: personnelData.bcws?.liaisonEmail,
      liaisonFirstName: personnelData.bcws?.liaisonFirstName,
      liaisonLastName: personnelData.bcws?.liaisonLastName,
    },
  };

  if (personnelData.secondaryPhone) {
    personnelData.secondaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (personnelData.supervisorPhone) {
    personnelData.supervisorPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (personnelData.bcws?.liaisonPhoneNumber) {
    personnelData.bcws?.liaisonPhoneNumber?.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    );
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
          ...(personnelData.bcws ? [fields.bcws.travelPreference] : []),
          ...(personnelData.emcr ? [fields.emcr.travelPreference] : []),
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
          ...(personnelData.bcws
            ? [
                fields.bcws.liaisonLastName,
                fields.bcws.liaisonFirstName,
                fields.bcws.liaisonEmail,
                fields.bcws.liaisonPhoneNumber,
              ]
            : []),

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
          fields.emailByMember,
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
      emcr: { travelPreference: personnel.emcr?.travelPreference },
      bcws: { travelPreference: personnel.bcws?.travelPreference },
      driverLicense: personnel?.driverLicense ?? [],
      employeeId: personnel?.employeeId,
      paylistId: personnel?.paylistId,
    },
    employee: {
      supervisorFirstName: personnel.supervisorFirstName,
      supervisorLastName: personnel.supervisorLastName,
      supervisorEmail: personnel.supervisorEmail,
      supervisorPhone: personnel.supervisorPhone,
      bcws: {
        liaisonFirstName: personnel?.bcws?.liaisonFirstName ?? '',
        liaisonLastName: personnel?.bcws?.liaisonLastName ?? '',
        liaisonEmail: personnel?.bcws?.liaisonEmail ?? '',
      },
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
