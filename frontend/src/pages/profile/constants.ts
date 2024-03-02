import { Region, Ministry, Classification, WorkLocation } from '@/common';
import * as Yup from 'yup';
export const EditProfileValidationSchema = Yup.object().shape(
  {
    email: Yup.string().email('Invalid email').required('Email is Required'),
    firstName: Yup.string()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters')
      .required('Last name is required'),
    dateJoined: Yup.date(),
    middleName: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
    region: Yup.string().required('Work region is required'),
    workLocation: Yup.string().required('Work location is required'),
    homeLocation: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
    remoteOnly: Yup.boolean().required('Remote Only is required'),
    willingToTravel: Yup.boolean().required('Willingness to travel is required'),
    primaryPhone: Yup.string()
      .min(10, 'Please enter a ten digit phone number')
      .max(14, 'Please enter a ten digit phone number')
      .required('Primary number is required'),
    secondaryPhone: Yup.string()
      .optional()
      .min(10, 'Please enter a ten digit phone number')
      .max(14, 'Please enter a ten digit phone number'),
    mailingAddress: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
    city: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
    postalCode: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
    supervisor: Yup.string()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters')
      .required('Supervisor is required'),
    ministry: Yup.string().required('Ministry is required'),
    classification: Yup.string().required('Union membership is required'),
    logisticsNotes: Yup.string().notRequired().nullable(),
    coordinatorNotes: Yup.string().notRequired().nullable(),
  },
  [
    ['middleName', 'middleName'],
    ['secondaryPhone', 'secondaryPhone'],
    ['mailingAddress', 'mailingAddress'],
    ['city', 'city'],
    ['postalCode', 'postalCode'],
    ['homeLocation', 'homeLocation'],
  ],
);

export const fields: {
  [key: string]: {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    options?: {
      label: string;
      value: string | number | readonly string[] | undefined;
    }[];
  };
} = {
  dateJoined: {
    name: 'dateJoined',
    label: 'Date Joined',
    disabled: true,
    type: 'text',

    required: true,
  },
  firstName: {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    disabled: false,
    required: true,
  },
  middleName: {
    name: 'middleName',
    label: 'Middle Name',
    type: 'text',
    disabled: false,
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name',

    type: 'text',
    disabled: false,
    required: true,
  },
  region: {
    name: 'region',
    label: 'Work Region',
    required: true,
    type: 'select',
    disabled: false,
    options: Object.values(Region).map((itm) => ({
      label: Region[itm],
      value: Region[itm],
    })),
  },
  workLocation: {
    name: 'workLocation',
    label: 'Work Location',

    type: 'select',
    disabled: false,
    options: Object.keys(WorkLocation).map((itm) => ({
      label: WorkLocation[itm as keyof typeof WorkLocation],
      value: WorkLocation[itm as keyof typeof WorkLocation],
    })),
    required: true,
  },
  homeLocation: {
    name: 'homeLocation',
    label: 'Home Location',
    required: false,
    type: 'text',
    disabled: false,
  },
  remoteOnly: {
    name: 'remoteOnly',
    label: 'Remote Only',
    required: true,
    type: 'select',
    disabled: false,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  willingToTravel: {
    name: 'willingToTravel',
    label: 'Willingness to Travel',
    required: true,
    type: 'select',
    disabled: false,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  primaryPhone: {
    name: 'primaryPhone',
    label: 'Primary Number',
    required: true,
    type: 'phone',
    disabled: false,
  },
  secondaryPhone: {
    name: 'secondaryPhone',
    label: 'Secondary Number',
    required: false,
    type: 'phone',
    disabled: false,
  },
  email: {
    name: 'email',
    label: 'Email',
    required: true,
    type: 'text',
    disabled: false,
  },
  mailingAddress: {
    name: 'mailingAddress',
    label: 'Mailing Address',
    type: 'text',
    disabled: false,
  },
  city: {
    name: 'city',
    label: 'City',
    type: 'text',
    disabled: false,
  },
  postalCode: {
    name: 'postalCode',
    label: 'Postal Code',
    type: 'text',
    disabled: false,
  },
  supervisor: {
    name: 'supervisor',
    label: 'Supervisor',
    required: true,
    type: 'text',
    disabled: false,
  },
  ministry: {
    name: 'ministry',
    label: 'Ministry',
    required: true,
    type: 'select',
    disabled: false,
    options: Object.values(Ministry).map((itm) => ({ label: itm, value: itm })),
  },
  classification: {
    name: 'classification',
    label: 'Union Membership',
    required: true,
    type: 'select',
    disabled: false,
    options: Object.values(Classification).map((itm) => ({
      label: itm.toString(),
      value: itm.toString(),
    })),
  },
  logisticsNotes: {
    name: 'logisticsNotes',
    label: 'Logistics Notes',
    type: 'text',
    disabled: false,
  },
  coordinatorNotes: {
    name: 'coordinatorNotes',
    label: 'Coordinator Notes',
    type: 'text',
    disabled: false,
  },
};

export const sections = {
  general: {
    header: 'General Information',
  },
  contact: {
    header: 'Contact Information',
  },
  organization: {
    header: 'Organization Information',
  },
  notes: { header: 'Notes' },
};
