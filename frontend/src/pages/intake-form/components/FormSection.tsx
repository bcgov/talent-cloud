// react
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { ReactElement } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';

// types
import type { FormSection as FormSectionType } from '../constants/types';

export const FormSection = ({
  section,
  children,
}: {
  section: FormSectionType;
  children: ReactElement;
}) => {
  return (
    <>
      <div className="border-1 border-gray-200 py-4">
        <Disclosure as="div" className="border-1 border-gray-200 ">
          {({ open }) => (
            <>
              <DisclosureButton className="w-full">
                <div className="flex flex-row px-4 py-2 justify-between bg-grayBackground items-center">
                  <span className="text-blue-900 font-bold">{section.name}</span>{' '}
                  <span> {open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
                </div>
              </DisclosureButton>
              <DisclosurePanel className="text-gray-500 w-full">
                <div className="grid grid-cols-2 gap-12 pt-[36px] pb-[50px] px-[40px] items-start">
                  {children}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
