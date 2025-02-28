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
  console.log(form, field, props);
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
                  {section?.fields?.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name}>
                        {field.label}
                        <Field
                          name={field.name}
                          type={field.type}
                          as={field.name}
                          placeholder={field.placeholder}
                          component={MyInput}
                        />
                      </label>
                    </div>
                  ))}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
};
