import type {
  BcwsRoleInterface,
} from '@/common';
import {
  BcwsRoleName,
  Section,
  SectionName,
} from '@/common/enums/sections.enum';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';


export interface RoleSelectProps {
  allRoles: BcwsRoleInterface[];
  selectedRoles: BcwsRoleInterface[];
  onRoleSelect: (roles: BcwsRoleInterface[]) => void;
}

export interface RoleChanges {
  firstChoiceSection?: Section|string;
  secondChoiceSection?: Section|string;
  thirdChoiceSection?: Section|string;
  roles: BcwsRoleInterface[];
}


export const RoleSelect = ({ allRoles, selectedRoles, onRoleSelect }: RoleSelectProps) => {
  const [query, setQuery] = useState('');

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
    <Combobox immediate value={selectedRoles} onChange={onRoleSelect} multiple>
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

