import { SectionHeader } from '@/components';
import type { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { FormField } from './FormField';
import type { FieldType } from '@/pages/profile';
import { useFormikContext } from 'formik';
import type { Personnel } from '@/pages/dashboard';

export const FormSection = ({
  fields,
  header,
  fieldChangeHandler,
}: {
  header: string;
  fields: FieldType[];
  fieldChangeHandler: (
    e: ChangeEvent<any>,
    field: FieldType | {},
    values: Partial<Personnel>,
    setValues: (values: Partial<Personnel>) => void,
  ) => void;
}) => {
  const { values, setValues, handleChange } = useFormikContext<Partial<Personnel>>();
  return (
    <Fragment>
      <SectionHeader section={header} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {fields?.map((field) => (
          <>
            <div className="col-span-1">
              <FormField
                key={field.name}
                field={field}
                handleChange={(e) =>
                  field.handleChange
                    ? fieldChangeHandler(e, field, values, setValues)
                    : handleChange(e)
                }
              />
            </div>
            {field.break && <div className="col-span-1"></div>}
          </>
        ))}
      </div>
      <div className="w-full border border-t-1 mx-0 px-0 shadow-lg mt-16"></div>
    </Fragment>
  );
};
