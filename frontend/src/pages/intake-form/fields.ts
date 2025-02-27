// common
import {
  BcwsRoleInterface,
  Languages,
  Location,
  PersonnelTool,
  Program,
} from '@/common';

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
  approvedBySupervisor: boolean;
}

export type AcknowledgementBcws = AcknowledgementEmcr & {
  orientation: boolean;
  willingnessStatement: boolean;
  parQ: boolean;
};

export type AcknowledgementBoth = AcknowledgementEmcr & AcknowledgementBcws;

export const acknowledgementEmcr: AcknowledgementEmcr = {
  expectations: false,
  approvedBySupervisor: false,
};

export const acknowledgementBcws: AcknowledgementBcws = {
  expectations: false,
  approvedBySupervisor: false,
  orientation: false,
  willingnessStatement: false,
  parQ: false,
};

export const acknowledgementBoth: AcknowledgementBoth = {
  expectations: false,
  approvedBySupervisor: false,
  orientation: false,
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
  homeLocation?: Location;
}
export const personalDetails: PersonalDetails = {
  firstName: '',
  lastName: '',
  primaryPhone: '',
  secondaryPhone: '',
  homeLocation: undefined,
};

// employment details

export interface EmploymentDetails {
  jobTitle: string;
  employeeId: string;
  email: string;
  workPhone: string;
  ministry: string;
  division: string;
  paylistId: string;
  purchaseCardHolder: boolean;
}

export const employmentDetails: EmploymentDetails = {
  jobTitle: '',
  employeeId: '',
  email: '',
  workPhone: '',
  ministry: '',
  division: '',
  paylistId: '',
  purchaseCardHolder: false,
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
  liaisonPhoneNumber: '',
};

export const travelDetails: TravelDetails = {
  travelPreferences: '',
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
  firstChoiceFunction: string;
  secondChoiceFunction?: string;
  thirdChoiceFunction?: string;
}

export const sectionChoiceEmcr: SectionChoiceEmcr = {
  firstChoiceFunction: '',
  secondChoiceFunction: '',
  thirdChoiceFunction: '',
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
  firstChoiceSection: string;
  secondChoiceSection?: string;
  thirdChoiceSection?: string;
}

export const sectionChoiceBcws: SectionChoiceBcws = {
  firstChoiceSection: '',
  secondChoiceSection: '',
  thirdChoiceSection: '',
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

export interface LanguageSkills {
  languages?: Languages[];
}

export const languageSkills: LanguageSkills = {
  languages: [],
};

export interface SoftwareSkills {
  tools?: PersonnelTool[];
}

export const softwareSkills: SoftwareSkills = {
  tools: [],
};

export interface OtherCertifications {
  highestOfaCompleted?: string;
  driverLicenseQualifications?: string[];
  certifiedPfa: string;
  otherCertifications?: string[];
}

export const otherCertifications: OtherCertifications = {
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
