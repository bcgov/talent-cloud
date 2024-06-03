import { Ministry } from "../common/enums";

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
export interface OtherQualifications {
  dl: string[];
  pfa?: boolean | string;
  firstAid: FirstAid;
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
  living?: boolean | string;
  working?: boolean | string;
}
export interface Experience {
  pecc?: boolean | string;
  preoc?: boolean | string;
  emergency?: boolean | string;
  firstNations?: FirstNationExperience;
}
export interface WorkDetails {
  jobTitle: string;
  ministry: Ministry;
  workEmail: string;
  workPhone: string;
  workLocation: string;
  unionMembership: string;
}

export interface SupervisorInfo {
  supervisorEmail: string;
  supervisorLastName: string;
  supervisorFirstName: string;
}
export interface PersonalDetails {
  lastName: string;
  firstName: string;
  homeLocation: string;
  primaryPhone: string;
  secondaryPhone?: string;
  ministry: Ministry;
}
export interface DeploymentPreferences {
  remoteOnly: boolean;
  willingToTravel: boolean;
}

export interface IntakeFormData {
  personalDetails: PersonalDetails;
  supervisorInfo: SupervisorInfo;
  workDetails: WorkDetails;
  deploymentPreferences: DeploymentPreferences;
  experience: Experience;
  roles: Roles;
  other: OtherQualifications;
}
