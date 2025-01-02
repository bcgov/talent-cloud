import { Program } from '@/common';
import { useState } from 'react';

interface AssertionsProps {
  program: Program;
  onUpdate: (assertionsChecked: boolean) => void;
}

export const Assertions = ({ program, onUpdate }: AssertionsProps) => {
  const programCheckboxes = {
    option2:
      'I understand that I am responsible for updating my profile details (i.e., contact information, supervisor information) if any changes occur.',
    option3: `I understand that I must gain for my supervisor's approval before becoming an active member this year.`,
  };

  const bcwsCheckboxes = {
    option1:
      'I have saved a copy of my completed PAR-Q+ form and emailed it to my Fire Centre.',
    ...programCheckboxes,
  };

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const boxes = program === Program.EMCR ? programCheckboxes : bcwsCheckboxes;
    return Object.keys(boxes).reduce((acc, key) => ({ ...acc, [key]: false }), {});
  });

  const handleCheckboxChange = (key: string) => {
    const newCheckedItems = {
      ...checkedItems,
      [key]: !checkedItems[key],
    };
    setCheckedItems(newCheckedItems);
    onUpdate(Object.values(newCheckedItems).every((checked) => checked === true));
  };

  return (
    <div className="px-6 flex-grow">
      <h6 className="text-sm font-semibold mb-4">
        Please read and check off the following statements below before you submit.
        <span className="text-red-600">*</span>
      </h6>
      <div className="space-y-4">
        {Object.keys(
          program === Program.EMCR ? programCheckboxes : bcwsCheckboxes,
        ).map((key) => (
          <>
            <label key={key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={checkedItems[key]}
                onChange={() => handleCheckboxChange(key)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">
                {bcwsCheckboxes[key as keyof typeof bcwsCheckboxes]}
              </span>
            </label>
          </>
        ))}
      </div>
    </div>
  );
};
