import { MultiSelect, Select, TextArea, TextInput } from '@/components';
import type { Personnel } from '@/common';

import { useFormikContext } from 'formik';
import type { ChangeEvent } from 'react';
import type { FieldType } from '@/components/profile/forms/types';

export const FormField = ({
  field,
  handleChange,
}: {
  field: FieldType;
  handleChange: (e: ChangeEvent<any>) => void;
}) => {
  const { getFieldProps, values, setValues } = useFormikContext<Partial<any>>();
  const fieldProps = { ...getFieldProps(field.name) };

  //TODO change Personnel to a generic type

  return (
    <>
      {field.type === 'text' || field.type === 'tel' ? (
        <TextInput
          {...fieldProps}
          {...field}
          onChange={handleChange}
          value={field.value}
        />
      ) : field.type === 'textarea' ? (
        <TextArea
          onChange={handleChange}
          className={
            'placeholder:text-dark text-dark textarea resize flex flex-row  p-2.5 w-full font-normal bg-white min-h-[150px] rounded-sm border border-[#606060]  outline outline-0 transition-all  focus:outline-0 disabled:resize-none disabled:border-0 disabled:text-dark'
          }
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
        />
      ) : field.multiple ? (
        <MultiSelect
          field={
            field as {
              name: string;
              placeholder: string;
              options: { label: string; value: string }[];
            }
          }
          values={values[field.name as keyof Personnel] as string[]}
          handleClose={(name, value) =>
            setValues({
              ...values,
              [name]: (values[name as keyof Personnel] as string[]).filter(
                (itm: string) => itm !== value,
              ),
            })
          }
          handleCloseMany={(name) => setValues({ ...values, [name]: [] })}
          maxChips={0}
          handleChange={(name: string, value: string) =>
            setValues({
              ...values,
              [name]: [...(values[name] as string[]), value],
            })
          }
          label={field.label}
        />
      ) : (
        <Select
          {...fieldProps}
          {...field}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(e.target.value);
            setValues({
              ...values,
              [field.name]: e.target.value,
            });
            handleChange(e);
          }}
        />
      )}
    </>
  );
};
