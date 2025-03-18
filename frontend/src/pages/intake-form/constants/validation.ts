import { Program } from '@/common';
import { Section } from '@/common/enums/sections.enum';
import {
  firstName,
  lastName,
  liaisonPhoneNumber,
  phoneNumber,
  primaryPhone,
  secondaryPhone,
  supervisorEmail,
  supervisorPhone,
  workPhone,
} from '@/components/profile/forms/constants';
import * as Yup from 'yup';

export const programSelectionSchema = Yup.object().shape({
  program: Yup.string().required('Program is required'),
});

export const personalDetailsSchema = Yup.object().shape({
  firstName: firstName,
  lastName: lastName,
  primaryPhone: primaryPhone,
  secondaryPhone: secondaryPhone,
  homeLocation: Yup.string().required('Home location is required'),
});

export const employmentDetailsSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required'),
  employeeId: Yup.string().min(6).max(6).required('Employee number is required'),
  email: Yup.string().required('Email is required'),
  workPhone: workPhone,
  ministry: Yup.string().required('Ministry is required'),
  division: Yup.string().required('Division is required'),
  paylistId: Yup.string().when('program', {
    is: (val: Program) => val !== Program.EMCR,
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string().required('Paylist ID is required'),
  }),
  purchaseCardHolder: Yup.string().optional(),
});

export const supervisorDetailsSchema = Yup.object().shape({
  supervisorFirstName: Yup.string()
    .min(2, 'Min length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required("Supervisor's first name is required"),

  supervisorLastName: Yup.string()
    .min(2, 'Min length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required("Supervisor's last name is required"),
  supervisorEmail: supervisorEmail,
  supervisorPhone: supervisorPhone,
});

export const liaisonDetailsSchema = Yup.object().shape({
  liaisonUnknown: Yup.string().optional(),
  liaisonFirstName: Yup.string().min(2).max(50),
  liaisonLastName: Yup.string().min(2).max(50),
  liaisonEmail: supervisorEmail,
  liaisonPhone: liaisonPhoneNumber,
});

export const travelDetailsSchema = Yup.object().shape({
  travelPreferenceBcws: Yup.string().when('program', {
    is: (val: Program) => val === Program.BCWS || val === Program.ALL,
    then: () => Yup.string().required('This is a required field'),
    otherwise: () => Yup.string().notRequired(),
  }),
  travelPreferenceEmcr: Yup.string().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () => Yup.string().required('This is a required field'),
    otherwise: () => Yup.string().notRequired(),
  }),
});

export const emergencyContactDetailsSchema = Yup.object().shape({
  emergencyContactFirstName: Yup.string()
    .min(2)
    .max(50)
    .required("Emergency contact's first name is required"),
  emergencyContactLastName: Yup.string()
    .min(2)
    .max(50)
    .required("Emergency contact's last name is required"),
  emergencyContactPhone: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter digits only. ex: 5555555555',
      phoneNumber,
    )
    .required('Emergency contact phone number is required'),
  emergencyContactRelationship: Yup.string().required('Relationship is required'),
});

export const generalEmergencyManagementExperienceSchema = Yup.object().shape({
  emergencyExperience: Yup.string().required('Emergency Experience is required'),
  preocExperience: Yup.string().required('PREOC Experience is required'),
  peccExperience: Yup.string().required('PECC Experience is required'),
  firstNationsExperience: Yup.string().required(
    'First Nations Experience is required',
  ),
});

