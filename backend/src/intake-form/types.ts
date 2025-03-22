/* eslint-disable */

import { LocationDTO } from "../personnel/dto/details/personnel-details.dto";

export interface IntakeFormPersonnelData {
  firstName?: string;
  lastName?: string;
  program?: string;
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
  homeLocation?: LocationDTO;
  ministry?: string;
  division?: string;
  tools?: {
    tool?: {
      id: number, name: string
    }
    toolProficiency?: string;
  }[];
  languages?: {
    language?: string;
    languageProficiency?: string;
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
  purchaseCardHolder?: boolean;
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonPhoneNumber?: string;
  liaisonEmail?: string;
  firstChoiceSection?: string;
  secondChoiceSection?: string;
  thirdChoiceSection?: string;
  travelPreferenceBcws?: string;
  travelPreferenceEmcr?: string;
  roles?: string[];
  chipsLastActionDate?: Date;
  jobTitle?: string;
}
