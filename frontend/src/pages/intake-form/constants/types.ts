// formik
import type { BcwsRoleInterface, Program } from '@/common';
import type { FormikErrors } from 'formik';

// react
import type { ReactComponentElement, ReactElement } from 'react';

// yup
import type * as Yup from 'yup';

// enums
import type { Expectations } from './enums';

export interface FormFields {
  helper?: string;
  hidden?: boolean;
  label: string | ReactComponentElement<any>;
  name: string;
  options?: {
    label: string | ReactComponentElement<any>;
    value: string;
    disabled?: boolean;
    name?: string;
  }[];
  placeholder?: string;
  required?: boolean;
  type: string;
  disabled?: boolean;
  program?: string;
  disabledProgram?: boolean;
  colspan?: number;
  fields?: FormFields[];
  error?: FormikErrors<any>;
  section?: string;
  labelHelper?: string;
  component?: (props: any) => JSX.Element;
  content?: string | ReactElement;
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
  label: string;
  name: string;
  component?: any;
  options?: any[];
  content?: string | ReactElement;
  program?: string;
};
export interface FormSection {
  name?: string;
  fields?: FormFields[];
  program?: string;
}

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

// common
// common
export interface PersonalDetails {
  firstName: string;
  lastName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  homeLocation?: Location;
  email: string;
}

// employment details

export interface EmploymentDetails {
  jobTitle: string;
  employeeId: string;
  email: string;
  workPhone: string;
  ministry: string;
  division: string;
}

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
export interface EmergencyContactDetails {
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactRelationship: string;
}
export interface GeneralEmergencyManagementExperience {
  emergencyExperience: boolean;
  preocExperience: boolean;
  peccExperience: boolean;
  firstNationsWorking: boolean;
}

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

export interface SectionRolesBcws {
  planning?: BcwsRoleInterface[];
  logistics?: BcwsRoleInterface[];
  finance?: BcwsRoleInterface[];
  operations?: BcwsRoleInterface[];
  command?: BcwsRoleInterface[];
  aviation?: BcwsRoleInterface[];
}

// other skills & qualifications

export interface LanguageSkill {
  language: string;
  languageProficiency: string;
}

export interface CertificationSkill {
  name: string;
  id: number;
  expiry?: string;
}

// review & submit

export interface ReviewAndSubmit {
  acknowledgeSubmit: boolean;
}

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
    functions: string[];
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
