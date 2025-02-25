import { Program } from '@/common';

export interface ProgramFields {
  program?: Program;
}
// program selection
export const programFields: ProgramFields = {
  program: undefined,
};

export interface PersonalInfoFields {
  firstName: string;
  lastName: string;
  email: string;
  // ...etc
}
// personal info
export const personalInfoFields: PersonalInfoFields = {
  firstName: '',
  lastName: '',
  email: '',
  // ...etc
};

// experience & roles

// skills

// review and submit



// form interface
export interface IntakeFormInterface {
  programFields: ProgramFields
  personalInfoFields: PersonalInfoFields

}
