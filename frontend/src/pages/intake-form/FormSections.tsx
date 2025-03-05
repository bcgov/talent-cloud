// react
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { FormikProps } from 'formik';
import { ErrorMessage, Field } from 'formik';
// types
import type { FormFields, FormSection } from './types';
// icons
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { TextField } from './components/TextField';
import type { IntakeFormData } from './fields';
import { SelectField } from './components/SelectField';

export const FormSections = ({ sections }: { sections?: FormSection[] }) => {
  const renderField = ({
    field,
    form,
    type,
    ...props
  }: {
    form: FormikProps<IntakeFormData>;
    field: any;
    type: string;
    props: FormFields;
  }) => {
    switch (type) {
      case 'text':
        return <TextField field={field} form={form} {...props} />;
      case 'tel':
        return <TextField field={field} form={form} {...props} />;
      case 'select':
        return <SelectField field={field} form={form} {...props} />;
      // case 'radio':
      //   return <RadioField />;
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
                    {section?.fields?.map((fieldItm, index) => (
                      <div
                        className={`flex flex-col gap-y-[5px] col-span-${section?.fields?.length && index === section.fields.length - 1 && section.fields.length % 2 === 1 ? 2 : 1}`}
                        key={fieldItm.name}
                      >
                        <label htmlFor={fieldItm.name}>
                          {fieldItm.label}
                          {fieldItm.required && (
                            <span className="font-bold text-red-500">*</span>
                          )}
                        </label>
                        <Field
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full rounded-md"
                          name={fieldItm.name}
                          type={fieldItm.type}
                          placeholder={fieldItm.placeholder}
                          options={fieldItm?.options}
                          helper={fieldItm?.helper}
                        >
                          {({
                            field,
                            form,
                            ...props
                          }: {
                            form: FormikProps<IntakeFormData>;
                            field: any;
                            props: any;
                          }) =>
                            renderField({
                              field,
                              form,
                              type: fieldItm.type,
                              ...props,
                            })
                          }
                        </Field>
                        <div>
                          {fieldItm.helper && (
                            <p className="subtext">{fieldItm.helper}</p>
                          )}
                          <ErrorMessage name={fieldItm.name}>
                            {(msg) => {
                              return (
                                <div className="font-normal text-errorRed">
                                  {msg}
                                </div>
                              );
                            }}
                          </ErrorMessage>
                        </div>
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
