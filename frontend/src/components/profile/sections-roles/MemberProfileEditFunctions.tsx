import type { ExperienceInterface, FunctionType } from '@/common';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { useEffect, useState } from 'react';
import { ProfileSectionHeader } from '../common';
import { FunctionChanges, FunctionSelect } from './FunctionSelect';
import { Tooltip } from '@material-tailwind/react';

export const MemberProfileEditFunctions = ({
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
    sectionChoices.firstChoiceSection ?? '',
  );
  const [secondChoiceSection, setSecondChoiceSection] = useState(
    sectionChoices.secondChoiceSection ?? '',
  );
  const [thirdChoiceSection, setThirdChoiceSection] = useState(
    sectionChoices.thirdChoiceSection ?? '',
  );
  const [currentFunctions, setCurrentFunctions] = useState<FunctionType[]>(
    originalExperiences.map((e: ExperienceInterface) => ({
      id: e.function.id,
      name: e.function.name,
      abbreviation: e.function.abbreviation,
    })) as FunctionType[],
  );

  useEffect(() => {
    handleChange({
      firstChoiceSection,
      secondChoiceSection,
      thirdChoiceSection,
      functions: currentFunctions,
    });
  }, [
    currentFunctions,
    firstChoiceSection,
    secondChoiceSection,
    thirdChoiceSection,
  ]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipId, setShowTooltipId] = useState<number>();

  const handleShowTooltip = (id: number) => {
    setShowTooltipId(id);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };
  return (
    <>
      <div className="px-12 pt-4">
        <ProfileSectionHeader title="Rank your Top 3 Sections">
          <div className="grid grid-cols-2 gap-8 pb-4">
            <div className="flex flex-col">
              <p className="font-bold text-sm pb-2">
                1st Choice
                <span className="text-red-300">*</span>
              </p>
              <select
                value={firstChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => {
                  const selectedFunction: FunctionType | undefined =
                    allFunctions.find((f) => f.name === e.target.value);
                  selectedFunction?.name &&
                    setFirstChoiceSection(selectedFunction.name);
                  selectedFunction &&
                    !currentFunctions.includes(selectedFunction) &&
                    setCurrentFunctions((prev) => [...prev, selectedFunction]);
                }}
              >
                <option disabled value={''}>
                  None
                </option>
                {allFunctions.map((s) => (
                  <option
                    value={s.name}
                    key={s.id}
                    disabled={[secondChoiceSection, thirdChoiceSection].includes(
                      s.name,
                    )}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm pb-2">2nd Choice</p>
              <select
                disabled={!firstChoiceSection}
                value={secondChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => {
                  const selectedFunction: FunctionType | undefined =
                    allFunctions.find((f) => f.name === e.target.value);
                  setSecondChoiceSection(selectedFunction?.name ?? '');
                  selectedFunction &&
                    setCurrentFunctions((prev) => [...prev, selectedFunction]);
                }}
              >
                <option value={''}>None</option>
                {allFunctions.map((s) => (
                  <option
                    value={s.name}
                    key={s.id}
                    disabled={[firstChoiceSection, thirdChoiceSection].includes(
                      s.name,
                    )}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm pb-2">3rd Choice</p>
              <select
                disabled={!secondChoiceSection}
                value={thirdChoiceSection}
                className="rounded-md w-full font-normal basis-1/2"
                onChange={(e) => {
                  const selectedFunction: FunctionType | undefined =
                    allFunctions.find((f) => f.name === e.target.value);
                  setThirdChoiceSection(selectedFunction?.name ?? '');
                  selectedFunction &&
                    setCurrentFunctions((prev) => [...prev, selectedFunction]);
                }}
              >
                <option value={''}>None</option>
                {allFunctions.map((s) => (
                  <option
                    value={s.name}
                    key={s.id}
                    disabled={[firstChoiceSection, secondChoiceSection].includes(
                      s.name,
                    )}
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
                <Tooltip
                  key={func.id}
                  color="red"
                  content="Cannot remove first choice. Please select a new first choice section"
                  placement="top"
                  open={showTooltip && func.id === toolTipId}
                >
                  <div className="flex items-center gap-1 px-2 py-1 text-sm bg-calGreen border border-gray-300 rounded">
                    <span className="text-inputGray">{func.name}</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (firstChoiceSection !== func.name) {
                          if (secondChoiceSection === func.name) {
                            setSecondChoiceSection('');
                          }
                          if (thirdChoiceSection === func.name) {
                            setThirdChoiceSection('');
                          }
                          setCurrentFunctions(
                            currentFunctions.filter((f) => f.id !== func.id),
                          );
                        } else {
                          handleShowTooltip(func.id);
                        }
                      }}
                      className="ml-1 p-0.5 hover:bg-gray-100 rounded"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </Tooltip>
              ))}
            </div>
          </>
        </ProfileSectionHeader>
      </div>
    </>
  );
};
