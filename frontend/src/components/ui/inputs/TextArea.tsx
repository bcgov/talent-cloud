import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import type { InputProps } from './types';

export const TextArea = ({
  label,
  required,
  error,
  disabled,
  ...props
}: InputProps) => {
  const [field] = useField(props as any as FieldInputProps<string>);

  return (
    <label htmlFor={field.name} className="w-full px-16 py-8">
      {label}
      {required && <span className="text-error">*</span>}
      <textarea        
        {...field}
        disabled={disabled}
        className={error ? classes.menu.textAreaError : classes.menu.textArea}
      />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="text-errorRed">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
