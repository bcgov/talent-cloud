// common
import { Section } from '@/common/enums/sections.enum';
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
    emergencyExperience: undefined,
    preocExperience: undefined,
    peccExperience: undefined,
    firstNationsExperience: undefined,
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
  homeLocation: '',
  firstChoiceFunction: '',
  secondChoiceFunction: '',
  thirdChoiceFunction: '',
  travelPreferenceEmcr: '',
  ...generalEmergencyManagementExperience,
  functions: [],
  firstChoiceSection: '',
  secondChoiceSection: '',
  thirdChoiceSection: '',
  unionMembership: '',
  roles: [
    { [Section.PLANNING]: [] },
    { [Section.LOGISTICS]: [] },
    { [Section.FINANCE_ADMIN]: [] },
    { [Section.OPERATIONS]: [] },
    { [Section.COMMAND]: [] },
    { [Section.AVIATION]: [] },
  ],
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
      toolId: '',
      toolProficiency: '',
    },
  ],
  certifications: [
    {
      certificationId: '',
    },
  ],
  driverLicense: [],
};
