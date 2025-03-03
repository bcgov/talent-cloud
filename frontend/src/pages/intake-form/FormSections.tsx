import type { FormikFormProps } from 'formik';
import { ErrorMessage, Field } from 'formik';
import type { FormSection } from './types';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { classes } from '@/components/filters/classes';
import { formatPhone } from '@/utils';

const MyInput = ({
  field,
  form,
  ...props
}: {
  form: FormikFormProps;
  field: any;
  props: any;
}) => {
  console.log('FORM-------');
  console.log(form);
  console.log('FIELD-------');
  console.log(field);
  console.log('PROPS------');
  console.log(props);
  const propsObj = props as any;
  if (propsObj.type && propsObj.type === 'select') {
    return (
      <div className="relative">
        <select {...field} {...propsObj}>
          <option hidden disabled selected value={''}>
            {propsObj.placeholder}
          </option>
          {propsObj.options?.map((o: string) => (
            <option value={o} key={o}>
              {o}
            </option>
          ))}
        </select>
        {propsObj.helper && <p className="subtext absolute">{propsObj.helper}</p>}
        <ErrorMessage name={field.name}>
          {(msg) => {
            return <div className="font-normal text-errorRed absolute">{msg}</div>;
          }}
        </ErrorMessage>
      </div>
    );
  }
  if (propsObj.type === 'tel') {
    propsObj.value = formatPhone(field.value);
    propsObj.type = 'text';
  }
  return (
    <div className="text-black relative">
      <input className={classes.menu.container} {...field} {...propsObj} />
      {propsObj.helper && <p className="subtext absolute">{propsObj.helper}</p>}
      <ErrorMessage name={field.name}>
        {(msg) => {
          return <div className="font-normal text-errorRed absolute">{msg}</div>;
        }}
      </ErrorMessage>
    </div>
  );
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
                          helper={field?.helper}
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
