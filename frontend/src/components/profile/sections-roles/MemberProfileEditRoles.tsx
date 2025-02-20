import { BcwsRoleInterface, BcwsPersonnelRoleInterface } from '@/common';
import { Section, SectionName, BcwsRoleName } from '@/common/enums/sections.enum';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { ProfileSectionHeader } from '../common';
import { RoleChanges, RoleSelect } from './RoleSelect';

export const MemberProfileEditRoles = ({
  allRoles,
  originalRoles,
  sectionChoices,
  handleChange,
}: {
  allRoles: BcwsRoleInterface[];
  originalRoles: BcwsPersonnelRoleInterface[];
  sectionChoices: {
    firstChoiceSection?: Section;
    secondChoiceSection?: Section;
    thirdChoiceSection?: Section;
  };
  handleChange: (rolesToSave: RoleChanges) => void;
}) => {
  const [currentRoles, setCurrentRoles] = useState<BcwsRoleInterface[]>(
    originalRoles.map((r) => ({
      id: r.id,
      name: r.role,
      section: r.section,
    })),
  );
  const [firstChoiceSection, setFirstChoiceSection] = useState(
    sectionChoices.firstChoiceSection,
  );
  const [secondChoiceSection, setSecondChoiceSection] = useState(
    sectionChoices.secondChoiceSection,
  );
  const [thirdChoiceSection, setThirdChoiceSection] = useState(
    sectionChoices.thirdChoiceSection,
  );

  useEffect(() => {
    handleChange({
      firstChoiceSection,
      secondChoiceSection,
      thirdChoiceSection,
      roles: currentRoles,
    });
  }, [currentRoles, firstChoiceSection, secondChoiceSection, thirdChoiceSection]);

  return (
    <>
      <div className="px-12 pt-4">
        <ProfileSectionHeader title="Rank your Top 3 Sections">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col basis-1/2">
              <p className="font-bold text-sm pb-2">
                1st Choice
                <span className="text-red-300">*</span>
              </p>
              <select
                value={firstChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => setFirstChoiceSection(e.target.value as Section)}
              >
                {Object.keys(Section).map((s) => (
                  <option
                    value={s}
                    key={s}
                    disabled={[secondChoiceSection, thirdChoiceSection].includes(
                      s as Section,
                    )}
                  >
                    {SectionName[s as keyof typeof SectionName]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col basis-1/2">
              <p className="font-bold text-sm pb-2">2nd Choice</p>
              <select
                disabled={!firstChoiceSection}
                value={secondChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => setSecondChoiceSection(e.target.value as Section)}
              >
                <option value={''}>None</option>
                {Object.keys(Section).map((s) => (
                  <option
                    value={s}
                    key={s}
                    disabled={[firstChoiceSection, thirdChoiceSection].includes(
                      s as Section,
                    )}
                  >
                    {SectionName[s as keyof typeof SectionName]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col basis-1/2">
              <p className="font-bold text-sm pb-2">3rd Choice</p>
              <select
                disabled={!secondChoiceSection}
                value={thirdChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => setThirdChoiceSection(e.target.value as Section)}
              >
                <option value={''}>None</option>
                {Object.keys(Section).map((s) => (
                  <option
                    value={s}
                    key={s}
                    disabled={[firstChoiceSection, secondChoiceSection].includes(
                      s as Section,
                    )}
                  >
                    {SectionName[s as keyof typeof SectionName]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ProfileSectionHeader>
        <ProfileSectionHeader title="Add New Role(s)">
          <>
            <p className="font-bold text-sm">Select a Role</p>
            <RoleSelect
              allRoles={allRoles.sort(
                (a, b) =>
                  Object.values(Section).indexOf(b.section) -
                  Object.values(Section).indexOf(a.section),
              )}
              selectedRoles={currentRoles}
              onRoleSelect={(roles) => setCurrentRoles(roles)}
            />
            <p className="font-bold text-sm pt-4">Selected Roles</p>
            <p className="text-sm">
              You can remove your choices below to make changes
            </p>
            <div className="flex flex-wrap gap-2 py-4">
              {currentRoles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-calBlue border border-gray-300 rounded"
                >
                  <span className="text-primaryBlue font-bold">
                    {SectionName[role.section]}
                  </span>
                  <span className="my-1">:</span>
                  <span className="text-primaryBlue">{BcwsRoleName[role.name]}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentRoles(currentRoles.filter((r) => r.id !== role.id));
                    }}
                    className="ml-1 p-0.5 hover:bg-gray-100 rounded"
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </>
        </ProfileSectionHeader>
      </div>
    </>
  );
};
