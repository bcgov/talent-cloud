import {
  LanguageLevelType,
  LanguageLevelTypeName,
  LanguageProficiency,
  LanguageProficiencyName,
} from '@/common/enums/language.enum';
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
          bgColor: 'purple-200',
          textColor: 'darkPurple',
          borderColor: 'darkPurple',
        };
      case ToolsProficiencyName.INTERMEDIATE:
      case LanguageProficiencyName.BASIC:
        return {
          bgColor: 'sprout-200',
          textColor: 'successDark',
          borderColor: 'successDark',
        };
      default:
        return {
          bgColor: 'blue-200',
          textColor: 'infoDark',
          borderColor: 'infoDark',
        };
    }
  };
  const colorValues = colors();
  return `text-${colorValues.textColor} bg-${colorValues.bgColor} border-${colorValues.borderColor} block border-2 rounded-md font-bold capitalize py-0 rounded-md font-bold text-left capitalize py-1 w-auto mx-auto`;
};

export const getLanguageProficiency = (
  proficiency: LanguageProficiency,
  level: LanguageLevelType,
): string => {
  const proficiencyMap = {
    [LanguageProficiency.BASIC]: LanguageProficiencyName.BASIC,
    [LanguageProficiency.INTERMEDIATE]: LanguageProficiencyName.INTERMEDIATE,
    [LanguageProficiency.FLUENT]: LanguageProficiencyName.FLUENT,
  };

  const levelMap = {
    [LanguageLevelType.BOTH]: LanguageLevelTypeName.BOTH,
    [LanguageLevelType.WRITTEN]: LanguageLevelTypeName.WRITTEN,
    [LanguageLevelType.VERBAL]: LanguageLevelTypeName.VERBAL,
  };

  const proficiencyName = proficiencyMap[proficiency];
  const levelName = levelMap[level];

  return proficiencyName && levelName ? `${proficiencyName} - ${levelName}` : '--';
};
