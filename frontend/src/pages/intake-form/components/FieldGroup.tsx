import type { FormFields } from '../types';
import { Button } from '@/components';
import { ButtonTypes } from '@/common';
import type { FormikProps } from 'formik';
import { Field, FieldArray } from 'formik';
import type { IntakeFormValues } from '../fields';
import { dynamicFields, renderField } from '../helpers';

export const FieldGroup = ({
  field,

  getOptions,
  values,
}: {
  field: FormFields;

  getOptions: (
    props: any,
  ) => { label: string; value: string; disabled?: boolean; name?: string }[];
  values: string[];
}) => {
  return (
    <div className="w-full col-span-2">
      {field.label}
      {/* {fields?.map((itm: FormFields) => <FormField key={itm.name} formField={itm} getOptions={getOptions} handleChange={handleSetGroupValue}/>)} */}
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            {values.map((value, index) => (
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
                      {(fieldProps: FormikProps<IntakeFormValues>) => {
                        return renderField(
                          { ...itm, options: getOptions(itm) },
                          fieldProps,
                        );
                      }}
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
