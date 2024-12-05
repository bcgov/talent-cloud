import { SectionHeader } from '@/components';
import type { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { FormField } from './FormField';

import { useFormikContext } from 'formik';
import type { Personnel } from '@/common';
import type { FieldType } from '@/components/profile/forms/types';

export const FormSection = ({
  fields,
  header,
  showHeader = true,
  fieldChangeHandler,
}: {
  header: string;
  fields: FieldType[];
  showHeader?: boolean;
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
      {showHeader && <SectionHeader section={header} />}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {fields?.map((field) => (
          <Fragment key={field.name}>
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
            {field.break && <div className="hidden lg:flex lg:col-span-1"></div>}
          </Fragment>
        ))}
      </div>
      <div className="w-full border border-t-1 mx-0 px-0 shadow-lg mt-16"></div>
    </Fragment>
  );
};
