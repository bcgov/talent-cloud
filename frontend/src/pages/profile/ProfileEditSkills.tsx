import { useState } from 'react';
import { ProfileEditListSection } from './ProfileEditListSection';
import {
  Tools,
  ToolsName,
  ToolsProficiency,
  ToolsProficiencyName,
} from '../../common/enums/tools.enum';
import { Button } from '@/components';
import { ButtonTypes } from '@/common';
import {
  LanguageLevelType,
  LanguageProficiency,
} from '../../common/enums/language.enum';
import type { BcwsLanguages, BcwsPersonnelTool } from '../dashboard';

interface skillsKeyVal {
  key: string | undefined;
  value: string | undefined;
}
[];

export const ProfileEditSkills = ({
  originalLanguages,
  originalTools,
  handleClose,
  handleSave,
}: {
  originalLanguages: {
    language: string;
    level: LanguageProficiency;
    type: LanguageLevelType;
  }[];
  originalTools: { tool: Tools; proficiencyLevel: ToolsProficiency }[];
  handleClose: () => void;
  handleSave: (skills: {
    newLanguages: BcwsLanguages[];
    newTools: BcwsPersonnelTool[];
  }) => void;
}) => {
  const [languages, setLanguages] = useState<skillsKeyVal[]>(
    originalLanguages.map((l) => ({
      key: l.language,
      value: `${l.level}-${l.type}`,
    })),
  );

  const [tools, setTools] = useState<skillsKeyVal[]>(
    originalTools.map((t) => ({
      key: t.tool,
      value: t.proficiencyLevel,
    })),
  );

  const onSave = () => {
    const newLanguages = languages
      .filter((l) => !!l.key && l.key.length > 1 && !!l.value)
      .map((l) => ({
        language: l.key,
        level: l.value!.split('-')[0],
        type: l.value!.split('-')[1],
      })) as BcwsLanguages[];
    const newTools = tools
      .filter((t) => !!t.key && !!t.value)
      .map((t) => ({
        tool: t.key,
        proficiencyLevel: t.value,
      })) as BcwsPersonnelTool[];
    handleSave({ newLanguages, newTools });
  };

  return (
    <div className="pb-6">
      <div className="px-12">
        <ProfileEditListSection
          existingData={languages}
          keyName="Language"
          title="Languages"
          type="Language"
          valueName="Proficiency"
          valueOptions={[
            {
              val: `${LanguageProficiency.BASIC}-${LanguageLevelType.BOTH}`,
              text: 'Basic - Both',
            },
            {
              val: `${LanguageProficiency.BASIC}-${LanguageLevelType.VERBAL}`,
              text: 'Basic - Verbal',
            },
            {
              val: `${LanguageProficiency.BASIC}-${LanguageLevelType.WRITTEN}`,
              text: 'Basic - Written',
            },
            {
              val: `${LanguageProficiency.INTERMEDIATE}-${LanguageLevelType.BOTH}`,
              text: 'Intermediate - Both',
            },
            {
              val: `${LanguageProficiency.INTERMEDIATE}-${LanguageLevelType.VERBAL}`,
              text: 'Intermediate - Verbal',
            },
            {
              val: `${LanguageProficiency.INTERMEDIATE}-${LanguageLevelType.WRITTEN}`,
              text: 'Intermediate - Written',
            },
            {
              val: `${LanguageProficiency.FLUENT}-${LanguageLevelType.BOTH}`,
              text: 'Fluent - Both',
            },
            {
              val: `${LanguageProficiency.FLUENT}-${LanguageLevelType.VERBAL}`,
              text: 'Fluent - Verbal',
            },
            {
              val: `${LanguageProficiency.FLUENT}-${LanguageLevelType.WRITTEN}`,
              text: 'Fluent - Written',
            },
          ]}
          onSet={setLanguages}
        />
        <ProfileEditListSection
          existingData={tools}
          keyName="Skill"
          title="Tools & Programs"
          type="Skill"
          valueName="Proficiency"
          valueOptions={Object.keys(ToolsProficiency).map((key) => ({
            val: key,
            text: ToolsProficiencyName[key as keyof typeof ToolsProficiency],
          }))}
          keyOptions={Object.keys(Tools).map((key) => ({
            val: key,
            text: ToolsName[key as keyof typeof Tools],
          }))}
          onSet={setTools}
        />
      </div>
      <div className="flex flex-row content-end pt-6 px-6 border-t-4 justify-end gap-2">
        <Button
          variant={ButtonTypes.PRIMARY}
          type="button"
          onClick={handleClose}
          text="Cancel"
        />
        <Button variant={ButtonTypes.TERTIARY} text="Save" onClick={onSave} />
      </div>
    </div>
  );
};
