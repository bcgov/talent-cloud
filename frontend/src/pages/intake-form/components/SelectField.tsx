import { useField, useFormikContext, type FormikProps } from 'formik';
import type { IntakeFormData } from '../fields';
import { classes } from '@/components/filters/classes';
import type { FormFields } from '../types';

export const SelectField = (props: FormFields & FormikProps<IntakeFormData>) => {
  console.log(props);
  const { values } = useFormikContext<IntakeFormData>();
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
        {field.options?.map((o: { label: string; value: string | boolean }) => (
          <option value={o.value as string} key={o.value as string}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};
