import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, Field } from 'formik';
import type { CustomFormProps } from './types';

export const TextArea = ({
  field,
}: {
  field: FieldInputProps<string> & CustomFormProps;
}) => (
  <label htmlFor={field.name}>
    {field?.label}
    {field?.required && <span className="text-error">*</span>}
    <Field component={'textarea'} {...field} className={classes.menu.textArea} />
    <ErrorMessage name={field.name}>
      {(msg) => <div className="font-bold text-error">{msg}</div>}
    </ErrorMessage>
  </label>
);
