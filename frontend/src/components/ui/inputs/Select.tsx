import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { ErrorMessage, useField } from 'formik';
import type { FieldType } from '@/pages/profile';

export const Select = ({ ...props }: FieldInputProps<string> & FieldType) => {
  const [field] = useField(props as any as FieldInputProps<string>);
  return (
    <label htmlFor={props.name}>
      {props.label}
      {props.required && <span className="text-error">*</span>}
      <select
        {...field}
        {...props}
        className={props.disabled ? classes.menu.disabled : classes.menu.container}
      >
        {!props.required && <option value={undefined}></option>}
        {props.options?.map((itm, index) => (
          <option key={itm.value + index.toString()} value={itm.value}>
            {itm.label}
          </option>
        ))}
      </select>
      <ErrorMessage name={props.name}>
        {(msg) => <div className="text-errorRed font-normal">{msg}</div>}
      </ErrorMessage>
    </label>
  );
};
