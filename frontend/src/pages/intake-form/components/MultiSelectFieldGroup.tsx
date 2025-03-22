import { FieldArray, useFormikContext } from 'formik';
import type { FormFields, IntakeFormValues } from '../constants/types';
import { FormField } from '../fields/FormField';

// This component renders a group of multiselects - the values of these fields will be the field.value array from the roles component
export const MultiSelectGroup = ({ field }: { field: FormFields }) => {
  const getFieldOptions = (options: any[], index: number) => {
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
              {field.nestedFields?.map((itm: FormFields, index: number) => {
                return (
                  <div key={itm.name} className="col-span-2">
                    <FormField
                      {...itm}
                      value={values[field.name as keyof typeof values]}
                      name={`${field.name}.${index}.${itm.name}`}
                      options={itm.options && getFieldOptions(itm.options, index)}
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
