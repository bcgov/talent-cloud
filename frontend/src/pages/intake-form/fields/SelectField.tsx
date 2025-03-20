import type { FieldInputProps } from 'formik';
import { classes } from '@/components/filters/classes';
import type { FormFields } from '../constants/types';

export const SelectField = ({
  field,
  props,
  options,
}: {
  field: FieldInputProps<any>;
  props: FormFields;
  options?: any[];
}) => {
  return (
    <select
      {...props}
      {...field}
      value={field.value}
      className={classes.menu.container}
    >
      <option disabled value={''}>
        Select An Option
      </option>
      {options?.map((itm: any) => (
        <option key={itm.value} value={itm.value}>
          {itm.label}
        </option>
      ))}
    </select>
  );
};
