import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FormField } from './FormField';
import type { FormSection as FormSectionType } from './types';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';

export const FormSection = ({ section }: { section: FormSectionType }) => {
  return (
    <div key={section.name} className="border-1 border-gray-200 ">
      <Disclosure as="div" className="border-1 border-gray-200 ">
        {({ open }) => (
          <>
            <DisclosureButton className="w-full">
              <div className="flex flex-row px-4 py-2 justify-between bg-grayBackground items-center">
                <span className="text-blue-900 font-bold">{section.name}</span>{' '}
                <span> {open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="text-gray-500">
              <div className="grid grid-cols-2 gap-12 pt-[36px] pb-[50px] px-[40px] items-start">
                {section.fields?.map((fieldItm) => (
                  <FormField key={fieldItm.name} field={fieldItm} />
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
