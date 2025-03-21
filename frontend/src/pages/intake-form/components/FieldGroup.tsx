import type { FormFields, IntakeFormValues } from '../constants/types';
import { Button } from '@/components';
import { ButtonTypes } from '@/common';
import { FieldArray, useFormikContext } from 'formik';
import { dynamicFields } from '../utils/helpers';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { PlusIcon } from '@/components/ui/Icons';
import { FormField } from '../fields/FormField';

export const FieldGroup = ({ field }: { field: FormFields }) => {
  const { getOptions } = useIntakeForm();
  const { values, errors } = useFormikContext<IntakeFormValues>();
  const fieldErrors = errors[field.name as keyof typeof errors];

  return (
    <>
      {field.label}
      {field.helper && (
        <div className="pb-12">
          <p className="subtext">{field.helper}</p>
        </div>
      )}
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            {(values?.[field.name as keyof typeof values] as {}[])?.map(
              (value: any, index: number) => (
                <div key={value} className="grid grid-cols-3 gap-4">
                  {field.fields?.map((itm: FormFields) => (
                    <div key={itm.name} className="col-span-1">
                      <FormField
                        {...itm}
                        value={value?.[index]?.[itm.name]}
                        name={`${field.name}.${index}.${itm.name}`}
                        options={
                          itm.options && itm.options.length === 0
                            ? getOptions(itm.name)
                            : itm.options
                        }
                      />
                      <div className="font-normal text-errorRed">
                        {fieldErrors && (fieldErrors as any)?.[index]?.[itm.name]}
                      </div>
                    </div>
                  ))}
                  <div className="col-span-1 pt-6">
                    <Button
                      variant={ButtonTypes.OUTLINED}
                      text="Delete"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    />
                  </div>
                </div>
              ),
            )}

            <div className="pt-4">
              <Button
                variant={ButtonTypes.SOLID}
                onClick={() => arrayHelpers.push(dynamicFields[field.name])}
                text={`Add ${field.fields?.[0].label.toString().split(' ')[0]}`}
                textIcon={<PlusIcon />}
              />
            </div>
          </>
        )}
      />
    </>
  );
};
