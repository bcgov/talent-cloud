import type { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { ExperienceLevel } from '@/common/enums/sections.enum';
import type { ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { ReactElement } from 'react';

export type ProfileDetail = {
  title?: string;
  content?: string | ReactElement;
};
export type ProfileData = {
  intakeRequirements?: ProfileDetail[];
  generalInformation: ProfileDetail[];
  contact: ProfileDetail[];
  organizational: ProfileDetail[];
  skills?: {
    title?: string;
    header?: string;
    subheader?: string;
    itms?: {
      label?: string;
      value?:
        | ToolsProficiencyName
        | LanguageProficiencyName
        | ExperienceLevel
        | string
        | undefined;
    }[];
  }[];
};

export type DetailProps = {
  generalInformation: ProfileDetail[];
  contact: ProfileDetail[];
  organizational: ProfileDetail[];
  pending: boolean;
  intakeRequirements?: ProfileDetail[];
  openEditProfilePopUp: (e: React.MouseEvent<HTMLElement>) => void;
};
