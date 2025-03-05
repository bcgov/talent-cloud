import type { FormikProps } from 'formik';
import type { IntakeFormData } from '../fields';
import { classes } from '@/components/filters/classes';

export const SelectField = ({
  field,
  form,
  ...props
}: {
  form: FormikProps<IntakeFormData>;
  field: any;
  props: any;
}) => {
  console.log(props, form);
  return (
    <select
      {...field}
      {...form}
      defaultValue={''}
      value={form.values[field.name as keyof typeof form.values] as string}
      className={classes.menu.container}
    >
      <option disabled value={''}>
        {field.placeholder}
      </option>
      {field.options?.map((o: { label: string; value: string | boolean }) => (
        <option value={o.value as string} key={o.value as string}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
