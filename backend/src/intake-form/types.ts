/* eslint-disable */

import { BcwsRoleName, Section, SectionName } from "../common/enums";
import { LocationDTO } from "../personnel/dto/details/personnel-details.dto";
import { Program } from "../auth/interface";

export interface IntakeFormPersonnelData {
  completedSteps?: number[];
  errorSteps?: number[];
  step?: number;
  firstName?: string;
  lastName?: string;
  program?: Program;
  disabledProgram?: Program;
  acknowledgement?: string[]
  employeeId?: string;
  paylistId?: string;
  email: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  workPhoneNumber?: string;
  unionMembership?: string;
  supervisorFirstName?: string;
  supervisorLastName?: string;
  supervisorEmail?: string;
  supervisorPhoneNumber?: string;
  driverLicense?: string[];
  homeLocation?: LocationDTO & {
    name: string
  };
  ministry?: string
  division?: string;
  tools?: {
    tool?: {
      id: number, name: string
    }
    toolProficiency?: string
  }[];
  languages?: {
    language?: string;
    languageProficiency?: string
  }[];
  certifications?: {
    certification?: {
      id: number, name: string
    }
    expiry?: Date;
  }[];
  emergencyContactFirstName?: string;
  emergencyContactLastName?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactRelationship?: string;

  firstChoiceFunction?: {
    id: number, name: string
  }
  secondChoiceFunction?: {
    id: number, name: string
  }
  thirdChoiceFunction?: {
    id: number, name: string
  }

  firstNationsExperience?: string;
  peccExperience?: string;
  preocExperience?: string;
  emergencyExperience?: string;
  functions?: ({
    id?: number, name?: string
  }|null)[];
  purchaseCardHolder?: string
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonPhoneNumber?: string;
  liaisonEmail?: string;
  firstChoiceSection?: {
    id: Section, 
    name: SectionName
  };
  secondChoiceSection?: {
    id: Section, 
    name: SectionName
  };
  thirdChoiceSection?: {
    id: Section, 
    name: SectionName
  };
  travelPreferenceBcws?: string
  travelPreferenceEmcr?: string
  chipsLastActionDate?: Date;
  jobTitle?: string;
  PLANNING?:  {id: number, name: BcwsRoleName}[],
  LOGISTICS?: {id: number, name: BcwsRoleName}[],
  FINANCE_ADMIN?:  {id: number, name: BcwsRoleName}[],
  OPERATIONS?:  {id: number, name: BcwsRoleName}[],
  COMMAND?:  {id: number, name: BcwsRoleName}[],
  AVIATION?:  {id: number, name: BcwsRoleName}[],
}
