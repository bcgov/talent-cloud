// common
import type { BcwsRoleInterface, FunctionType, Location } from '@/common';
import type { Program } from '@/common';
import type { Expectations } from './tabs';

// personal & employee information

// personal details
export const liaisonDetails: LiaisonDetails = {
  liaisonUnknown: false,
  liaisonFirstName: '',
  liaisonLastName: '',
  liaisonEmail: '',
  liaisonPhoneNumber: '',
};
export interface PersonalDetails {
  firstName: string;
  lastName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  homeLocation?: Location;
  email: string;
}
export const personalDetails: PersonalDetails = {
  firstName: '',
  lastName: '',
  primaryPhone: '',
  secondaryPhone: '',
  homeLocation: undefined,
  email: '',
};

// employment details

export interface EmploymentDetails {
  jobTitle: string;
  employeeId: string;
  email: string;
  workPhone: string;
  ministry: string;
  division: string;
}

export const employmentDetails: EmploymentDetails = {
  jobTitle: '',
  employeeId: '',
  email: '',
  workPhone: '',
  ministry: '',
  division: '',
};

// supervisor and liaison details, travel preferences

export interface SupervisorDetails {
  supervisorFirstName: string;
  supervisorLastName: string;
  supervisorEmail: string;
  supervisorPhone?: string;
}
export interface LiaisonDetails {
  liaisonUnknown?: boolean;
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonEmail?: string;
  liaisonPhoneNumber?: string;
}

export const supervisorDetails: SupervisorDetails = {
  supervisorFirstName: '',
  supervisorLastName: '',
  supervisorEmail: '',
  supervisorPhone: '',
};

// emergency contact details

export interface EmergencyContactDetails {
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactRelationship: string;
}

export const emergencyContactDetails: EmergencyContactDetails = {
  emergencyContactFirstName: '',
  emergencyContactLastName: '',
  emergencyContactPhoneNumber: '',
  emergencyContactRelationship: '',
};

// experience and section interests

// emcr section(s) interest

export interface GeneralEmergencyManagementExperience {
  emergencyExperience: boolean;
  preocExperience: boolean;
  peccExperience: boolean;
  firstNationsWorking: boolean;
}

export const generalEmergencyManagementExperience: GeneralEmergencyManagementExperience =
  {
    emergencyExperience: false,
    preocExperience: false,
    peccExperience: false,
    firstNationsWorking: false,
  };

export interface SectionChoiceEmcr {
  firstChoiceFunction: string;
  secondChoiceFunction?: string;
  thirdChoiceFunction?: string;
}

export interface SectionChoiceBcws {
  firstChoiceSection: string;
  secondChoiceSection?: string;
  thirdChoiceSection?: string;
}

export interface SectionInterestEmcr {
  advancePlanningUnit?: boolean;
  deputyDirector?: boolean;
  ess?: boolean;
  finance?: boolean;
  firstNationsBranch?: boolean;
  liaison?: boolean;
  logistics?: boolean;
  operations?: boolean;
  planning?: boolean;
  recovery?: boolean;
}

export const sectionInterestEmcr: SectionInterestEmcr = {
  advancePlanningUnit: false,
  deputyDirector: false,
  ess: false,
  finance: false,
  firstNationsBranch: false,
  liaison: false,
  logistics: false,
  operations: false,
  planning: false,
  recovery: false,
};

export interface SectionRolesBcws {
  planning?: BcwsRoleInterface[];
  logistics?: BcwsRoleInterface[];
  finance?: BcwsRoleInterface[];
  operations?: BcwsRoleInterface[];
  command?: BcwsRoleInterface[];
  aviation?: BcwsRoleInterface[];
}

export const sectionRolesBcws: SectionRolesBcws = {
  planning: [],
  logistics: [],
  finance: [],
  operations: [],
  command: [],
  aviation: [],
};

// other skills & qualifications

export interface LanguageSkill {
  language: string;
  languageProficiency: string;
}

export const languageSkills: LanguageSkill[] = [
  {
    language: '',
    languageProficiency: '',
  },
];

export interface ToolsSkill {
  tool: string;
  proficiencyLevel: string;
}

export const toolSkills: ToolsSkill[] = [
  {
    tool: '',
    proficiencyLevel: '',
  },
];

export interface CertificationSkill {
  name: string;
  id: number;
  expiry?: string;
}

// review & submit

export interface ReviewAndSubmit {
  acknowledgeSubmit: boolean;
}

export const reviewAndSubmit: ReviewAndSubmit = {
  acknowledgeSubmit: false,
};

// form interface
export type IntakeFormSubmissionData = {
  id: string;
  createdByEmail: string;
  program: Program; //
  currentProgram: Program;
  formData: IntakeFormValues;
};

export type IntakeFormValues = PersonalDetails &
  EmploymentDetails &
  SupervisorDetails &
  EmergencyContactDetails &
  SectionChoiceBcws &
  SectionChoiceEmcr &
  LiaisonDetails &
  GeneralEmergencyManagementExperience & {
    functions: FunctionType[];
    travelPreferenceEmcr: string;
    travelPreferenceBcws: string;
    program?: string;
    acknowledgement?: Expectations[];
    paylistId: string;
    roles: BcwsRoleInterface[];
    languages?: LanguageSkill[];
    tools?: ToolsSkill[];
    certifications?: CertificationSkill[];
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
  functions: [],

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
