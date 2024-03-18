import { Ministry, UnionMembership } from '@/common';
import * as Yup from 'yup';

const phoneNumber = (value: any) =>
  value.toString().replace(/[^\d]/g, '').length === 10;

export const EditProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Min length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required('This field is required.'),
  lastName: Yup.string()
    .min(2, 'Min length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required('This field is required.'),
  dateJoined: Yup.date(),
  workLocation: Yup.object().shape({
    region: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters.')
      .max(50, 'Max length 50 characters.'),
    locationName: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters.')
      .max(50, 'Max length 50 characters.'),
  }),
  homeLocation: Yup.object().shape({
    region: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters.')
      .max(50, 'Max length 50 characters.')
      .required('This field is required.'),
    locationName: Yup.string()
      .optional()
      .min(2, 'Min length 2 characters.')
      .max(50, 'Max length 50 characters.'),
  }),
  remoteOnly: Yup.boolean().required('This field is required.'),
  willingToTravel: Yup.boolean().required('This field is required.'),
  primaryPhone: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    )
    .required('This field is required.'),
  secondaryPhone: Yup.string().test(
    'phone number',
    'Invalid phone number format. Please enter ten digits.',
    phoneNumber,
  ),
  workPhone: Yup.string().test(
    'phone number',
    'Invalid phone number format. Please enter ten digits.',
    phoneNumber,
  ),
  supervisorFirstName: Yup.string()
    .min(2, 'Max length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required('This field is required.'),
  supervisorLastName: Yup.string()
    .min(2, 'Max length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required('This field is required.'),
  supervisorEmail: Yup.string().optional().email('Invalid email format.'),
  ministry: Yup.string().required('This field is required.'),
  unionMembership: Yup.string().required('This field is required.'),
});

export const fields = {
  dateJoined: {
    name: 'dateJoined',
    label: 'Date Joined',
    disabled: true,
    type: 'text',
    autocomplete: 'off',
    required: true,
  },
  firstName: {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    autocomplete: 'off',

    disabled: false,
    required: true,
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name',

    type: 'text',
    autocomplete: 'off',
    disabled: false,
    required: true,
  },
  workLocation: {
    region: {
      name: 'workLocation.region',
      label: 'Work Region',
      required: false,
      type: 'select',
      autocomplete: 'off',
      disabled: true,
    },
    locationName: {
      name: 'workLocation.locationName',
      label: 'Work Location',
      type: 'select',
      autocomplete: 'off',
      disabled: false,

      required: false,
    },
  },
  homeLocation: {
    region: {
      name: 'homeLocation.region',
      label: 'Home Region',
      required: true,
      type: 'select',
      autocomplete: 'off',
      disabled: true,
    },
    locationName: {
      name: 'homeLocation.locationName',
      label: 'Home Location',
      type: 'select',
      autocomplete: 'off',
      disabled: false,
      required: true,
    },
  },

  remoteOnly: {
    name: 'remoteOnly',
    label: 'Remote Only',
    required: true,
    type: 'select',
    autocomplete: 'off',
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
    autocomplete: 'off',
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
    type: 'tel',
    autocomplete: 'off',
    disabled: false,
  },
  secondaryPhone: {
    name: 'secondaryPhone',
    label: 'Secondary Number',
    required: false,
    type: 'tel',
    autocomplete: 'off',
    disabled: false,
  },
  email: {
    name: 'email',
    label: 'Email',
    required: true,
    type: 'text',
    autocomplete: 'off',
    disabled: true,
  },

  supervisorFirstName: {
    name: 'supervisorFirstName',
    label: 'Supervisor First Name',
    required: true,
    type: 'text',
    autocomplete: 'off',
    disabled: false,
  },
  supervisorLastName: {
    name: 'supervisorLastName',
    label: 'Supervisor Last Name',
    required: true,
    type: 'text',
    autocomplete: 'off',
    disabled: false,
  },
  supervisorEmail: {
    name: 'supervisorEmail',
    label: 'Supervisor Email',
    required: false,
    type: 'text',
    autocomplete: 'off',
    disabled: false,
  },
  workPhone: {
    name: 'workPhone',
    label: 'Work Number',
    required: false,
    type: 'tel',
    autocomplete: 'off',
    disabled: false,
  },
  ministry: {
    name: 'ministry',
    label: 'Ministry',
    required: true,
    type: 'select',
    autocomplete: 'off',
    disabled: false,
    options: Object.values(Ministry).map((itm) => ({ label: itm, value: itm })),
  },
  unionMembership: {
    name: 'unionMembership',
    label: 'Union Membership',
    required: true,
    type: 'select',
    autocomplete: 'off',
    disabled: false,
    options: Object.values(UnionMembership).map((itm) => ({
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
