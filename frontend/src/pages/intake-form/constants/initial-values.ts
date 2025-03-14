// common
import type {
  LiaisonDetails,
  PersonalDetails,
  EmploymentDetails,
  SupervisorDetails,
  EmergencyContactDetails,
  GeneralEmergencyManagementExperience,
  SectionRolesBcws,
  ReviewAndSubmit,
  IntakeFormValues,
} from './types';

// personal & employee information

// personal details
export const liaisonDetails: LiaisonDetails = {
  liaisonUnknown: false,
  liaisonFirstName: '',
  liaisonLastName: '',
  liaisonEmail: '',
  liaisonPhoneNumber: '',
};

export const personalDetails: PersonalDetails = {
  firstName: '',
  lastName: '',
  primaryPhone: '',
  secondaryPhone: '',
  homeLocation: undefined,
  email: '',
};

export const employmentDetails: EmploymentDetails = {
  jobTitle: '',
  employeeId: '',
  email: '',
  workPhone: '',
  ministry: '',
  division: '',
};

export const supervisorDetails: SupervisorDetails = {
  supervisorFirstName: '',
  supervisorLastName: '',
  supervisorEmail: '',
  supervisorPhone: '',
};

// emergency contact details

export const emergencyContactDetails: EmergencyContactDetails = {
  emergencyContactFirstName: '',
  emergencyContactLastName: '',
  emergencyContactPhoneNumber: '',
  emergencyContactRelationship: '',
};

export const generalEmergencyManagementExperience: GeneralEmergencyManagementExperience =
  {
    emergencyExperience: false,
    preocExperience: false,
    peccExperience: false,
    firstNationsWorking: false,
  };

export const sectionRolesBcws: SectionRolesBcws = {
  planning: [],
  logistics: [],
  finance: [],
  operations: [],
  command: [],
  aviation: [],
};

export const reviewAndSubmit: ReviewAndSubmit = {
  acknowledgeSubmit: false,
};

export const intakeFormInitialValues: IntakeFormValues = {
  program: '',
  acknowledgement: [],

  ...personalDetails,
  ...employmentDetails,
  ...supervisorDetails,
  ...emergencyContactDetails,

  firstChoiceFunction: '',
  secondChoiceFunction: '',
  thirdChoiceFunction: '',
  travelPreferenceEmcr: '',
  ...generalEmergencyManagementExperience,
  functions: [''],
  firstChoiceSection: '',
  secondChoiceSection: '',
  thirdChoiceSection: '',
  roles: [],
  ...liaisonDetails,
  travelPreferenceBcws: '',
  paylistId: '',
  languages: [
    {
      language: '',
      languageProficiency: '',
    },
  ],
  tools: [
    {
      tool: '',
      proficiencyLevel: '',
    },
  ],
  certifications: [
    {
      name: '',
      id: 0,
      expiry: '',
    },
  ],
};
