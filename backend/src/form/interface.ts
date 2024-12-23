import {
  FireCentre,
  LanguageProficiency,
  Ministry,
  Region,
} from '../common/enums';

export interface FormSubmissionEventPayload {
  formId: string;
  formVersion: string;
  subscriptionEvent: string;
  submissionId: string;
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
  region: Region;
  fire_centre: FireCentre;
  location_name: string;
}

export type FormDeployment =
  | 'remoteOnly'
  | 'travelHome'
  | 'travelFireZone'
  | 'travelFireCentre'
  | 'travelRegion'
  | 'travelAnywhere';

export interface PersonnelFormData {
  program: string;
  jobTitle: string;
  email: string;
  firstAidExpiry?: string;
  lastName: string;
  firstName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  workPhone?: string;
  unionMembership: string;
  supervisorEmail: string;
  supervisorPhone?: string;
  supervisorLastName: string;
  supervisorPhoneNumber: string;
  supervisorFirstName: string;
  workEmail: string;
  homeLocation: LocationData;
  workLocation: LocationData;
  deployment: {
    bcws?: FormDeployment;
    emcr?: FormDeployment;
    both?: FormDeployment;
  };
  willingToTravel: boolean;
  firstAidLevel: string;
  dl: string[];
  pfa: string;
  ministry: { label: string; value: string };
  division?: string;
  languages?: LanguagesFormSection[];
  tools?: ToolsFormSection[];
  certificates?: CertsFormSection[];
  foodSafe1Expiry?: string;
  foodSafe2Expiry?: string;
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactRelationship: string;
  employeeId?: string;
  paylistId?: string;
}

export interface ToolsFormSection {
  name: {
    id: number;
    name: string;
    label: string;
  };
  proficiency: {
    name: string;
    label: string;
    value: string;
  };
}

export interface CertsFormSection {
  id: number;
  name: string;
}

interface RolesFormSection {
  id: number;
  name: string;
  label: string;
  section: string;
}

export interface SectionsFormSection {
  PLANNING?: { role: RolesFormSection; experience: string }[];
  LOGISTICS: { role: RolesFormSection; experience: string }[];
  FINANCE_ADMIN: { role: RolesFormSection; experience: string }[];
  OPERATIONS: { role: RolesFormSection; experience: string }[];
  COMMAND: { role: RolesFormSection; experience: string }[];
  AVIATION: { role: RolesFormSection; experience: string }[];
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
  sections?: SectionsFormSection;
  employeeId: string;
  division: DivisionSection;
  paylistId: string;
  firstChoiceSection: string;
  secondChoiceSection?: string;
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
  };
  experience: {
    emergencyExperience: boolean;
    preocExperience: boolean;
    peccExperience: boolean;
    firstNationsWorking: boolean;
  };
}

export interface IntakeFormData {
  personnel: PersonnelFormData;
  bcws?: BcwsFormData;
  emcr?: EmcrFormData;
}
