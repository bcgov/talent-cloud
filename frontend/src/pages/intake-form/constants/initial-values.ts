// common
import { Section } from '@/common/enums/sections.enum';
import type {
  GeneralEmergencyManagementExperience,
  SectionRolesBcws,
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
  SectionRolesBcws &
  SectionChoiceEmcr &
  SectionChoiceBcws = {
  emergencyExperience: undefined,
  preocExperience: undefined,
  peccExperience: undefined,
  firstNationsExperience: undefined,
  functions: [],
  firstChoiceSection: '',
  secondChoiceSection: '',
  thirdChoiceSection: '',
  firstChoiceFunction: '',
  secondChoiceFunction: '',
  thirdChoiceFunction: '',
  roles: [
    { [Section.PLANNING.toString()]: [] },
    { [Section.LOGISTICS.toString()]: [] },
    { [Section.FINANCE_ADMIN.toString()]: [] },
    { [Section.OPERATIONS.toString()]: [] },
    { [Section.COMMAND.toString()]: [] },
    { [Section.AVIATION.toString()]: [] },
  ],
};

export const skillsDetails: Skills = {
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

export const programDetails: ProgramAck = {
  program: undefined,
  acknowledgement: [],
};

export const initialValueSteps: {
  0: ProgramAck;
  1: PersonalDetails;
  2: GeneralEmergencyManagementExperience &
    SectionRolesBcws &
    SectionChoiceEmcr &
    SectionChoiceBcws;
  3: Skills;
  4: any;
  5: any;
} = {
  0: programDetails,
  1: personalAndEmployeeDetails,
  2: experienceDetails,
  3: skillsDetails,
  4: {},
  5: {},
};

export const intakeFormInitialValues: IntakeFormValues = {
  ...programDetails,
  ...personalAndEmployeeDetails,
  ...experienceDetails,
  ...skillsDetails,
};
