import type { FormikFormProps } from 'formik';
import { Field } from 'formik';
import type { FormSection } from './types';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';

const MyInput = ({
  field,
  form,
  ...props
}: {
  form: FormikFormProps;
  field: any;
  props: any;
}) => {
  if ((props as any).type && (props as any).type === 'select') {
    return (
      <select {...field} {...props}>
        {(props as any).options?.map((o: string) => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  return <input {...field} {...props} />;
};

export const FormSections = ({ sections }: { sections?: FormSection[] }) => {
  return (
    <div className="flex flex-col space-y-8  w-full">
      {sections?.map((section) => (
        <div key={section.name} className="border-1 border-gray-200 ">
          <Disclosure as="div" className="border-1 border-gray-200 ">
            {({ open }) => (
              <>
                <DisclosureButton className="w-full">
                  <div className="flex flex-row px-4 py-2 justify-between bg-grayBackground">
                    <span className="text-blue-900 font-bold">{section.name}</span>{' '}
                    <span> {open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
                  </div>
                </DisclosureButton>
                <DisclosurePanel className="text-gray-500">
                  <div className="grid grid-cols-2 gap-20 pt-[36px] pb-[50px] px-[40px] items-end">
                    {section?.fields?.map((field, index) => (
                      <div
                        className={`flex flex-col gap-y-[5px] col-span-${section?.fields?.length && index === section.fields.length - 1 && section.fields.length % 2 === 1 ? 2 : 1}`}
                        key={field.name}
                      >
                        <label htmlFor={field.name}>
                          {field.label}
                          {field.required && (
                            <span className="font-bold text-red-500">*</span>
                          )}
                        </label>
                        <Field
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full rounded-md"
                          name={field.name}
                          type={field.type}
                          as={field.name}
                          placeholder={field.placeholder}
                          options={field?.options}
                          component={MyInput}
                        />
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
};
