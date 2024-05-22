import { Ministry, Status, UnionMembership, Region, RegionName, FireCentre, FireCentreName } from '@/common';
import * as Yup from 'yup';
import {FieldType} from './types';
import { Route } from '@/providers';

const phoneNumber = (value: any) => {
  if (value === '' || !value) {
    return true;
  } else return value?.toString().replace(/[^\d]/g, '').length === 10;
};

export const EditProfileValidationSchema = Yup.object().shape({
    workLocation: Yup.string(),
    workLocationRegion: Yup.string(),
    workLocationFireCentre: Yup.string(),
  homeLocation: Yup.string()
    .min(2, 'This field is required')
    .required('This field is required.'),
    homeLocationRegion: Yup.string(),
    homeLocationFireCentre: Yup.string(),
  
  remoteOnly: Yup.boolean().required('This field is required.'),
  willingToTravel: Yup.boolean().required('This field is required.'),
  primaryPhone: Yup.string()
    .required('This field is required.')
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    ),
  secondaryPhone: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    )
    .optional(),
  workPhone: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    )
    .optional(),
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
  driversLicense: Yup.string().required('This field is required.'),
  // conditional for pending status for both


});
export const EMCRProfileValidationSchema =
  Yup.object().shape({
    ...EditProfileValidationSchema.fields,
    workRegion: Yup.string().optional(),
    homeRegion: Yup.string().optional(),
  })

export const emcrPendingValidation = Yup.object().shape({
  icsTraining: Yup.boolean().required('This field is required.'),
  approvedBySupervisor: Yup.boolean().required('This field is required.')
})

export const BCWSProfileValidationSchema =
  Yup.object().shape({
    ...EditProfileValidationSchema.fields,
    purchaseCardHolder: Yup.string().required('This field is required.'),
    paylistId: Yup.string().required('This field is required.'),
    liaisonFirstName: Yup.string().optional(),
    liaisonLastName: Yup.string().optional(),
    liaisonNumber: Yup.string().optional(),
    liaisonEmail: Yup.string().optional(),
    division: Yup.string().optional(),
    emergencyContact: Yup.string().optional(),
    emergencyContactNumber: Yup.string().optional(),
    emergencyContactRelationship: Yup.string().optional(),
    workFireCentre: Yup.string().optional(),
    homeFireCentre: Yup.string().optional(),
  })

export const BCWSPendingValidationSchema = Yup.object().shape({
  parQ: Yup.boolean().required('This field is required.'),
  willingness: Yup.boolean().required('This field is required.'),
  orientation: Yup.boolean().required('This field is required.'),
  approvedBySupervisor: Yup.boolean().required('This field is required.'),
})



export const bcwsIntakeRequirements = [{
  name: 'approvedBySupervisor',
  label: ' Supervisor Approval',
  required: true,
  type: 'select',
  autoComplete: 'off',
  disabled: false,
  program: Route.BCWS,
  options: [
    { label: 'Not Yet Received', value: 'false' },
    { label: 'Received', value: 'true' },
  ],
},
{
  name: 'willingness',
  label: 'Willingness Statement',
  autoComplete: 'off',
  disabled: false,
  required: true,
  type: 'select',
  program: Route.BCWS,
  options: [{label: "Completed", value: true}, { label: "Incomplete", value: false}]
},
{
  name: 'parQ',
  label: 'ParQ',
  autoComplete: 'off',
  disabled: false,
  required: true,
  type: 'select',
  program: Route.BCWS,
  options: [{label: "Completed", value: true}, { label: "Incomplete", value: false}]

},
{
  name: 'orientation',
  label: 'TEAMS Orientation',
  autoComplete: 'off',
  disabled: false,
  required: true,
  type: 'select',
  program: Route.BCWS,
  options: [{label: "Completed", value: true}, { label: "Incomplete", value: false}]

}]

export const emcrIntakeRequirements = [{
  name: 'icsTraining',
  label: 'ICS Training',
  required: true,
  type: 'select',
  autoComplete: 'off',
  disabled: false,
  program: Route.EMCR,
  options: [
    { label: 'Incomplete', value: 'false' },
    { label: 'Completed', value: 'true' },
  ],
}, {
  name: 'approvedBySupervisor',
  label: ' Supervisor Approval',
  required: true,
  type: 'select',
  autoComplete: 'off',
  disabled: false,
  program: Route.EMCR,
  options: [
    { label: 'Not Yet Received', value: 'false' },
    { label: 'Received', value: 'true' },
  ],
}]
type SectionType = {
  header: string;
  fields: FieldType[];
  program?: Route;
  status?: Status
}

export const pendingSection: SectionType = {
  header: 'Intake Requirements',  
  fields: [
    ...emcrIntakeRequirements,
    ...bcwsIntakeRequirements
  ]
}

