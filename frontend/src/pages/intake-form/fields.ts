import { Program } from '@/common';

export interface ProgramFields {
  program?: Program;
}
// core team program selection
export const programFields: ProgramFields = {
  program: undefined,
};

// acknowledgement for selected program stream(s)
export interface AcknowledgementEmcr {
  expectations: boolean;
  supervisorApproval: boolean;
}

export type AcknowledgementBcws = AcknowledgementEmcr & {
  training: boolean;
  willingnessStatement: boolean;
  parQ: boolean;
};

export type AcknowledgementBoth = AcknowledgementEmcr & AcknowledgementBcws;

export const acknowledgementEmcr: AcknowledgementEmcr = {
  expectations: false,
  supervisorApproval: false,
};

export const acknowledgementBcws: AcknowledgementBcws = {
  expectations: false,
  supervisorApproval: false,
  training: false,
  willingnessStatement: false,
  parQ: false,
};

export const acknowledgementBoth: AcknowledgementBoth = {
  expectations: false,
  supervisorApproval: false,
  training: false,
  willingnessStatement: false,
  parQ: false,
};

// personal & employee information

// personal details

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  homeLocation: string;
}
export const personalDetails: PersonalDetails = {
  firstName: '',
  lastName: '',
  primaryPhone: '',
  secondaryPhone: '',
  homeLocation: '',
};

// employment details

export interface EmploymentDetails {
  jobTitle: string;
  bcGovEmployeeNumber: string;
  bcGovEmail: string;
  workPhone: string;
  ministry: string;
  division: string;
  deptId: string;
  purchaseCardHolder: string;
}

export const employmentDetails: EmploymentDetails = {
  jobTitle: '',
  bcGovEmployeeNumber: '',
  bcGovEmail: '',
  workPhone: '',
  ministry: '',
  division: '',
  deptId: '',
  purchaseCardHolder: '',
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
  liaisonPhone?: string;
}
export interface TravelDetails {
  travelPreferences: string;
}

export const supervisorDetails: SupervisorDetails = {
  supervisorFirstName: '',
  supervisorLastName: '',
  supervisorEmail: '',
  supervisorPhone: '',
};

export const liaisonDetails: LiaisonDetails = {
  liaisonUnknown: false,
  liaisonFirstName: '',
  liaisonLastName: '',
  liaisonEmail: '',
  liaisonPhone: '',
};

export const travelDetails: TravelDetails = {
  travelPreferences: '',
};

// emergency contact details

export interface EmergencyContactDetails {
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
}

export const emergencyContactDetails: EmergencyContactDetails = {
  emergencyFirstName: '',
  emergencyLastName: '',
  emergencyPhone: '',
  emergencyRelationship: '',
};

// experience and section interests

// emcr section(s) interest

export interface GeneralEmergencyManagementExperience {
  directExperience: boolean;
  preocExperience: boolean;
  peccExperience: boolean;
  indigenousExperience: boolean;
}

export const generalEmergencyManagementExperience: GeneralEmergencyManagementExperience =
  {
    directExperience: false,
    preocExperience: false,
    peccExperience: false,
    indigenousExperience: false,
  };

export interface SectionChoiceEmcr {
  firstChoiceEmcr: string;
  secondChoiceEmcr?: string;
  thirdChoiceEmcr?: string;
}

export const sectionChoiceEmcr: SectionChoiceEmcr = {
  firstChoiceEmcr: '',
  secondChoiceEmcr: '',
  thirdChoiceEmcr: '',
};

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

// bcws section(s) & role(s) interest

export interface SectionChoiceBcws {
  firstChoiceBcws: string;
  secondChoiceBcws?: string;
  thirdChoiceBcws?: string;
}

export const sectionChoiceBcws: SectionChoiceBcws = {
  firstChoiceBcws: '',
  secondChoiceBcws: '',
  thirdChoiceBcws: '',
};

export interface BcwsRole {
  id: string;
  name: string;
  section: string;
}

export interface SectionRolesBcws {
  planning?: BcwsRole[];
  logistics?: BcwsRole[];
  finance?: BcwsRole[];
  operations?: BcwsRole[];
  command?: BcwsRole[];
  aviation?: BcwsRole[];
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

export interface LanguageSkills {
  languages?: { language: string; proficiencyLevel: string }[];
}

export const languageSkills: LanguageSkills = {
  languages: [],
};

export interface SoftwareSkills {
  tools?: { tool: string; proficiencyLevel: string }[];
}

export const softwareSkills: SoftwareSkills = {
  tools: [],
};

export interface Certifications {
  highestOfaCompleted?: string;
  driverLicenseQualifications?: string[];
  certifiedPfa: string;
  otherCertifications?: string[];
}

export const certifications: Certifications = {
  highestOfaCompleted: '',
  driverLicenseQualifications: [],
  certifiedPfa: '',
  otherCertifications: [],
};

// review & submit

export interface ReviewAndSubmit {
  acknowledgeSubmit: boolean;
}

export const reviewAndSubmit: ReviewAndSubmit = {
  acknowledgeSubmit: false,
};

// form interface
export interface IntakeFormInterface {
  programFields: ProgramFields;
  personalDetails: PersonalDetails;
}
