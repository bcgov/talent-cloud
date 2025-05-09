import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import type { FormTab, IntakeFormValues } from '../constants/types';
import { CheckIcon } from '@/components/ui/Icons';

export const FormStepper = ({
  tab,
  index,
  formTabs,
  errorSteps,
  completedSteps,
  disabled,
  values
}: {
  tab: FormTab;
  index: number;
  formTabs: FormTab[];
  errorSteps?: number[] | null;
  completedSteps?: number[] | null;
  disabled: boolean;
  values: IntakeFormValues
}) => {
  

  
  
  return (
    <Tab
      key={tab.value}
      value={tab.value}
      disabled={!values.program || disabled }
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
                errorSteps?.includes(index)
                  ? 'bg-errorRed text-white border-2 border-errorRed'
                  : selected || completedSteps?.includes(index)
                    ? 'bg-blue-800 text-white border-2 border-blue-800'
                    : ' border-2 border-[#606060] bg-white',

                completedSteps?.includes(index) ? ' p-1' : 'px-2',

                '-ml-3 rounded-full ',
              )}
            >
              {completedSteps?.includes(index) ? (
                <CheckIcon className="text-white pt-1 color-white" fill="white" />
              ) : (
                index + 1
              )}
            </div>
            <div>
              <p
                className={clsx(
                  errorSteps?.includes(index)
                    ? 'text-errorRed font-bold'
                    : selected || completedSteps?.includes(index)
                      ? 'outline-none text-blue-800 font-bold'
                      : 'text-sm  text-[#606060]',
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
