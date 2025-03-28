import { Program } from '@/common';
import {
  firstName,
  lastName,
  liaisonPhoneNumber,
  phoneNumber,
  primaryPhone,
  secondaryPhone,
  supervisorPhone,
  workPhone,

} from '@/components/profile/forms/constants';
import * as Yup from 'yup';
import { experiencesValidation, } from './experiences-validation';


export const programSelectionSchema = Yup.object().shape({
  program: Yup.string().required('Program is required.'),
});

export const personalDetailsSchema = Yup.object().shape({
  firstName: firstName,
  lastName: lastName,
  primaryPhoneNumber: primaryPhone,
  secondaryPhoneNumber: secondaryPhone,
  homeLocation: Yup.mixed().required('Home Location is required.')
});

export const employmentDetailsSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required.'),
  employeeId: Yup.string().min(6, 'Employee number must be exactly 6 characters').max(6, 'Employee number must be exactly 6 characters').required('Employee number is required.'),
  email: Yup.string().required('Email is required.'),
  workPhoneNumber: workPhone,
  paylistId: Yup.string().required('Paylist ID is required'),
  ministry: Yup.string().required('Ministry is required.'),
  unionMembership: Yup.string().required('Union membership is required'),
  division: Yup.string().required('Division is required.'),
  purchaseCardHolder: Yup.string().when('program', {
    is: (val: Program) => val !== Program.EMCR,
    then: () => Yup.string().required('Purchase Card holder is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  travelPreferenceEmcr: Yup.string().when('program', {
    is: (val: Program) => val !== Program.BCWS,
    then: () => Yup.string().required('Travel preference is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  travelPreferenceBcws: Yup.string().when('program', {
    is: (val: Program) => val !== Program.EMCR,
    then: () => Yup.string().required('Travel preference is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
});

export const supervisorDetailsSchema = Yup.object().shape({
  supervisorFirstName: Yup.string()
    .min(2, 'Min length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required("Supervisor's first name is required."),

  supervisorLastName: Yup.string()
    .min(2, 'Min length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required("Supervisor's last name is required."),
  supervisorEmail: Yup.string()
    .required('Supervisor email is required.')
    .email('Invalid email format.')
    .matches(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format.'),
  supervisorPhoneNumber: supervisorPhone,
});

export const liaisonDetailsSchema = Yup.object()
  .shape({
    liaisonFirstName: Yup.string().min(2, 'Min length 2 characters').max(50, 'Max length 50 characters').optional().nullable(),
    liaisonLastName: Yup.string().min(2, 'Min length 2 characters').max(50, 'Max length 50 characters').optional().nullable(),
    liaisonEmail: Yup.string()
      .optional()
      .nullable()
      .email('Invalid email format.')
      .matches(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format.'),
    liaisonPhoneNumber: liaisonPhoneNumber,
  })
  .when('program', {
    is: (val: Program) => val !== Program.EMCR,
    then: () => Yup.object(),
  });

export const emergencyContactDetailsSchema = Yup.object().shape({
  emergencyContactFirstName: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(50, 'Max length 50 characters')
    .required("Emergency contact's first name is required."),
  emergencyContactLastName: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(50, 'Max length 50 characters')
    .required("Emergency contact's last name is required."),
  emergencyContactPhoneNumber: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter digits only. ex: 5555555555',
      phoneNumber,
    )
    .required('Emergency contact phone number is required.'),
  emergencyContactRelationship: Yup.string().required('Relationship is required.'),
});


const languageSchema = Yup.object().shape({
  language: Yup.string().when('languageProficiency', {
    is: (val: string) => val,
    then: ()=> Yup.string().required('Language is required')
  }),
  languageProficiency: Yup.string().when('language', {
    is: (val: string) => val,
    then: () => Yup.string().required('Proficiency Level is required.'),
  }),
}, [['language', 'languageProficiency']])

export const languageSkillsSchema = Yup.object()
  .shape({
    languages: Yup.array()
      .of(
        languageSchema
      )
  })
  
const toolSchema = Yup.object().shape({
  tool: Yup.object().when('toolProficiency', {
    is: (val: string) => !val, 
    then:()=> Yup.object().notRequired(),
    otherwise:() => Yup.object().required("Tool/Software is required"),
  }),
  toolProficiency: Yup.string().when('tool', {
    is: (val: {id: number, name: string}) => val,
    then:() => Yup.string().required("Tool Proficiency is required"),
  }), 
}, [['tool', 'toolProficiency']]
)

export const softwareSkillsSchema = Yup.object().shape({
  tools: Yup.array().of(
    toolSchema)})


const programStepValidation = Yup.object().shape({
  program: Yup.string().required('Program is required.'),
  acknowledgement: Yup.array().when('program', {
      is: (val: Program) => val === Program.EMCR,
      then: () =>
        Yup.array().min(2, 'All acknowledgement fields must be checked'),
      otherwise: () =>
        Yup.array().min(5, 'All acknowledgement fields must be checked'),
    }),
});



const certificationsSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      certification: Yup.object().when('expiry', {
        is: (val: Date)=> !val,
        then:()=>  Yup.object().notRequired(),
        otherwise: ()=> Yup.object().required('Certification Name is required')
      }).shape({
        id: Yup.number().when('expiry', {
          is: (val: Date)=> val !== undefined,
          then: ()=> Yup.number().required()
        }),
        name: Yup.string(),
      }),
      expiry: Yup.date(),
    }),
  ),
  driverLicense: Yup.array().optional(),
});

const personnelStepValidation = personalDetailsSchema
  .concat(employmentDetailsSchema)
  .concat(supervisorDetailsSchema)
  .concat(liaisonDetailsSchema)
  .concat(emergencyContactDetailsSchema);





const skillsValidation = languageSkillsSchema
  .concat(softwareSkillsSchema)
  .concat(certificationsSchema);

const reviewAckValidation = Yup.object().shape({
  reviewAck: Yup.boolean()
    .isTrue('Please select acknowledgement field in order to submit')
    .required('Please select acknowledgement field in order to submit'),
});

const reviewValidation = programStepValidation
  .concat(personnelStepValidation)
  .concat(experiencesValidation)
  .concat(skillsValidation)
  .concat(reviewAckValidation);



export const stepValidation = [
  programStepValidation,
  personnelStepValidation,
  experiencesValidation,
  skillsValidation,
  reviewValidation,
  
];

export const formValidation = programStepValidation
  .concat(personnelStepValidation)
  .concat(experiencesValidation)
  .concat(skillsValidation)
  .concat(reviewValidation);
