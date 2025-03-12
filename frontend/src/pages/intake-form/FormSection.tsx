import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FormField } from './FormField';
import type { FormFields, FormSection as FormSectionType } from './types';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { useFormikContext } from 'formik';
import type { IntakeFormValues } from './fields';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { handleFilterProgram, handleSetValues } from './helpers';
import { Fragment } from 'react';
import { FieldGroup } from './components/FieldGroup';

export const FormSection = ({
  program,
  section,
  getOptions,
}: {
  program?: string;
  section: FormSectionType;
  getOptions: (
    props: any,
    program?: string,
  ) => { label: string; value: string; disabled?: boolean; name?: string }[];
}) => {
  const { values, setValues } = useFormikContext<IntakeFormValues>();

  const addField = (field: FormFields) => {
    setValues((prev: IntakeFormValues) => handleSetValues(prev, field));
  };

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
                  ?.filter((itm) =>
                    itm.program && program
                      ? handleFilterProgram(itm, program)
                      : true,
                  )
                  ?.map((fieldItm) => (
                    <Fragment key={fieldItm.name}>
                      {fieldItm.type === 'infoBox' ? (
                        <div className="col-span-2">
                          <Banner
                            title={fieldItm.name}
                            content={fieldItm.label}
                            type={BannerType.INFO}
                          />
                        </div>
                      ) : fieldItm.type === 'field-group' ? (
                        <FieldGroup
                          field={fieldItm}
                          addField={addField}
                          getOptions={getOptions}
                          values={
                            values[fieldItm.name as keyof typeof values] as string[]
                          }
                        />
                      ) : (
                        <div
                          className={`col-span-${fieldItm.colspan || '1'} flex flex-col justify-end w-full h-full`}
                        >
                          <FormField
                            key={fieldItm.name}
                            formField={fieldItm}
                            getOptions={getOptions}
                          />
                        </div>
                      )}
                    </Fragment>
                  ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
