import {
  Ministry,
  Status,
  UnionMembership,
  Region,
  RegionName,
  FireCentreName,
  FireCentre,
} from '@/common';
import * as Yup from 'yup';

import { DriverLicense, DriverLicenseName, Program } from '@/common/enums';
import {
  BcwsTravelPreference,
  EmcrTravelPreference,
  TravelPreferenceText,
} from '@/common/enums/travel-preference.enum';
import type { FieldType } from './types';

export const phoneNumber = (value: any) => {
  if (value === '' || !value || value === null) {
    return true;
  } else return value?.toString().replace(/[^\d]/g, '').length === 10;
};

export const firstName = Yup.string()
  .min(2, 'Min length 2 characters.')
  .max(50, 'Max length 50 characters.')
  .required('This field is required.');

export const lastName = Yup.string()
  .min(2, 'Min length 2 characters.')
  .max(50, 'Max length 50 characters.')
  .required('This field is required.');

const workLocation = Yup.object().shape({
  locationName: Yup.string(),
  region: Yup.string(),
  fireCentre: Yup.string(),
});

export const homeLocation = Yup.object().shape({
  locationName: Yup.string(),
  region: Yup.string(),
  fireCentre: Yup.string(),
});

export const primaryPhone = Yup.string()
  .required('Primary phone number is required.')
  .test(
    'phone number',
    'Invalid phone number format. Please enter digits only. ex: 5555555555',
    phoneNumber,
  );

export const secondaryPhone = Yup.string()
  .nullable()
  .optional()
  .test(
    'phone number',
    'Invalid phone number format. Please enter digits only. ex: 5555555555',
    phoneNumber,
  )
  .optional();

export const workPhone = Yup.string()
  .required('Work phone number is required.')
  .test(
    'phone number',
    'Invalid phone number format. Please enter digits only. ex: 5555555555',
    phoneNumber,
  );

export const supervisorFirstName = Yup.string()
  .min(2, 'Min length 2 characters.')
  .max(50, 'Max length 50 characters.')
  .required('This field is required.');

export const supervisorLastName = Yup.string()
  .min(2, 'Min length 2 characters.')
  .max(50, 'Max length 50 characters.')
  .required('This field is required.');