export const sectionChoiceEmcrSchema = Yup.object().shape({
  firstChoiceFunction: Yup.string().when('program', {
    is: (val: Program) => val !== Program.BCWS,
    then: () => Yup.string().required('First choice is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  secondChoiceFunction: Yup.string().optional().nullable(),
  thirdChoiceFunction: Yup.string().optional().nullable(),
});

export const sectionChoiceBcwsSchema = Yup.object().shape({
  firstChoiceSection: Yup.string().when('program', {
    is: (val: Program) => val !== Program.EMCR,
    then: () => Yup.string().required('First choice is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  secondChoiceSection: Yup.string().optional(),
  thirdChoiceSection: Yup.string().optional(),
});
export const firstChoiceTest = (value: any) => {
  if (value === '' || !value || value === null) {
    return true;
  } else return value?.toString().replace(/[^\d]/g, '').length === 10;
};

export const sectionRolesBcwsSchema = Yup.object().shape({
  roles: Yup.array()
    .of(
      Yup.object().shape({
        [Section.PLANNING]: Yup.array()
          .of(Yup.string())
          .when('firstChoiceSection', {
            is: (val: string) => val === Section.PLANNING,
            then: () =>
              Yup.array()
                .of(Yup.string())
                .min(1)
                .required('Choose at least one role from your preferred section(s)'),
          }),
        [Section.LOGISTICS]: Yup.array().of(
          Yup.string().required('Roles are required'),
        ),
        [Section.FINANCE_ADMIN]: Yup.array().of(
          Yup.string().required('Roles are required'),
        ),
        [Section.OPERATIONS]: Yup.array().of(
          Yup.string().required('Roles are required'),
        ),
        [Section.AVIATION]: Yup.array().of(
          Yup.string().required('Roles are required'),
        ),
        [Section.COMMAND]: Yup.array().of(
          Yup.string().required('Roles are required'),
        ),
      }),
    )
    .test('firstChoiceSection', 'Roles are required', (value) => {
      console.log(value);
    }),
});

export const languageSkillsSchema = Yup.object().shape({
  languages: Yup.array()
    .of(
      Yup.object().shape({
        language: Yup.string(),
        languageProficiency: Yup.string().when('language', {
          is: (val: string) => val !== undefined,
          then: () => Yup.string().required('Proficiency Level is required'),
        }),
      }),
    )
    .when('language', {
      is: (val: string) => val !== undefined,
      then: () => Yup.string().required('Proficiency Level is required'),
    }),
});

export const softwareSkillsSchema = Yup.object().shape({
  tools: Yup.array().of(
    Yup.object().shape({
      toolId: Yup.string(),
      toolProficiency: Yup.string().when('toolId', {
        is: (val: string) => val !== undefined,
        then: () => Yup.string().required('Proficiency Level is required'),
      }),
    }),
  ),
});

const programStepValidation = Yup.object().shape({
  program: Yup.string().required('Program is required'),
  acknowledgement: Yup.array()
    .of(Yup.string())
    .when('program', {
      is: (val: Program) => val === Program.EMCR,
      then: () => Yup.array().of(Yup.string()).min(2).max(2),
      otherwise: () => Yup.array().of(Yup.string()).min(5).max(5),
    }),
});

const emcrFunctionSchema = Yup.object().shape({
  functions: Yup.array().of(Yup.string()).min(1),
});

const certificationsSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      certificationId: Yup.string(),
      expiry: Yup.date(),
    }),
  ),
  driverLicense: Yup.array().of(Yup.string()),
});

const personnelStepValidation = personalDetailsSchema
  .concat(employmentDetailsSchema)
  .concat(supervisorDetailsSchema)
  .concat(liaisonDetailsSchema)
  .concat(travelDetailsSchema)
  .concat(emergencyContactDetailsSchema)
  .concat(generalEmergencyManagementExperienceSchema);

const experiencesValidation = generalEmergencyManagementExperienceSchema
  .concat(sectionChoiceEmcrSchema)
  .concat(emcrFunctionSchema)
  .concat(sectionChoiceBcwsSchema)
  .concat(sectionRolesBcwsSchema);

const skillsValidation = languageSkillsSchema
  .concat(softwareSkillsSchema)
  .concat(certificationsSchema);

const reviewValidation = programStepValidation
  .concat(personnelStepValidation)
  .concat(experiencesValidation)
  .concat(skillsValidation);

const completeValidation = Yup.object().shape({
  complete: Yup.string(),
});

export const stepValidation = [
  programStepValidation,
  personnelStepValidation,
  experiencesValidation,
  skillsValidation,
  reviewValidation,
  completeValidation,
];
