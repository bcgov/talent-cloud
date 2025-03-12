import { useField, type FormikProps } from 'formik';
import type { IntakeFormValues } from '../fields';
import { classes } from '@/components/filters/classes';
import type { FormFields } from '../types';

export const SelectField = (props: FormFields & FormikProps<IntakeFormValues>) => {
  const [field] = useField(props.name);

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
      {props.options?.map((o: { label: string; value: string }) => (
        <option value={o.value as string} key={o.value as string} disabled={false}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
