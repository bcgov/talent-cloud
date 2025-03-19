import { FieldArray, useFormikContext } from 'formik';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import type { FormFields, IntakeFormValues } from '../constants/types';
import { FormField } from '../fields/FormField';

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
                    <FormField
                      {...itm}
                      value={values[field.name as keyof typeof values]}
                      name={`${field.name}.${index}.${itm.name}`}
                      type={itm.type}
                      options={
                        itm.options && itm.options.length === 0
                          ? getFieldOptions(index)
                          : itm.options
                      }
                    />
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
