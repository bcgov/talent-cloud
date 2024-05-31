import { MultiSelect, Select, TextInput } from '@/components';
import type { Personnel } from '@/pages/dashboard';
import type { FieldType } from '@/pages/profile';
import { useFormikContext } from 'formik';
import type { ChangeEvent } from 'react';
import { GroupedSelect } from '../inputs/GroupedSelect';

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

  //TODO change Personnel to a generic type

  return (
    <>
      {field.type === 'text' || field.type === 'tel' ? (
        <TextInput {...fieldProps} {...field} onChange={handleChange} />
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
              [name]: [...(values[name as keyof Personnel] as string[]), value],
            })
          }
          label={field.label}
        />
      ) : (
        <>
          {field.type === 'select' && (
            <Select {...fieldProps} {...field} onChange={handleChange} />
          )}
          {field.type === 'groupedSelect' && (
            <GroupedSelect {...fieldProps} {...field} onChange={handleChange} />
          )}
        </>
      )}
    </>
  );
};
