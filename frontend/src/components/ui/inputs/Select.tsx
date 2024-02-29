import { classes } from '@/components/filters/classes';
import type { Personnel } from '@/pages/dashboard';
import type { FieldInputProps } from 'formik';
import { Field, ErrorMessage } from 'formik';
import type { CustomFormProps } from './types';

export const Select = ({
  field,
}: {
  field: FieldInputProps<Personnel> & CustomFormProps;
}) => (
  <label htmlFor={field.name}>
    {field?.label}
    {field?.required && <span className="text-error">*</span>}
    <Field
      as="select"
      className={field?.disabled ? classes.menu.disabled : classes.menu.container}
      {...field}
    >
      {field?.options?.map((itm) => (
        <option key={itm.value.toString()} value={itm.value}>
          {itm.label}
        </option>
      ))}
    </Field>
    <ErrorMessage name={field.name}>
      {(msg) => <div className="font-bold text-error">{msg}</div>}
    </ErrorMessage>
  </label>
);
