


export interface IntakeFormPersonnelData {
  firstName?: string;
  lastName?: string;
  employeeId?: string;
  paylistId?: string;
  email?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  workPhone?: string;
  unionMembership?: string;
  supervisorFirstName?: string;
  supervisorLastName?: string;
  supervisorEmail?: string;
  supervisorPhone?: string;
  driverLicense?: string[];  
  homeLocation?: {
    id?: number;
    locationName: string;
    fireCentre?: string;
    region?: string;
  };
  workLocation?: {
    id: number;
    locationName: string;
    fireCentre?: string;
    region?: string;
  };
  ministry?: string;
  division?: string;
  tools?: any[];
  languages?: {
    language: string;
    level: string;
    type: string;
  }[];
  certifications?: any[];
  emergencyContactFirstName?: string;
  emergencyContactLastName?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactRelationship?: string;
  firstAidLevel?: string;
  firstAidExpiry?: Date;
  psychologicalFirstAid?: boolean;
  emcr?: {
    firstChoiceFunction?: string;
    secondChoiceFunction?: string;
    thirdChoiceFunction?: string;
    travelPreference?: string;
    firstNationExperienceLiving?: boolean;
    firstNationExperienceWorking?: boolean;
    peccExperience?: boolean;
    preocExperience?: boolean;
    emergencyExperience?: boolean;
    experiences?: {
      id?: number;
      name?: string;
      experience?: string;
    }[];
  } 
  bcws?: {
    purchaseCardHolder?: boolean;
    liaisonFirstName?: string;
    liaisonLastName?: string;
    liaisonPhoneNumber?: string;
    liaisonEmail?: string;
    firstChoiceSection?: string;
    secondChoiceSection?: number;
    thirdChoiceSection?: string;
    travelPreference?: string;
    roles?: {
      id: number;
      name: string;
      section: string;
    }[];
  };
}


