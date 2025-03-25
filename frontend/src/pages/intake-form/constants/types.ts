// formik
import type { FunctionType, Program } from '@/common';
import type { FormikErrors } from 'formik';

// react
import type { ReactComponentElement } from 'react';

// yup
import type * as Yup from 'yup';

// enums

export interface FormFields {
  helper?: string;
  hidden?: boolean;
  label: string | ReactComponentElement<any>;
  name: string;
  options?: {
    label: any;
    disabled?: boolean;
    value: any;
  }[];

  placeholder?: string;
  required?: boolean;
  type: string;
  disabled?: boolean;
  program?: string;
  disabledProgram?: boolean;
  colSpan?: number;
  nestedFields?: FormFields[];
  error?: FormikErrors<any>;
  section?: string;
  component?: (props: any) => JSX.Element;
  content?: string | ReactComponentElement<any>;
  value?: any;
}

export interface FormTab {
  description: React.ReactNode;
  schema?: Yup.AnyObject;
  label: string;
  sections?: FormSection[];
  title?: string;
  value: string;

  errors?: string[];
  component: (props: any) => JSX.Element;
}

export interface IntakeFormTabs {
  programSelection: FormTab;
  personalDetails: FormTab;
  experiences: FormTab;
  skills: FormTab;
  review: FormTab;
  complete: FormTab;
}
export type FormComponent = {
  type: string;
  label: string | ReactComponentElement<any>;
  name: string;
  component?: any;
  options?: any[];
  content?: string | ReactComponentElement<any>;
};
export interface FormSection {
  name?: string;
  fields?: FormFields[];
  program?: string;
  header?: ReactComponentElement<any>;
  segments?: any;
}

export interface ToolsSkill {
  tool?: {
    id: number;
    name: string;
  };
  toolProficiency?: string;
}

// common
// common
export interface PersonalDetails {
  firstName?: string;
  lastName?: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  homeLocation?: Location & {
    id: number;
    name: string;
  };
  email?: string;
}

// employment details

export interface EmploymentDetails {
  jobTitle?: string;
  employeeId?: string;
  email?: string;
  workPhoneNumber?: string;
  ministry?: string;
  division?: string;
  unionMembership?: string;
  paylistId?: string;
  travelPreferenceBcws?: string;
  travelPreferenceEmcr?: string;
  purchaseCardHolder?: string;
}

// supervisor and liaison details, travel preferences

export interface SupervisorDetails {
  supervisorFirstName?: string;
  supervisorLastName?: string;
  supervisorEmail?: string;
  supervisorPhoneNumber?: string;
}
export interface LiaisonDetails {
  liaisonUnknown?: string;
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonEmail?: string;
  liaisonPhoneNumber?: string;
}
export interface EmergencyContactDetails {
  emergencyContactFirstName?: string;
  emergencyContactLastName?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactRelationship?: string;
}
export interface GeneralEmergencyManagementExperience {
  emergencyExperience?: string;
  preocExperience?: string;
  peccExperience?: string;
  firstNationsExperience?: string;
}

export interface SectionChoiceEmcr {
  functions?: {id?: number, name?: string}[];
  firstChoiceFunction?: {id?: number, name?: string};
  secondChoiceFunction?: {id?: number, name?: string};
  thirdChoiceFunction?: {id?: number, name?: string};
}

export interface BCWSRoles {
  PLANNING: { id: number; name: string }[];
  LOGISTICS: { id: number; name: string }[];
  FINANCE_ADMIN: { id: number; name: string }[];
  OPERATIONS: { id: number; name: string }[];
  COMMAND: { id: number; name: string }[];
  AVIATION: { id: number; name: string }[];
}

export interface SectionChoiceBcws {
  firstChoiceSection?: { id: string; name: string };
  secondChoiceSection?: { id: string; name: string };
  thirdChoiceSection?: { id: string; name: string };
}

// export interface SectionRolesBcws {
//   roles: { [key: string]: string[] }[];
// }

export interface ProgramAck {
  program?: Program | string;
  acknowledgement?: string[];
  disabledProgram?: Program | string;
}

export interface ReviewAck {
  reviewAck?: boolean;
}

// other skills & qualifications

export interface LanguageSkill {
  language?: string;
  languageProficiency?: string;
}

export interface CertificationSkill {
  certification?: {
    name: string;
    id: number;
  };
  expiry?: Date;
}
export interface DriverLicense {
  label: string;
  id: string;
}
export interface Skills {
  languages?: LanguageSkill[];
  certifications?: CertificationSkill[];
  tools?: ToolsSkill[];
  driverLicense?: DriverLicense[];
}
// review & submit

export interface ReviewAndSubmit {
  acknowledgeSubmit: boolean;
}
export enum FormStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
}

// form interface
export type IntakeFormSubmissionData = {
  id: string;
  createdByEmail: string;
  program: Program; //
  status: FormStatus;
  currentProgram: Program;
  personnel: IntakeFormValues;
};

export type FormData = {
  step?: number;
  completedSteps?: number[];
  errorSteps?: number[];
};
export type IntakeFormValues = FormData &
  ProgramAck &
  PersonalDetails &
  EmploymentDetails &
  SupervisorDetails &
  EmergencyContactDetails &
  LiaisonDetails &
  SectionChoiceBcws &
  SectionChoiceEmcr &
  GeneralEmergencyManagementExperience &
  Skills &
  BCWSRoles &
  ReviewAck;
