import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import { formatPhone } from './helpers';
import type { InputProps } from './types';

export const TextInput = ({ label, required, disabled, ...props }: InputProps) => {
  const [field, meta] = useField(props as any as FieldInputProps<string>);

  if (
    field.name === 'primaryPhone' ||
    (field.name === 'secondaryPhone' && meta?.value?.length > 0)
  ) {
    field.value = formatPhone(field.value);
    meta.value = formatPhone(meta.value);
  }

  return (
    <label htmlFor={field.name}>
      {label}
      {required && <span className="text-error">*</span>}
      <input
        {...field}
        className={disabled ? classes.menu.disabled : classes.menu.container}
      />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="font-bold text-error">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
