import type { FieldInputProps } from 'formik';
import { classes } from '@/components/filters/classes';
import type { FormFields } from '../constants/types';

export const SelectField = ({
  field,
  // form,
  props,
  options,
}: {
  field: FieldInputProps<any>;
  // form: FormikFormProps;
  props: FormFields;
  options?: any[];
}) => {
  return (
    <select
      className={classes.menu.container}
      {...props}
      {...field}
      value={undefined}
      defaultValue={''}
    >
      <option disabled value={''}>
        {props.placeholder}
      </option>
      {options?.map((itm: any) => (
        <option key={itm.value} value={itm.value}>
          {itm.label}
        </option>
      ))}
    </select>
  );
};