export const sections: SectionType[] = [
  
  {
    header: 'General Information',
    fields: [
      {
        name: 'dateApplied',
        label: 'Date Applied',
        type: 'text',
        autoComplete: 'off',
        disabled: true,
        required: true,
        status: Status.PENDING
      },
      {
        name: 'dateApproved',
        label: 'Date Approved',
        type: 'text',
        autoComplete: 'off',
        disabled: true,
        required: true,
        status: Status.ACTIVE
      },
      {
        name: 'remoteOnly',
        label: 'Remote Only',
        required: true,
        type: 'select',
        autoComplete: 'off',
        disabled: false,
        options: [
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ],
      },
      {
        name: 'willingToTravel',
        label: 'Willing to Travel',
        required: true,
        type: 'select',
        autoComplete: 'off',
        disabled: false,
        options: [
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ],
      },
      {
        name: 'homeLocation',
        label: 'Home Location',
        type: 'select',
        autoComplete: 'off',
        disabled: false,
        required: true,
      },
      {
        name: 'homeLocationFireCentre',
        label: 'Home Fire Centre',
        type: 'select',
        autoComplete: 'off',
        disabled: true,
        required: false,
        program: Route.BCWS,
        options: Object.keys(FireCentre).map((itm) => ({ label: FireCentreName[itm as FireCentre], value: itm }))
      },

      {
        name: 'homeLocationRegion',
        label: 'Home Region',
        required: true,
        type: 'select',
        autoComplete: 'off',
        disabled: true,
        program: Route.EMCR,
        options: Object.keys(Region).map((itm) => ({ label: RegionName[itm as Region], value: itm }))
      },
      {
        name: 'workLocation',
        label: 'Work Location',
        type: 'select',
        autoComplete: 'off',
        disabled: false,
        required: false,
      },
      {
        name: 'workLocationFireCentre',
        label: 'Work Fire Centre',
        type: 'select',
        autoComplete: 'off',
        disabled: true,
        required: false,
        program: Route.BCWS,
        options: Object.keys(FireCentre).map((itm) => ({ label: FireCentreName[itm as FireCentre], value: itm }))
      }, {
        name: 'workLocationRegion',
        label: 'Work Region',
        required: false,
        type: 'select',
        autoComplete: 'off',
        disabled: true,
        program: Route.EMCR,
        options: Object.keys(Region).map((itm) => ({ label: RegionName[itm as Region], value: itm }))

      },



      {
        name: 'purchaseCardHolder',
        label: 'Purchase Card Holder',
        autoComplete: 'off',
        disabled: false,
        required: true,
        type: 'select',
        program: Route.BCWS

      },

      {
        name: 'driversLicense',
        label: 'Drivers License',
        autoComplete: 'off',
        disabled: false,
        required: true,
        type: 'select'

      },
    ]
  },



  {
    header: 'Contact Information',
    fields: [{
      name: 'primaryPhone',
      label: 'Primary Number',
      required: true,
      type: 'tel',
      autoComplete: 'off',
      disabled: false,
    },
    {
      name: 'secondaryPhone',
      label: 'Secondary Number',
      required: false,
      type: 'tel',
      autoComplete: 'off',
      disabled: false,
    },
    {
      name: 'email',
      label: 'Work Email',
      required: true,
      type: 'text',
      autoComplete: 'off',
      disabled: true,
    },


    {
      name: 'workPhone',
      label: 'Work Number',
      required: false,
      type: 'tel',
      autoComplete: 'off',
      disabled: false,
    },

    {
      name: 'emergencyContact',
      label: 'Emergency Contact',
      autoComplete: 'off',
      disabled: false,
      required: true,
      type: 'text',
      program: Route.BCWS

    },
    {
      label: "Emergency Contact Number",
      name: "emergencyContactNumber",
      autoComplete: "off",
      disabled: false,
      required: false,
      type: "tel",
      program: Route.BCWS
    },
    {
      label: "Emergency Contact Relationship",
      name: "emergencyContactRelationship",
      autoComplete: "off",
      disabled: false,
      required: false,
      type: "text",
      program: Route.BCWS
    },


    ]
  },
  {
    header: 'Organization Information',
    fields: [{
      name: 'supervisorFirstName',
      label: 'Supervisor First Name',
      required: true,
      type: 'text',
      autoComplete: 'off',
      disabled: false,
    },
    {
      name: 'supervisorLastName',
      label: 'Supervisor Last Name',
      required: true,
      type: 'text',
      autoComplete: 'off',
      disabled: false,
    },
    {
      name: 'supervisorEmail',
      label: 'Supervisor Email',
      required: false,
      type: 'text',
      autoComplete: 'off',
      disabled: false,
    },



    {
      name: 'paylistId',
      label: 'Paylist ID',
      autoComplete: 'off',
      disabled: false,
      required: true,
      type: 'select',
      program: Route.BCWS

    },

    {
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
    {
      name: 'ministry',
      label: 'Ministry',
      required: true,
      type: 'select',
      autoComplete: 'off',
      disabled: false,
      options: Object.values(Ministry).map((itm) => ({ label: itm, value: itm })),
    },
    {
      name: 'division',
      label: 'Division',
      autoComplete: 'off',
      disabled: false,
      required: true,
      type: 'select',
      program: Route.BCWS,
      options: [],
    },

    {

      name: "liaisonFirstName",
      label: "Liaison First Name",
      type: "text",
      autoComplete: "off",
      disabled: false,
      required: false,
      program: Route.BCWS
    },
    {
      name: "liaisonLastName",
      label: "Liaison Last Name",
      type: "text",
      autoComplete: "off",
      disabled: false,
      required: false,
      program: Route.BCWS
    },

    {
      name: "liaisonNumber",
      label: "Liaison Number",
      type: "text",
      autoComplete: "off",
      disabled: false,
      required: false,
      program: Route.BCWS
    },
    {
      name: "liaisonEmail",
      label: "Liaison Email",
      type: "text",
      autoComplete: "off",
      disabled: false,
      required: false,
      program: Route.BCWS
    },
    ]
  }
]


