import { BcwsRole, ExperienceLevel, FireCentre, LanguageProficiency, Ministry, Region, Section, Tools } from "../common/enums";

export interface FormSubmissionEventPayload {
  formId: string;
  formVersion: string;
  subscriptionEvent: string;
  submissionId: string;
}

export interface FirstAid {
  expiryDate?: string;
  level: string;
}

export interface Roles {
  Ops: boolean;
  FN: boolean;
  ESS: boolean;
  Fin: boolean;
  apu: boolean;
  DDir: boolean;
  Logs: boolean;
  Plans: boolean;
  Liaison: boolean;
  Recovery: boolean;
}
export interface FirstNationExperience {
  living?: boolean;
  working?: boolean;
}

interface LocationData {
  id: number;
  region: Region
  fire_centre: FireCentre
  location_name: string;
}

export interface PersonnelFormData {
  program: string;
  jobTitle: string;
  email: string;
  firstAidExpiry?: Date;
  lastName: string;
  firstName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  workPhone?: string;
  unionMembership: string;
  supervisorEmail: string;
  supervisorPhone?: string;
  supervisorLastName: string;
  supervisorPhoneNumber: string
  supervisorFirstName: string;
  workEmail: string;
  homeLocation: LocationData
  workLocation: LocationData,
  deployment: 'remoteOnly' | 'willingToTravel';
  willingToTravel: boolean;
  firstAidLevel: FirstAid
  dl: string[];
  pfa: boolean;
  ministry: {label: string; value: Ministry};
  division?: string;
}

export interface ToolsFormSection {

  name: {
    id: number,
    name: Tools,
    label: string
  },
  proficiency: {
    name: string,
    label: string,
    value: string
  }

}

export interface CertsFormSection {
  id: number;
  name: string;
}

interface RolesFormSection {
  id: number
  name: BcwsRole
  label: string;
  section: Section
}



export interface SectionsFormSection {
  PLANNING?: { role: RolesFormSection, experience: ExperienceLevel }[];
  LOGISTICS: { role: RolesFormSection, experience: ExperienceLevel }[];
  FINANCE_ADMIN: { role: RolesFormSection, experience: ExperienceLevel }[];
  OPERATIONS: { role: RolesFormSection, experience: ExperienceLevel }[];
  COMMAND: { role: RolesFormSection, experience: ExperienceLevel }[];
  AVIATION: { role: RolesFormSection, experience: ExperienceLevel }[];
}

export interface LanguagesFormSection {
  language: string;
  proficiency: LanguageProficiency;

}


export interface DivisionSection {
  id: number;
  ministry: Ministry;
  division_name: string;
}
export interface BcwsFormData {

  certificationContainer?: {
    bcws: {
      foodSafe1Expiry?: Date;
      foodSafe2Expiry?: Date;
    }, 
    certificates?: CertsFormSection[]
  };
  sections: SectionsFormSection;
  
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactRelationship: string;
  employeeId: string;
  division: DivisionSection;
  paylistId: string;
  firstChoiceSection: Section;
  secondChoiceSection: Section;
  languages?: LanguagesFormSection[];
  tools?: ToolsFormSection[];
  purchaseCard: boolean;
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonEmail?: string;
  liaisonPhoneNumber?: string;
}

export interface EmcrFormData {
  functions: {
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
    7: boolean;
    8: boolean;
    9: boolean;
    10: boolean;
  },
  experience: {
    emergencyExperience: boolean;
    preocExperience: boolean;
    peccExperience: boolean;
    firstNationsWorking: boolean;
  }
}

export interface IntakeFormData {
  personnel: PersonnelFormData;
  bcws?: BcwsFormData
  emcr?: EmcrFormData;
}