export const supervisorEmail = Yup.string()
  .optional()
  .nullable()
  .email('Invalid email format.')
  .matches(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format.');

export const supervisorPhone = Yup.string()
  .optional()
  .nullable()
  .test(
    'phone number',
    'Invalid phone number format. Please enter digits only. ex: 5555555555',
    phoneNumber,
  )
  .optional();

const approvedBySupervisor = Yup.boolean().required('This field is required.');

const ministry = Yup.string().required('This field is required.');

const division = Yup.string().optional().nullable();

const unionMembership = Yup.string().required('This field is required.');

const driversLicense = Yup.array().optional();

const icsTraining = Yup.boolean().required('This field is required.');

const purchaseCardHolder = Yup.string().required('This field is required.');

const employeeId = Yup.string().optional().nullable();

const paylistId = Yup.string().optional().nullable();

const liaisonFirstName = Yup.string().optional();

const liaisonLastName = Yup.string().optional();

export const liaisonPhoneNumber = Yup.string()
  .test(
    'phone number',
    'Invalid phone number format. Please enter digits only. ex: 5555555555',
    phoneNumber,
  )
  .optional()
  .nullable();

const liaisonEmail = Yup.string().optional();

const emergencyContactFirstName = Yup.string().optional();

const emergencyContactLastName = Yup.string().optional();

export const emergencyContactPhoneNumber = Yup.string()
  .optional()
  .nullable()
  .test(
    'phone number',
    'Invalid phone number format. Please enter digits only. ex: 5555555555',
    phoneNumber,
  )
  .optional();

const emergencyContactRelationship = Yup.string().optional();

const parQ = Yup.boolean().required('This field is required.');

const willingnessStatement = Yup.boolean().required('This field is required.');

const orientation = Yup.boolean().required('This field is required.');

export const editProfileValidationSchema = Yup.object().shape({
  paylistId,

  employeeId,
  firstName,
  lastName,
  workLocation,
  homeLocation,
  primaryPhone,
  secondaryPhone,
  workPhone,
  supervisorFirstName,
  supervisorLastName,
  supervisorEmail,
  supervisorPhone,
  approvedBySupervisor,
  ministry,
  division,
  unionMembership,
  driversLicense,
  emergencyContactFirstName,
  emergencyContactLastName,
  emergencyContactPhoneNumber,
  emergencyContactRelationship,
});

export const emcrPendingValidationSchema = Yup.object().shape({
  ...editProfileValidationSchema.fields,
  icsTraining,
});

export const bcwsProfileValidationSchema = Yup.object().shape({
  ...editProfileValidationSchema.fields,
  purchaseCardHolder,
  liaisonFirstName,
  liaisonLastName,
  liaisonPhoneNumber,
  liaisonEmail,
});

export const bcwsPendingValidationSchema = Yup.object().shape({
  ...bcwsProfileValidationSchema.fields,
  parQ,
  willingnessStatement,
  orientation,
});

export const emcrValidationSchema = Yup.object().shape({
  ...editProfileValidationSchema.fields,
});
const emcr = Yup.object().shape({
  travelPreference: Yup.string().optional(),
});
const bcws = Yup.object().shape({
  liaisonFirstName: Yup.string().optional(),
  liaisonLastName: Yup.string().optional(),
  liaisonPhoneNumber: Yup.string().optional(),
  liaisonEmail: Yup.string().optional(),
  travelPreference: Yup.string().optional(),
});

export const memberValidationSchema = {
  general: Yup.object().shape({
    workLocation,
    homeLocation,
    emcr,
    bcws: Yup.object().shape({
      liaisonFirstName: Yup.string().optional(),
      liaisonLastName: Yup.string().optional(),
      liaisonEmail: Yup.string().optional(),
      travelPreference: Yup.string().optional(),
    }),
    driversLicense,
  }),
  employee: Yup.object().shape({
    supervisorFirstName,
    supervisorLastName,
    supervisorPhone,
    supervisorEmail,
    unionMembership,
    bcws,
    ministry,
    division,
  }),
  contact: Yup.object().shape({
    primaryPhone,
    secondaryPhone,
    workPhone,
  }),
  emergency: Yup.object().shape({
    emergencyContactFirstName,
    emergencyContactLastName,
    emergencyContactPhoneNumber,
    emergencyContactRelationship,
  }),
};

export type SectionType = {
  header: string;
  fields: FieldType[];
};

export const workLocationField = {
  locationName: {
    name: 'workLocation.locationName',
    label: 'Work Location',
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    required: false,
    handleChange: true,
    options: [{ label: '', value: '' }],
  },
  fireCentre: {
    name: 'workLocation.fireCentre',
    label: 'Work Fire Centre',
    type: 'select',
    autoComplete: 'off',
    disabled: true,
    required: false,
    program: Program.BCWS,
    options: Object.keys(FireCentre).map((itm) => ({
      label: FireCentreName[itm as FireCentre],
      value: itm,
    })),
  },
  region: {
    name: 'workLocation.region',
    label: 'Work Region',
    required: false,
    type: 'select',
    autoComplete: 'off',
    disabled: true,
    program: Program.EMCR,
    options: Object.keys(Region).map((itm) => ({
      label: RegionName[itm as Region],
      value: itm,
    })),
  },
};

export const homeLocationField = {
  locationName: {
    name: 'homeLocation.locationName',
    label: 'Home Location',
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    required: true,
    handleChange: true,
    options: [{ label: '', value: '' }],
  },
  fireCentre: {
    name: 'homeLocation.fireCentre',
    label: 'Home Fire Centre',
    type: 'select',
    autoComplete: 'off',
    disabled: true,
    required: false,
    program: Program.BCWS,
    options: Object.keys(FireCentre).map((itm) => ({
      label: FireCentreName[itm as FireCentre],
      value: itm,
    })),
  },

  region: {
    name: 'homeLocation.region',
    label: 'Home Region',
    required: false,
    type: 'select',
    autoComplete: 'off',
    disabled: true,
    program: Program.EMCR,
    options: Object.keys(Region).map((itm) => ({
      label: RegionName[itm as Region],
      value: itm,
    })),
  },
};

export const fields = {
  division: {
    name: 'division',
    label: 'Division',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
  },
  ministry: {
    name: 'ministry',
    label: 'Ministry',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: Object.values(Ministry).map((itm) => ({
      label: itm.toString(),
      value: itm,
    })),
  },
  icsTraining: {
    name: 'icsTraining',
    label: 'ICS Training',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    program: Program.EMCR,
    options: [
      { label: 'Incomplete', value: 'false' },
      { label: 'Completed', value: 'true' },
    ],
  },
  approvedBySupervisor: {
    name: 'approvedBySupervisor',
    label: ' Supervisor Approval',
    required: true,
    type: 'select',
    autoComplete: 'off',

    disabled: false,
    options: [
      { label: 'Not Yet Received', value: 'false' },
      { label: 'Received', value: 'true' },
    ],
  },
  willingnessStatement: {
    name: 'willingnessStatement',
    label: 'Willingness Statement',
    autoComplete: 'off',
    disabled: false,
    required: true,

    type: 'select',
    program: Program.BCWS,
    options: [
      { label: 'Completed', value: 'true' },
      { label: 'Incomplete', value: 'false' },
    ],
  },
  parQ: {
    name: 'parQ',
    label: 'ParQ',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Program.BCWS,
    options: [
      { label: 'Completed', value: 'true' },
      { label: 'Incomplete', value: 'false' },
    ],
  },
  orientation: {
    name: 'orientation',
    label: 'TEAMS Orientation',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Program.BCWS,
    options: [
      { label: 'Completed', value: 'true' },
      { label: 'Incomplete', value: 'false' },
    ],
  },
  dateApplied: {
    name: 'dateApplied',
    label: 'Date Applied',
    type: 'text',
    autoComplete: 'off',
    disabled: true,
    required: true,
    status: Status.PENDING,
  },
  dateApproved: {
    name: 'dateApproved',
    label: 'Date Approved',
    type: 'text',
    autoComplete: 'off',
    disabled: true,
    required: true,
    status: Status.ACTIVE,
  },

  employeeId: {
    name: 'employeeId',
    label: 'Employee ID',
    required: true,
    type: 'text',
    disabled: true,
    break: true,
    autoComplete: 'off',
  },

  purchaseCardHolder: {
    name: 'purchaseCardHolder',
    label: 'Purchase Card Holder',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Program.BCWS,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },

  driverLicense: {
    name: 'driverLicense',
    label: 'Drivers License',
    autoComplete: 'off',
    disabled: false,
    multiple: 'true',
    required: false,
    type: 'select',
    options: Object.values(DriverLicense).map((itm) => ({
      label: DriverLicenseName[itm],
      value: itm,
    })),
  },

  primaryPhone: {
    name: 'primaryPhone',
    label: 'Primary Number',
    required: true,
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
  },
  secondaryPhone: {
    name: 'secondaryPhone',
    label: 'Secondary Number',
    required: false,
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
  },
  email: {
    name: 'email',
    label: 'Work Email',
    break: true,
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },
  emailByMember: {
    name: 'email',
    label: 'Work Email',
    break: true,
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: true,
  },

  workPhone: {
    name: 'workPhone',
    label: 'Work Number',
    required: false,
    type: 'tel',
    break: true,
    autoComplete: 'off',
    disabled: false,
  },

  emergencyContactFirstName: {
    name: 'emergencyContactFirstName',
    label: 'Emergency Contact First Name',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
  },

  emergencyContactLastName: {
    name: 'emergencyContactLastName',
    label: 'Emergency Contact Last Name',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
  },

  emergencyContactPhoneNumber: {
    label: 'Emergency Contact Number',
    name: 'emergencyContactPhoneNumber',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'tel',
    break: true,
  },

  emergencyContactRelationship: {
    label: 'Emergency Contact Relationship',
    name: 'emergencyContactRelationship',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
  },
  supervisorPhone: {
    name: 'supervisorPhone',
    label: 'Supervisor Phone Number',
    required: false,
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
  },
  supervisorFirstName: {
    name: 'supervisorFirstName',
    label: 'Supervisor First Name',
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },
  supervisorLastName: {
    name: 'supervisorLastName',
    label: 'Supervisor Last Name',
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },
  supervisorEmail: {
    name: 'supervisorEmail',
    label: 'Supervisor Email',
    required: false,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },

  paylistId: {
    name: 'paylistId',
    label: 'Paylist ID',
    autoComplete: 'off',
    disabled: true,
    required: false,
    type: 'text',
  },

  unionMembership: {
    name: 'unionMembership',
    label: 'Union Membership',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: Object.values(UnionMembership).map((itm) => ({
      label: itm.toString(),
      value: itm.toString(),
    })),
  },
  liaisonFirstName: {
    name: 'liaisonFirstName',
    label: 'Liaison First Name',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Program.BCWS,
  },
  liaisonLastName: {
    name: 'liaisonLastName',
    label: 'Liaison Last Name',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Program.BCWS,
  },

  liaisonPhoneNumber: {
    name: 'liaisonPhoneNumber',
    label: 'Liaison Number',
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Program.BCWS,
  },
  liaisonEmail: {
    name: 'liaisonEmail',
    label: 'Liaison Email',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    break: true,
    program: Program.BCWS,
  },

  homeLocation: homeLocationField,
  workLocation: workLocationField,
  emcr: {
    travelPreference: {
      name: 'emcr.travelPreference',
      label: 'EMCR Travel Preference',
      required: false,
      disabled: false,
      type: 'select',
      autoComplete: 'off',
      options: Object.values(EmcrTravelPreference).map((itm) => ({
        label: TravelPreferenceText[itm],
        value: itm.toString(),
      })),
    },
  },

  travelPreference: {
    name: 'travelPreference',
    label: 'Travel Preference',
    disabled: false,
    required: false,
    type: 'select',
    autoComplete: 'off',
    options: [{ label: '', value: '' }],
  },

  bcws: {
    travelPreference: {
      name: 'bcws.travelPreference',
      label: 'BCWS Travel Preference',
      disabled: false,
      required: false,
      type: 'select',
      autoComplete: 'off',
      options: Object.values(BcwsTravelPreference).map((itm) => ({
        label: TravelPreferenceText[itm],
        value: itm.toString(),
      })),
    },
    liaisonFirstName: {
      name: 'bcws.liaisonFirstName',
      label: 'Liaison First Name',
      type: 'text',
      autoComplete: 'off',
      disabled: false,
      required: false,
      program: Program.BCWS,
    },
    liaisonLastName: {
      name: 'bcws.liaisonLastName',
      label: 'Liaison Last Name',
      type: 'text',
      autoComplete: 'off',
      disabled: false,
      required: false,
      program: Program.BCWS,
    },

    liaisonPhoneNumber: {
      name: 'bcws.liaisonPhoneNumber',
      label: 'Liaison Number',
      type: 'tel',
      autoComplete: 'off',
      disabled: false,
      required: false,
      program: Program.BCWS,
    },
    liaisonEmail: {
      name: 'bcws.liaisonEmail',
      label: 'Liaison Email',
      type: 'text',
      autoComplete: 'off',
      disabled: false,
      required: false,
      break: true,
      program: Program.BCWS,
    },
  },

  firstName: {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: true,
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: true,
    break: true,
  },

  resetChips: {
    name: 'resetChips',
    label: 'Sync with PeopleSoft',
    type: 'select',
    disabled: false,
    autoComplete: 'off',
    options: [
      { label: 'Reset', value: true },
      { label: 'No', value: false },
    ],
  },
};
