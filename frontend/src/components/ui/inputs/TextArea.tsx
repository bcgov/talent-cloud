import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import type { InputProps } from './types';

export const TextArea = ({
  label,
  required,
  error,
  disabled,
  placeholder,
  className,
  ...props
}: InputProps) => {
  const [field] = useField(props as any as FieldInputProps<string>);

  return (
    <label htmlFor={field.name} className="w-full  py-8">
      {label}
      {required && <span className="text-red-600">*</span>}
      <textarea
        {...field}
        placeholder={placeholder ?? ''}
        disabled={disabled}
        className={
          className
            ? className
            : error
              ? classes.menu.textAreaError
              : classes.menu.textArea
        }
      />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="font-normal text-cherry-700">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
