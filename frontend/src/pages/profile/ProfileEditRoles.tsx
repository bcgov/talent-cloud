import { useState } from 'react';
import { ProfileEditListSection } from './ProfileEditListSection';
import { Button } from '@/components';
import { ButtonTypes } from '@/common';
import type { BcwsPersonnelRoleInterface, BcwsRoleInterface } from '../dashboard';
import {
  BcwsRoleName,
  ExperienceLevel,
  ExperienceLevelName,
  Section,
  SectionName,
} from '../../common/enums/sections.enum';
import type { SkillsKeyVal } from './ProfileEditListSection';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';

export const ProfileEditRoles = ({
  allRoles,
  originalRoles,
  sectionChoices,
  handleClose,
  handleSave,
}: {
  allRoles: BcwsRoleInterface[];
  originalRoles: BcwsPersonnelRoleInterface[];
  sectionChoices: { firstChoiceSection?: Section; secondChoiceSection?: Section };
  handleClose: () => void;
  handleSave: (roles: {
    newRoles: { roleId: number; expLevel: string }[];
    firstChoiceSection?: Section;
    secondChoiceSection?: Section | null;
  }) => void;
}) => {
  const [currentRoles, setCurrentRoles] = useState<{
    [section: string]: SkillsKeyVal[];
  }>(
    originalRoles.reduce<{ [section: string]: SkillsKeyVal[] }>((acc, role) => {
      if (!acc[role.section]) {
        acc[role.section] = [];
      }
      acc[role.section].push({
        key: role.role,
        value: role.expLevel,
      });
      return acc;
    }, {}),
  );
  const [firstChoiceSection, setFirstChoiceSection] = useState(
    sectionChoices.firstChoiceSection,
  );
  const [secondChoiceSection, setSecondChoiceSection] = useState(
    sectionChoices.secondChoiceSection,
  );

  const rolesBySection = allRoles.reduce<{ [section: string]: BcwsRoleInterface[] }>(
    (acc, role) => {
      if (!acc[role.section]) {
        acc[role.section] = [];
      }
      acc[role.section].push(role);
      return acc;
    },
    {},
  );

  const onSave = () => {
    const roleIds = allRoles.reduce<{ [key: string]: number }>((acc, role) => {
      acc[role.name] = role.id;
      return acc;
    }, {});
    const allCurrentRoles = Object.keys(currentRoles).reduce<SkillsKeyVal[]>(
      (acc, section) => {
        acc.push(...currentRoles[section]);
        return acc;
      },
      [],
    );
    const newRoles = allCurrentRoles.map((r) => ({
      roleId: roleIds[r.key as string],
      expLevel: r.value as string,
    }));
    handleSave({
      newRoles,
      firstChoiceSection,
      secondChoiceSection: secondChoiceSection?.length ? secondChoiceSection : null,
    });
  };

  return (
    <div className="pb-6">
      <div className="px-12">
        {/* Section Choices */}
        <Accordion title="Section Ranking" placeholder="Section Ranking" open={true}>
          <AccordionHeader placeholder="Section Ranking">
            Section Ranking
          </AccordionHeader>
          <AccordionBody>
            <div className="flex flex-row gap-8">
              <div className="flex flex-col basis-1/4">
                <p className="font-bold text-sm">
                  First Choice
                  <span className="text-red-300">*</span>
                </p>
                <select
                  value={firstChoiceSection}
                  className="rounded-md w-full font-normal basis-1/4"
                  onChange={(e) => setFirstChoiceSection(e.target.value as Section)}
                >
                  {Object.keys(Section).map((s) => (
                    <option value={s} key={s} disabled={s === secondChoiceSection}>
                      {SectionName[s as keyof typeof SectionName]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col basis-1/4">
                <p className="font-bold text-sm">Second Choice</p>
                <select
                  value={secondChoiceSection}
                  className="rounded-md w-full font-normal basis-1/4"
                  onChange={(e) => setSecondChoiceSection(e.target.value as Section)}
                >
                  <option value={''}>None</option>
                  {Object.keys(Section).map((s) => (
                    <option value={s} key={s} disabled={s === firstChoiceSection}>
                      {SectionName[s as keyof typeof SectionName]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
      {Object.keys(rolesBySection).map((section) => (
        <div key={section} className="px-12">
          <ProfileEditListSection
            existingData={currentRoles[section] || []}
            keyName="Role Title"
            title={SectionName[section as keyof typeof SectionName]}
            type="Another Role"
            valueName="Experience Level"
            valueOptions={Object.keys(ExperienceLevel).map((el) => ({
              val: el,
              text: ExperienceLevelName[el as keyof typeof ExperienceLevel],
            }))}
            keyOptions={rolesBySection[section].map((role) => ({
              val: role.name,
              text: BcwsRoleName[role.name],
            }))}
            onSet={(
              newArray: { key: string | undefined; value: string | undefined }[],
            ) => {
              const data = { ...currentRoles };
              data[section] = newArray;
              setCurrentRoles(data);
            }}
          />
        </div>
      ))}
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
