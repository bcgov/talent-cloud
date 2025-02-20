import { FunctionType } from '@/common';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export interface FunctionChanges {
  firstChoiceSection?: string;
  secondChoiceSection?: string;
  thirdChoiceSection?: string;
  functions: FunctionType[];
}

export const FunctionSelect = ({
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
