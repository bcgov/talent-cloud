// common

import type {
  GeneralEmergencyManagementExperience,
  ReviewAndSubmit,
  PersonalDetails,
  EmploymentDetails,
  SupervisorDetails,
  EmergencyContactDetails,
  LiaisonDetails,
  SectionChoiceEmcr,
  SectionChoiceBcws,
  Skills,
  ProgramAck,
  IntakeFormValues,
  BCWSRoles,
} from './types';

export const reviewAndSubmit: ReviewAndSubmit = {
  acknowledgeSubmit: false,
};

export const personalAndEmployeeDetails: PersonalDetails &
  EmploymentDetails &
  SupervisorDetails &
  EmergencyContactDetails &
  LiaisonDetails = {
  firstName: '',
  lastName: '',
  primaryPhoneNumber: '',
  secondaryPhoneNumber: '',
  homeLocation: undefined,
  email: '',
  jobTitle: '',
  employeeId: '',
  workPhoneNumber: '',
  ministry: '',
  division: '',
  purchaseCardHolder: '',
  supervisorFirstName: '',
  supervisorLastName: '',
  supervisorEmail: '',
  supervisorPhoneNumber: '',
  emergencyContactFirstName: '',
  emergencyContactLastName: '',
  emergencyContactPhoneNumber: '',
  emergencyContactRelationship: '',
  unionMembership: '',
  liaisonUnknown: 'false',
  liaisonFirstName: '',
  liaisonLastName: '',
  liaisonEmail: '',
  liaisonPhoneNumber: '',
  travelPreferenceBcws: '',
  travelPreferenceEmcr: '',
  paylistId: '',
};

export const experienceDetails: GeneralEmergencyManagementExperience &
  SectionChoiceEmcr &
  SectionChoiceBcws &
  BCWSRoles = {
  emergencyExperience: undefined,
  preocExperience: undefined,
  peccExperience: undefined,
  firstNationsExperience: undefined,
  functions: [],
  PLANNING: [],
  LOGISTICS: [],
  FINANCE_ADMIN: [],
  OPERATIONS: [],
  COMMAND: [],
  AVIATION: [],
};

export const skillsDetails: Skills = {
  languages: [
    {
      language: '',
      languageProficiency: '',
    },
  ],
  tools: [{ tool: undefined, toolProficiency: '' }],
  certifications: [
    {
      certification: undefined,
      expiry: undefined,
    },
  ],
  driverLicense: [],
};

export const programDetails: ProgramAck = {
  program: '',
  acknowledgement: [],
  disabledProgram: '',
};

export const intakeFormInitialValues: IntakeFormValues = {
  step: 0,
  completedSteps: [],
  errorSteps: [],
  reviewAck: undefined,
  ...programDetails,
  ...personalAndEmployeeDetails,
  ...experienceDetails,
  ...skillsDetails,
};
