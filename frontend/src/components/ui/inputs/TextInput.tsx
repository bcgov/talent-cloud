import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { Field, ErrorMessage } from 'formik';
import type { CustomFormProps } from './types';

export const TextInput = ({
  field,
}: {
  field: FieldInputProps<string> & CustomFormProps;
}) => {
  return (
    <label htmlFor={field.name}>
      {field?.label}
      {field?.required && <span className="text-error">*</span>}
      <Field
        type="text"
        className={field?.disabled ? classes.menu.disabled : classes.menu.container}
        {...field}
      />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="font-bold text-error">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
