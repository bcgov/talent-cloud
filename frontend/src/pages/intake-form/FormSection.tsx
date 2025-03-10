import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FormField } from './FormField';
import type { FormSection as FormSectionType } from './types';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { Program } from '@/common';
import { useFormikContext } from 'formik';
import type { IntakeFormPersonnelData } from './fields';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';

export const FormSection = ({ section }: { section: FormSectionType }) => {
  const { values } = useFormikContext<IntakeFormPersonnelData>();
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
                {section.fields
                  ?.filter((itm) => {
                    if (values.program === Program.ALL || !itm.program) {
                      return itm;
                    } else if (itm.program && itm.program === values.program) {
                      return itm;
                    }
                  })
                  ?.map((fieldItm) => (
                    <>
                      {fieldItm.type === 'infoBox' ? (
                        <div className="col-span-2">
                          <Banner
                            title={fieldItm.name}
                            content={fieldItm.label}
                            type={BannerType.INFO}
                          />
                        </div>
                      ) : (
                        <div className={`col-span-${fieldItm.colspan || '1'} flex flex-col justify-end w-full h-full`}>
                          <FormField key={fieldItm.name} field={fieldItm} />
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
