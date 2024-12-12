import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import { formatPhone } from './helpers';
import type { FieldType } from '@/pages/profile';

export const TextInput = ({ ...props }: FieldInputProps<string> & FieldType) => {
  const { name, label, required, disabled, type } = props;
  const [field, meta] = useField(props as any as FieldInputProps<string>);

  if (type === 'tel') {
    field.value = formatPhone(field.value);
    meta.value = formatPhone(meta.value);
  }

  const getClass = (): string => {
    if (meta.error) {
      return classes.menu.error;
    } else if (disabled) {
      return classes.menu.disabled;
    }
    return classes.menu.container;
  };

  return (
    <label htmlFor={name}>
      {label}
      {required && <span className="text-error">*</span>}
      <input
        {...props}
        {...field}
        disabled={disabled}
        className={getClass()}
        type={type}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="font-normal text-cherry-700">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
