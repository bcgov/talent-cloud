import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { ExperienceLevel } from '@/common/enums/sections.enum';
import { ToolsProficiencyName } from '@/common/enums/tools.enum';

export const chipClass = (
  value?: ExperienceLevel | ToolsProficiencyName | LanguageProficiencyName | string,
) => {
  const colors = () => {
    switch (value) {
      case ExperienceLevel.INTERESTED:
      case ToolsProficiencyName.BASIC:
      case LanguageProficiencyName.INTERMEDIATE:
        return {
          bgColor: 'calGreen',
          textColor: 'calGreenText',
          borderColor: 'calGreenTwo',
        };
      case ExperienceLevel.PREVIOUSLY_DEPLOYED:
      case ToolsProficiencyName.ADVANCED:
      case LanguageProficiencyName.FLUENT:
        return {
          bgColor: 'lightPurple',
          textColor: 'darkPurple',
          borderColor: 'darkPurple',
        };
      case ToolsProficiencyName.INTERMEDIATE:
      case LanguageProficiencyName.BASIC:
        return {
          bgColor: 'successBannerLight',
          textColor: 'successDark',
          borderColor: 'successDark',
        };
      default:
        return {
          bgColor: 'infoBannerLight',
          textColor: 'infoDark',
          borderColor: 'infoDark',
        };
    }
  };
  const colorValues = colors();
  return `text-${colorValues.textColor} bg-${colorValues.bgColor} border-${colorValues.borderColor} block border-2 rounded-md font-bold capitalize py-0 rounded-md font-bold text-left capitalize py-1 w-auto mx-auto`;
};
