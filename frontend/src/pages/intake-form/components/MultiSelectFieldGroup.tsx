import type { FieldInputProps, FormikFormProps } from 'formik';
import { ErrorMessage, Field, FieldArray, useFormikContext } from 'formik';

import { useIntakeForm } from '@/hooks/useIntakeForm';
import clsx from 'clsx';
import type { FormFields, IntakeFormValues } from '../constants/types';
import { renderField } from '../utils/helpers';

// This component renders a group of multiselects - the values of these fields will be the field.value array from the roles component
export const MultiSelectGroup = ({ field }: { field: FormFields }) => {
  const { getOptions } = useIntakeForm();
  const options = getOptions(field.name);

  const getFieldOptions = (index: number) => {
    const fieldOptions = Object.values(options)[index];
    return fieldOptions?.map((itm: any) => ({
      label: itm.name,
      value: itm.id.toString(),
    }));
  };
  const { values } = useFormikContext<IntakeFormValues>();
  return (
    <div className="w-full col-span-2">
      <FieldArray
        name={field.name}
        render={() => (
          <>
            <div className="grid grid-cols-2 gap-4">
              {field.fields?.map((itm: FormFields, index: number) => {
                return (
                  <div key={itm.name} className="col-span-2">
                    <label htmlFor={itm.name}>
                      {itm.label}
                      {itm.required && <span className="text-errorRed">*</span>}
                    </label>
                    <Field
                      value={values[field.name as keyof typeof values]}
                      name={`${field.name}.${index}.${itm.name}`}
                      type={itm.type}
                    >
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<any>;
                        form: FormikFormProps;
                      }) => {
                        return (
                          <>
                            {renderField({
                              field,
                              form,
                              props: itm,
                              options: getFieldOptions(index),
                            })}

                            {itm.helper && (
                              <p className={clsx('subtext', 'py-2')}>{itm.helper}</p>
                            )}

                            <ErrorMessage name={field.name}>
                              {(msg) => {
                                return (
                                  <div className="font-normal text-errorRed">
                                    {msg}
                                  </div>
                                );
                              }}
                            </ErrorMessage>
                          </>
                        );
                      }}
                    </Field>
                  </div>
                );
              })}
            </div>
          </>
        )}
      />
    </div>
  );
};
