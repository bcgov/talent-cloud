import type {
  BcwsPersonnelRoleInterface,
  BcwsRoleInterface,
  ExperienceInterface,
  FunctionType,
} from '@/common';
import { ButtonTypes, Experience } from '@/common';
import {
  BcwsRoleName,
  ExperienceLevel,
  Section,
  SectionName,
} from '@/common/enums/sections.enum';
import { Button, DialogUI } from '@/components';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useState } from 'react';
import { ProfileSectionHeader } from '../common';
import { QuestionIcon } from '@/components/ui/Icons';
import RolesAndFunctionsDescriptionsTabs from './RolesGuide';

interface RoleSelectProps {
  allRoles: BcwsRoleInterface[];
  selectedRoles: BcwsRoleInterface[];
  onRoleSelect: (roles: BcwsRoleInterface[]) => void;
}

interface RoleChanges {
  firstChoiceSection?: Section;
  secondChoiceSection?: Section;
  roles: BcwsRoleInterface[];
}

interface FunctionChanges {
  firstChoiceSection?: string;
  secondChoiceSection?: string;
  functions: FunctionType[];
}

const RoleSelect = ({ allRoles, selectedRoles, onRoleSelect }: RoleSelectProps) => {
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

const FunctionSelect = ({
  allFunctions,
  selectedFunctions,
  onFunctionSelect,
}: {
  allFunctions: FunctionType[];
  selectedFunctions: FunctionType[];
  onFunctionSelect: (functions: FunctionType[]) => void;
}) => {
  const [query, setQuery] = useState('');

  const filteredFunctions =
    query === ''
      ? allFunctions
      : allFunctions.filter(
          (func) =>
            func.name.toLowerCase().includes(query.toLowerCase()) ||
            func.abbreviation.toLowerCase().includes(query.toLowerCase()),
        );

  const isFunctionSelected = (func: FunctionType) => {
    return selectedFunctions.some(
      (selectedFunction) => selectedFunction.id === func.id,
    );
  };

  return (
    <Combobox
      immediate
      value={selectedFunctions}
      onChange={onFunctionSelect}
      multiple
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <ComboboxInput
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            placeholder="Search for a section"
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredFunctions.map((func) => (
            <ComboboxOption
              key={func.id}
              value={func}
              className={`relative cursor-default select-none py-2 px-4 text-defaultGray data-[focus]:bg-calBlue`}
            >
              {() => (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFunctionSelected(func)}
                    className="h-4 w-4 border-defaultGray border-2 text-primaryBlue focus:ring-primaryBlue mr-3"
                    readOnly
                  />
                  <span
                    className={`block text-defaultGray truncate ${isFunctionSelected(func) ? 'font-medium' : 'font-normal'}`}
                  >
                    {func.name}
                  </span>
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

const MemberProfileEditRoles = ({
  allRoles,
  originalRoles,
  sectionChoices,
  handleChange,
}: {
  allRoles: BcwsRoleInterface[];
  originalRoles: BcwsPersonnelRoleInterface[];
  sectionChoices: { firstChoiceSection?: Section; secondChoiceSection?: Section };
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

  useEffect(() => {
    handleChange({
      firstChoiceSection,
      secondChoiceSection,
      roles: currentRoles,
    });
  }, [currentRoles, firstChoiceSection, secondChoiceSection]);

  return (
    <>
      <div className="px-12 pt-4">
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

const MemberProfileEditFunctions = ({
  allFunctions,
  originalExperiences,
  sectionChoices,
  handleChange,
}: {
  allFunctions: FunctionType[];
  originalExperiences: ExperienceInterface[];
  sectionChoices: {
    firstChoiceSection?: string;
    secondChoiceSection?: string;
    thirdChoiceSection?: string;
  };
  handleChange: (functionsToChange: FunctionChanges) => void;
}) => {
  const [firstChoiceSection, setFirstChoiceSection] = useState(
    sectionChoices.firstChoiceSection,
  );
  const [secondChoiceSection, setSecondChoiceSection] = useState(
    sectionChoices.secondChoiceSection,
  );
  const [currentFunctions, setCurrentFunctions] = useState<FunctionType[]>(
    originalExperiences.map((e) => ({
      id: e.function.id,
      name: e.function.name,
      abbreviation: e.function.abbreviation,
    })),
  );

  useEffect(() => {
    handleChange({
      firstChoiceSection,
      secondChoiceSection,
      functions: currentFunctions,
    });
  }, [currentFunctions, firstChoiceSection, secondChoiceSection]);

  return (
    <>
      <div className="px-12 pt-4">
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
                onChange={(e) => setFirstChoiceSection(e.target.value)}
              >
                {allFunctions.map((s) => (
                  <option
                    value={s.id}
                    key={s.id}
                    disabled={s.name === secondChoiceSection}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col basis-1/2">
              <p className="font-bold text-sm pb-2">2nd Choice</p>
              <select
                value={secondChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => setSecondChoiceSection(e.target.value)}
              >
                <option value={''}>None</option>
                {allFunctions.map((s) => (
                  <option
                    value={s.id}
                    key={s.id}
                    disabled={s.name === secondChoiceSection}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ProfileSectionHeader>
        <ProfileSectionHeader title="Add New Section(s)">
          <>
            <p className="font-bold text-sm">Select a Section</p>
            <FunctionSelect
              allFunctions={allFunctions}
              selectedFunctions={currentFunctions}
              onFunctionSelect={setCurrentFunctions}
            />
            <p className="font-bold text-sm pt-4">Selected Sections</p>
            <p className="text-sm">
              You can remove your choices below to make changes
            </p>
            <div className="flex flex-wrap gap-2 py-4">
              {currentFunctions.map((func) => (
                <div
                  key={func.id}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-calGreen border border-gray-300 rounded"
                >
                  <span className="text-inputGray">{func.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentFunctions(
                        currentFunctions.filter((f) => f.id !== func.id),
                      );
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

export const MemberProfileEditPreferences = ({
  bcws,
  emcr,
  handleClose,
  handleSave,
}: {
  bcws?: {
    allRoles: BcwsRoleInterface[];
    originalRoles: BcwsPersonnelRoleInterface[];
    sectionChoices: { firstChoiceSection?: Section; secondChoiceSection?: Section };
  };
  emcr?: {
    allFunctions: FunctionType[];
    originalExperiences: ExperienceInterface[];
    sectionChoices: {
      firstChoiceSection?: string;
      secondChoiceSection?: string;
      thirdChoiceSection?: string;
    };
  };
  handleClose: () => void;
  handleSave: (personnel: any) => Promise<void>;
}) => {
  const [rolesToSave, setRolesToSave] = useState<RoleChanges>({
    firstChoiceSection: bcws?.sectionChoices?.firstChoiceSection,
    secondChoiceSection: bcws?.sectionChoices?.secondChoiceSection,
    roles: [],
  });
  const [functionsToSave, setFunctionsToSave] = useState<FunctionChanges>({
    firstChoiceSection: undefined,
    secondChoiceSection: undefined,
    functions: [],
  });
  const onSave = async () => {
    const personnelUpdate: any = {};

    if (bcws) {
      const newRoles = rolesToSave.roles.filter(
        (cr) => !bcws.originalRoles.map((or) => or.id).includes(cr.id),
      );
      const rolesExcludingRemoved = bcws.originalRoles
        .filter((or) => rolesToSave.roles.map((cr) => cr.id).includes(or.id))
        .map((r) => ({
          roleId: r.id,
          expLevel: r.expLevel,
        }));
      const updateRoles = [
        ...newRoles.map((r) => ({
          roleId: r.id,
          expLevel: ExperienceLevel.INTERESTED,
        })),
        ...rolesExcludingRemoved,
      ];
      personnelUpdate.bcws = {
        firstChoiceSection: rolesToSave.firstChoiceSection,
        secondChoiceSection: rolesToSave.secondChoiceSection,
        roles: updateRoles,
      };
    }

    if (emcr) {
      const newFunctions = functionsToSave.functions.filter(
        (cf) =>
          !emcr.originalExperiences.map((oe) => oe.function.id).includes(cf.id),
      );
      const functionsExcludingRemoved = emcr.originalExperiences
        .filter((oe) => functionsToSave.functions.map((cf) => cf.id).includes(oe.id))
        .map((f) => ({
          id: f.id,
          function: f.function,
          experienceType: f.experienceType,
        }));
      const updateFunctions = [
        ...newFunctions.map((f) => ({
          id: f.id,
          functionName: f.name,
          experienceType: Experience.INTERESTED,
        })),
        ...functionsExcludingRemoved,
      ];
      personnelUpdate.emcr = {
        // firstChoiceSection,
        // secondChoiceSection,
        experiences: updateFunctions,
      };
    }

    if (Object.keys(personnelUpdate).length) {
      handleSave(personnelUpdate);
    }
    handleClose();
  };

  const [openRoles, setOpenRoles] = useState(false);
  const showRoles = () => {
    setOpenRoles(!openRoles);
  };

  return (
    <>
      <div className="pb-6">
        <div className="pt-6 px-12">
          <div className="flex flex-row items-center justify-start space-x-2">
            <QuestionIcon />
            <button
              onClick={showRoles}
              className="text-info cursor-pointer underline"
            >
              See Section Definitions
            </button>
          </div>
        </div>

        {emcr && (
          <div className="pt-6 px-12">
            <h2 className="text-xl font-bold text-gray-900">EMCR</h2>
          </div>
        )}
        {emcr && (
          <MemberProfileEditFunctions
            allFunctions={emcr.allFunctions}
            originalExperiences={emcr.originalExperiences}
            sectionChoices={emcr.sectionChoices}
            handleChange={setFunctionsToSave}
          />
        )}
        {bcws && emcr && (
          <div className="pt-6 px-12 border-t-2 mt-6 border-defaultGray"></div>
        )}
        {bcws && (
          <div className="pt-6 px-12">
            <h2 className="text-xl font-bold text-gray-900">BCWS</h2>
          </div>
        )}

        {bcws && (
          <MemberProfileEditRoles
            allRoles={bcws.allRoles}
            originalRoles={bcws.originalRoles}
            sectionChoices={bcws.sectionChoices}
            handleChange={setRolesToSave}
          />
        )}
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

      <DialogUI
        open={openRoles}
        onClose={showRoles}
        handleOpen={showRoles}
        title={
          bcws && !emcr
            ? 'BCWS Role Definitions'
            : emcr && !bcws
              ? 'EMCR Section'
              : 'EMCR Section, BCWS Role Definitions'
        }
        style="w-full max-w-3xl h-full"
      >
        <div>
          <RolesAndFunctionsDescriptionsTabs
            bcws={bcws !== undefined}
            emcr={emcr !== undefined}
          />
        </div>
      </DialogUI>
    </>
  );
};
