import { MultiSelect, Select, TextInput } from '@/components';
import type { Personnel } from '@/pages/dashboard';
import type { FieldType } from '@/pages/profile';
import { useFormikContext } from 'formik';
import type { ChangeEvent } from 'react';

export const FormField = ({
  field,
  handleChange,
}: {
  field: FieldType;
  handleChange: (e: ChangeEvent<any>) => void;
}) => {
  const { getFieldProps, values, setValues } =
    useFormikContext<Partial<Personnel>>();
  const fieldProps = { ...getFieldProps(field.name) };

  return (
    <>
      {field.type === 'text' || field.type === 'tel' ? (
        <TextInput {...fieldProps} {...field} onChange={handleChange} />
      ) : field.multiple ? (
        <MultiSelect
          field={field}
          values={values[field.name as keyof typeof values]}
          handleClose={(name, value) =>
            setValues({ ...values, [name]: fieldProps.value.filter(value) })
          }
          handleCloseMany={(name) => setValues({ ...values, [name]: [] })}
          maxChips={0}
          {...fieldProps}
          {...field}
          onChange={handleChange}
        />
      ) : (
        <Select {...fieldProps} {...field} onChange={handleChange} />
      )}
    </>
  );
};
