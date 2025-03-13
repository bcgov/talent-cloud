import type { FormFields } from '../constants/types';
import { Button } from '@/components';
import { ButtonTypes } from '@/common';
import type { FieldInputProps, FormikFormProps } from 'formik';
import { ErrorMessage, Field, FieldArray } from 'formik';
import { dynamicFields, renderField } from '../utils/helpers';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import clsx from 'clsx';

export const FieldGroup = ({
  field,
  values,
}: {
  field: FormFields;
  values: string[];
}) => {
  const { getOptions } = useIntakeForm();

  return (
    <div className="w-full col-span-2">
      {field.label}
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            {values?.map((value: any, index: number) => (
              <div key={value} className="grid grid-cols-3 gap-4">
                {field.fields?.map((itm: FormFields, index: number) => (
                  <div key={itm.name} className="col-span-1">
                    <label htmlFor={itm.name}>
                      {itm.label}
                      {itm.required && <span className="text-errorRed">*</span>}
                    </label>
                    <Field
                      value={value[itm.name as keyof typeof value]}
                      name={`${field.name}.${index}.${itm.name}`}
                      type={itm.type}
                    >
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<any>;
                        form: FormikFormProps;
                      }) => (
                        <>
                          {renderField({
                            field,
                            form,
                            props: itm,
                            options: getOptions(itm.name),
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
                      )}
                    </Field>
                  </div>
                ))}

                <div className="col-span-1 pt-9">
                  <Button
                    variant={ButtonTypes.OUTLINED}
                    text="Remove"
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                  />
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button
                variant={ButtonTypes.SOLID}
                onClick={() => arrayHelpers.push(dynamicFields[field.name])}
                text="Add Another"
              />
            </div>
          </>
        )}
      />
    </div>
  );
};
