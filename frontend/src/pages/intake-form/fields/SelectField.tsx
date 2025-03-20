import type { FieldInputProps } from 'formik';
import { classes } from '@/components/filters/classes';

import clsx from 'clsx';

export const SelectField = ({
  field,
  options,
  disabled,
  placeholder,
}: {
  field: FieldInputProps<any>;
  disabled?: boolean;
  options?: any[];
  placeholder?: string;
}) => {
  return (
    <select
      {...field}
      // value={field.value}
      disabled={disabled}
      defaultValue=""
      placeholder={placeholder}
      className={clsx(
        field.value === '' || field.value === undefined
          ? classes.menu.container + ' text-gray-400 placeholder-gray-400'
          : classes.menu.container,
      )}
    >
      <option disabled={true} value="" className="text-gray-400">
        Select An Option
      </option>
      {options?.map((itm: any) => (
        <option key={itm.value} value={itm.value} disabled={itm.disabled}>
          {itm.label}
        </option>
      ))}
    </select>
  );
};
