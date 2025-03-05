// react
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { FormikProps } from 'formik';
import { Field } from 'formik';
// types
import type { FormFields, FormSection } from './types';
// icons
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { SelectField, TextField } from './components/TextField';
import type { IntakeFormData } from './fields';

export const FormSections = ({ sections }: { sections?: FormSection[] }) => {
  const renderField = ({
    field,
    form,
    ...props
  }: {
    form: FormikProps<IntakeFormData>;
    field: any;
    props: FormFields;
  }) => {
    console.log(props);
    switch (field.type) {
      case 'text':
        return <TextField field={field} form={form} {...props} />;
      case 'tel':
        return <TextField field={field} form={form} {...props} />;
      case 'select':
        return <SelectField field={field} form={form} {...props} />;
      default:
        return <TextField field={field} form={form} {...props} />;
    }
  };
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
                          helper={field?.helper}
                        >
                          {({
                            field,
                            form,
                            props,
                          }: {
                            form: FormikProps<IntakeFormData>;
                            field: any;
                            props: FormFields;
                          }) => renderField({ field, form, props })}
                        </Field>
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
