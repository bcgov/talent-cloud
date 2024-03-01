import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import type { SelectProps } from './types';

export const Select = ({
  label,
  required,
  disabled,
  options,
  ...props
}: SelectProps) => {
  const [field] = useField(props as any as FieldInputProps<string>);
  return (
    <label htmlFor={field.name}>
      {label}
      {required && <span className="text-error">*</span>}
      <select
        {...field}
        className={disabled ? classes.menu.disabled : classes.menu.container}
      >
        {options?.map((itm, index) => (
          <option key={itm.value + index.toString()} value={itm.value}>
            {itm.label}
          </option>
        ))}
      </select>
      <ErrorMessage name={field.name}>
        {(msg) => <div className="font-bold text-error">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
