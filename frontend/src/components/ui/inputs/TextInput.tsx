import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import { formatPhone } from './helpers';
import type { InputProps } from './types';

export const TextInput = ({
  type,
  label,
  required,
  disabled,
  error,
  autocomplete,
  ...props
}: InputProps) => {
  const [field, meta] = useField(props as any as FieldInputProps<string>);

  if (type === 'tel') {
    field.value = formatPhone(field.value);
    meta.value = formatPhone(meta.value);
  }

  const getClass = (): string => {
    if (error) {
      return classes.menu.error;
    } else if (disabled) {
      return classes.menu.disabled;
    }
    return classes.menu.container;
  };

  return (
    <label htmlFor={field.name}>
      {label}
      {required && <span className="text-error">*</span>}
      <input
        {...field}
        disabled={disabled}
        className={getClass()}
        type={type}
        autoComplete={autocomplete}
      />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="font-normal text-errorRed">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
