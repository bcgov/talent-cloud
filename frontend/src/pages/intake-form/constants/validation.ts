import * as Yup from 'yup';

export const programSelectionSchema = Yup.object().shape({
  program: Yup.string().required('Program is required'),
});

export const acknowledgementSchemaEmcr = Yup.object().shape({
  expectations: Yup.boolean().required(),
  supervisorApproval: Yup.boolean().required(),
});

export const acknowledgementSchemaBcws = Yup.object().shape({
  expectations: Yup.boolean().required(),
  supervisorApproval: Yup.boolean().required(),
  training: Yup.boolean().required(),
  willingnessStatement: Yup.boolean().required(),
  parQ: Yup.boolean().required(),
});

export const acknowledgementSchemaBoth = Yup.object().shape({
  expectations: Yup.boolean().required(),
  supervisorApproval: Yup.boolean().required(),
  training: Yup.boolean().required(),
  willingnessStatement: Yup.boolean().required(),
  parQ: Yup.boolean().required(),
});

export const personalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  primaryPhone: Yup.string().required('Primary phone is required'),
  secondaryPhone: Yup.string(),
  homeLocation: Yup.string().required('Home location is required'),
});

export const employmentDetailsSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required'),
  employeeId: Yup.string().required('Employee number is required'),
  email: Yup.string().required('Email is required'),
  workPhone: Yup.string().required('Work phone is required'),
  ministry: Yup.string().required('Ministry is required'),
  division: Yup.string().required('Division is required'),
  paylistId: Yup.string(),
  purchaseCardHolder: Yup.string(),
});

export const supervisorDetailsSchema = Yup.object().shape({
  supervisorFirstName: Yup.string().required("Supervisor's first name is required"),
  supervisorLastName: Yup.string().required("Supervisor's last name is required"),
  supervisorEmail: Yup.string().required("Supervisor's email is required"),
  supervisorPhone: Yup.string(),
});

export const liaisonDetailsSchema = Yup.object().shape({
  liaisonUnknown: Yup.string(),
  liaisonFirstName: Yup.string(),
  liaisonLastName: Yup.string(),
  liaisonEmail: Yup.string(),
  liaisonPhone: Yup.string(),
});

export const travelDetailsSchema = Yup.object().shape({
  travelPreference: Yup.string().required('Travel Preference is required'),
});

export const emergencyContactDetailsSchema = Yup.object().shape({
  emergencyContactFirstName: Yup.string().required(
    "Emergency contact's first name is required",
  ),
  emergencyContactLastName: Yup.string().required(
    "Emergency contact's last name is required",
  ),
  emergencyContactPhone: Yup.string().required(
    "Emergency contact's phone is required",
  ),
  emergencyContactRelationship: Yup.string().required('Relationship is required'),
});

export const generalEmergencyManagementExperienceSchema = Yup.object().shape({
  emergencyExperience: Yup.boolean().required(),
  preocExperience: Yup.boolean().required(),
  peccExperience: Yup.boolean().required(),
  firstNationsWorking: Yup.boolean().required(),
});

export const sectionChoiceEmcrSchema = Yup.object().shape({
  firstChoiceEmcr: Yup.string().required('First choice is required'),
  secondChoiceEmcr: Yup.string(),
  thirdChoiceEmcr: Yup.string(),
});

export const sectionInterestEmcrSchema = Yup.object().shape({
  advancePlanningUnit: Yup.boolean(),
  deputyDirector: Yup.boolean(),
  ess: Yup.boolean(),
  finance: Yup.boolean(),
  firstNationsBranch: Yup.boolean(),
  liaison: Yup.boolean(),
  logistics: Yup.boolean(),
  operations: Yup.boolean(),
  planning: Yup.boolean(),
  recovery: Yup.boolean(),
});

export const sectionChoiceBcwsSchema = Yup.object().shape({
  firstChoiceBcws: Yup.string().required('First choice is required'),
  secondChoiceBcws: Yup.string(),
  thirdChoiceBcws: Yup.string(),
});

