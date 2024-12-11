import { Fragment, useState } from 'react';
import { Button } from '@/components';
import { ButtonTypes } from '@/common';
import type { BcwsPersonnelRoleInterface, BcwsRoleInterface } from '@/common';
import {
  BcwsRoleName,
  ExperienceLevel,
  Section,
  SectionName,
} from '@/common/enums/sections.enum';
import { ProfileSectionHeader } from '../common';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface RoleSelectProps {
  allRoles: BcwsRoleInterface[];
  selectedRoles: BcwsRoleInterface[];
  onRoleSelect: (roles: BcwsRoleInterface[]) => void;
}

const RoleSelect = ({ allRoles, selectedRoles, onRoleSelect }: RoleSelectProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredRoles =
    query === ''
      ? allRoles
      : allRoles.filter(
          (role) =>
            role.name.toLowerCase().includes(query.toLowerCase()) ||
            role.section.toLowerCase().includes(query.toLowerCase()),
        );

  const rolesBySection = filteredRoles.reduce<{
    [key: string]: BcwsRoleInterface[];
  }>((acc, role) => {
    if (!acc[role.section]) {
      acc[role.section] = [];
    }
    acc[role.section].push(role);
    return acc;
  }, {});

  const isRoleSelected = (role: BcwsRoleInterface) => {
    return selectedRoles.some((selectedRole) => selectedRole.id === role.id);
  };

  return (
    <Combobox
      immediate
      value={selectedRoles}
      onChange={onRoleSelect}
      multiple
      open={isOpen}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <ComboboxInput
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            placeholder="Search for a role"
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {Object.entries(rolesBySection).map(([section, roles]) => (
            <Fragment key={section}>
              <div className="px-4 py-2 text-xs font-bold">
                {`${SectionName[section as keyof typeof SectionName]} (${roles.length})`}
              </div>
              {roles.map((role) => (
                <ComboboxOption
                  key={role.id}
                  value={role}
                  className={`relative cursor-default select-none py-2 px-4 text-defaultGray data-[focus]:bg-calBlue`}
                >
                  {() => (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isRoleSelected(role)}
                        className="h-4 w-4 border-defaultGray border-2 text-primaryBlue focus:ring-primaryBlue mr-3"
                        readOnly
                      />
                      <span
                        className={`block text-defaultGray truncate ${isRoleSelected(role) ? 'font-medium' : 'font-normal'}`}
                      >
                        {BcwsRoleName[role.name]}
                      </span>
                    </div>
                  )}
                </ComboboxOption>
              ))}
            </Fragment>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export const MemberProfileEditRoles = ({
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
  handleSave: (personnel: any) => Promise<void>;
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

  const onSave = async () => {
    const newRoles = currentRoles.filter(
      (cr) => !originalRoles.map((or) => or.id).includes(cr.id),
    );
    const rolesExcludingRemoved = originalRoles
      .filter((or) => currentRoles.map((cr) => cr.id).includes(or.id))
      .map((r) => ({
        roleId: r.id,
        expLevel: r.expLevel,
      }));
    const rolesToSave = [
      ...newRoles.map((r) => ({
        roleId: r.id,
        expLevel: ExperienceLevel.INTERESTED,
      })),
      ...rolesExcludingRemoved,
    ];
    const personnelUpdate = {
      bcws: {
        firstChoiceSection,
        secondChoiceSection,
        roles: rolesToSave,
      },
    };
    await handleSave(personnelUpdate);
    handleClose();
  };

  return (
    <div className="pb-6">
      <div className="px-12 pt-6">
        <ProfileSectionHeader title="Rank your Top 3 Sections">
          <div className="flex flex-row gap-8">
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
                  <option value={s} key={s} disabled={s === secondChoiceSection}>
                    {SectionName[s as keyof typeof SectionName]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col basis-1/2">
              <p className="font-bold text-sm pb-2">2nd Choice</p>
              <select
                value={secondChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
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
        </ProfileSectionHeader>
        <div className="border-b-2 border-defaultGray my-6"></div>
        <ProfileSectionHeader title="Add New Role">
          <>
            <p className="font-bold text-sm">Select a Role</p>
            <RoleSelect
              allRoles={allRoles}
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
