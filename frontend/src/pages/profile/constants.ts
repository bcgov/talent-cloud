import { Ministry, Classification } from '@/common';
import * as Yup from 'yup';

export const EditProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(50, 'Max length 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(50, 'Max length 50 characters')
    .required('Last name is required'),
  dateJoined: Yup.date(),
  workLocation: Yup.object().shape({
    region: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters')
      .required('Work Region is required'),
    locationName: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters')
      .required('Work Location is required'),
  }),
  homeLocation: Yup.object().shape({
    region: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
    locationName: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters')
      .max(50, 'Max length 50 characters'),
  }),
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
  workPhone: Yup.string()
    .optional()
    .min(10, 'Please enter a ten digit phone number')
    .max(14, 'Please enter a ten digit phone number'),
  supervisor: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(50, 'Max length 50 characters')
    .required('Supervisor is required'),
  ministry: Yup.string().required('Ministry is required'),
  classification: Yup.string().required('Union membership is required'),
});

export const fields = {
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
  lastName: {
    name: 'lastName',
    label: 'Last Name',

    type: 'text',
    disabled: false,
    required: true,
  },
  workLocation: {
    region: {
      name: 'workLocation.region',
      label: 'Work Region',
      required: true,
      type: 'select',
      disabled: true,
    },
    locationName: {
      name: 'workLocation.locationName',
      label: 'Work Location',
      type: 'select',
      disabled: false,

      required: true,
    },
  },
  homeLocation: {
    region: {
      name: 'homeLocation.region',
      label: 'Home Region',
      required: false,
      type: 'select',
      disabled: true,
    },
    locationName: {
      name: 'homeLocation.locationName',
      label: 'Home Location',
      type: 'select',
      disabled: false,
      required: false,
    },
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
    disabled: true,
  },

  supervisor: {
    name: 'supervisor',
    label: 'Supervisor',
    required: true,
    type: 'text',
    disabled: false,
  },
  workPhone: {
    name: 'workPhone',
    label: 'Work Number',
    required: false,
    type: 'phone',
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