export const bcwsRoleSchema = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string(),
  section: Yup.string(),
});

export const sectionRolesBcwsSchema = Yup.object().shape({
  planning: Yup.array().of(bcwsRoleSchema),
  logistics: Yup.array().of(bcwsRoleSchema),
  finance: Yup.array().of(bcwsRoleSchema),
  operations: Yup.array().of(bcwsRoleSchema),
  command: Yup.array().of(bcwsRoleSchema),
  aviation: Yup.array().of(bcwsRoleSchema),
});

export const languageSkillsSchema = Yup.object().shape({
  languages: Yup.array().of(
    Yup.object().shape({
      language: Yup.string().required('Language is required'),
      proficiencyLevel: Yup.string().required('Proficiency level is required'),
    }),
  ),
});

export const softwareSkillsSchema = Yup.object().shape({
  languages: Yup.array().of(
    Yup.object().shape({
      tool: Yup.string().required('Tool is required'),
      proficiencyLevel: Yup.string().required('Proficiency level is required'),
    }),
  ),
});

export const certificationsSchema = Yup.object().shape({
  highestOfaCompleted: Yup.string(),
  driverLicenseQualifications: Yup.array().of(Yup.string()),
  certifiedPfa: Yup.string().required('PFA is required'),
  otherCertifications: Yup.array().of(Yup.string()),
});

export const reviewAndSubmitSchema = Yup.object().shape({
  acknowledgeSubmit: Yup.boolean().required('You must acknowledge your submission'),
});

export const intakeFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  primaryPhone: Yup.string().required('Primary phone is required'),
  secondaryPhone: Yup.string().optional(),
  homeLocation: Yup.string().required('Home location is required'),

  jobTitle: Yup.string().required('Job title is required'),
  employeeId: Yup.string().required('Employee number is required'),
  email: Yup.string().required('Email is required'),
  workPhone: Yup.string().required('Work phone is required'),
  ministry: Yup.string().required('Ministry is required'),
  division: Yup.string().required('Division is required'),
  paylistId: Yup.string(),
  purchaseCardHolder: Yup.string(),

  supervisorFirstName: Yup.string().required("Supervisor's first name is required"),
  supervisorLastName: Yup.string().required("Supervisor's last name is required"),
  supervisorEmail: Yup.string().required("Supervisor's email is required"),
  supervisorPhone: Yup.string().optional(),

  liaisonUnknown: Yup.string().optional(),
  liaisonFirstName: Yup.string().optional(),
  liaisonLastName: Yup.string().optional(),
  liaisonEmail: Yup.string().optional(),
  liaisonPhone: Yup.string().optional(),

  travelPreferenceBcws: Yup.string(),
  travelPreferenceEmcr: Yup.string(),

  emergencyContactFirstName: Yup.string().required(
    "Emergency contact's first name is required",
  ),
  emergencyContactLastName: Yup.string().required(
    "Emergency contact's last name is required",
  ),
  emergencyContactPhone: Yup.string().required(
    "Emergency contact's phone is required",
  ),
  emergencyContactRelationship: Yup.string().required('Relationship is required'),

  emergencyExperience: Yup.boolean().required(),
  preocExperience: Yup.boolean().required(),
  peccExperience: Yup.boolean().required(),
  firstNationsExperience: Yup.boolean().required(),
});

const programStepValidation = Yup.object().shape({
  program: Yup.string().required('Program is required'),
  acknowledgement: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one acknowledgement is required'),
});
const personnelStepValidation = personalDetailsSchema
  .concat(employmentDetailsSchema)
  .concat(supervisorDetailsSchema)
  .concat(liaisonDetailsSchema)
  .concat(travelDetailsSchema)
  .concat(emergencyContactDetailsSchema)
  .concat(generalEmergencyManagementExperienceSchema);
export const stepValidation = [programStepValidation, personnelStepValidation];
