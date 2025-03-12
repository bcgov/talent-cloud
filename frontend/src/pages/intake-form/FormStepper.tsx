import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import type { FormTab } from './tabs';

export const FormStepper = ({
  tab,
  handleClickTab,
  index,
  formTabs,
}: {
  tab: FormTab;
  handleClickTab: (index: number) => void;
  index: number;
  formTabs: FormTab[];
}) => {
  return (
    <Tab
      key={tab.value}
      value={tab.value}
      onClick={() => handleClickTab(index)}
      className={clsx(
        'data-[selected]:outline-none pb-16',
        index !== formTabs.length - 1 && 'border-blue-800 border-l border-dashed',
      )}
    >
      {({ selected }) => (
        <>
          <div className="flex flex-row space-x-2 flex-nowrap text-nowrap h-full">
            <div
              className={clsx(
                selected && 'bg-blue-800 text-white border-2 border-blue-800',
                !selected && ' border-2 border-[#606060] bg-white',
                ' px-2 -ml-3 rounded-full ',
              )}
            >
              {index + 1}
            </div>
            <div>
              <p
                className={clsx(
                  selected && 'outline-none text-blue-800 font-bold',
                  'text-sm  text-[#606060]',
                )}
              >
                {tab.label}
              </p>
            </div>
          </div>
        </>
      )}
    </Tab>
  );
};
