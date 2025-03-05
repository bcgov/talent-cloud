import { classes } from '@/components/filters/classes';
import type { FieldInputProps, FormikProps } from 'formik';
import type { FormFields } from '../types';
import type { IntakeFormData } from '../fields';

export const TextField = ({
  field,
  form,
  ...props
}: {
  form: FormikProps<IntakeFormData>;
  field: FieldInputProps<HTMLSelectElement>;
  props: FormFields;
}) => {
  // const {
  //   touched,
  //   errors,
  //   values,
  //   setFieldValue,
  //   setFieldTouched,
  //   handleChange,
  //   handleBlur,
  //   dirty,
  //   isValid,
  //   status,
  // } = form;
  console.log(props);
  return (
    <div className="text-black relative">
      <input
        className={classes.menu.container}
        {...field}
        value={form.values[field.name as keyof typeof form.values] as string}
      />
    </div>
  );
};
