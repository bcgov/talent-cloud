import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import type { InputProps } from './types';

export const TextArea = ({ label, required, ...props }: InputProps) => {
  const [field] = useField(props as any as FieldInputProps<string>);

  return (
    <label htmlFor={field.name} className="w-full px-16 py-8">
      {label}
      {required && <span className="text-error">*</span>}
      <textarea {...field} className={classes.menu.textArea} />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="font-bold text-error">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
