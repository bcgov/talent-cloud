import { useField, useFormikContext, type FormikProps } from 'formik';
import type { IntakeFormPersonnelData } from '../fields';
import { classes } from '@/components/filters/classes';
import type { FormFields } from '../types';

export const SelectField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  console.log(props);
  const { values } = useFormikContext<IntakeFormPersonnelData>();
  const [field] = useField(props.name);
  return (
    <select
      {...props}
      defaultValue={''}
      value={values[props.name as keyof typeof values] as string}
      className={classes.menu.container}
      onChange={field.onChange}
    >
      <option disabled value={''}>
        {props.placeholder}
      </option>
      {props.options?.map((o: { label: string; value: string | boolean }) => (
        <option value={o.value as string} key={o.value as string}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
