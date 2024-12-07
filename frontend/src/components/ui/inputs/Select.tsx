import { classes } from '@/components/filters/classes';
import type { FieldType } from '@/components/profile/forms/types';

import type { FieldInputProps } from 'formik';
import { ErrorMessage } from 'formik';

export const Select = ({ ...props }: FieldInputProps<string> & FieldType) => {
  return (
    <label htmlFor={props.name}>
      {props.label}
      {props.required && <span className="text-error">*</span>}
      <select
        {...props}
        name={props.name}
        required={props.required}
        disabled={props.disabled}
        multiple={props.multiple}
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
