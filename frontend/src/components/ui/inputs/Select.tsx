import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import type { SelectProps } from './types';



export const Select = ({
  label,
  required,
  disabled,
  options,
  onChange,
  ...props
}: SelectProps) => {
  const [field] = useField(props as any as FieldInputProps<string>);
  
  return (
    <label htmlFor={field.name}>
      {label}
      {required && <span className="text-error">*</span>}
      <select
        {...field}
        disabled={disabled} 
        onChange={onChange ?? field.onChange}
        className={disabled ? classes.menu.disabled : classes.menu.container}
      >
        {options?.map((itm, index) => (
          <option key={itm.value + index.toString()} value={itm.value}>
            {itm.label}
          </option>
        ))}
      </select>
      <ErrorMessage name={field.name}>
        {(msg) => <div className="text-errorRed">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
