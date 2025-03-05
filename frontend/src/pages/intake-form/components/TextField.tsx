import { classes } from '@/components/filters/classes';
import type { FieldInputProps, FormikProps } from 'formik';
import { ErrorMessage } from 'formik';
import type { FormFields } from '../types';
import type { IntakeFormData } from '../fields';

export const TextField = ({
  field,
  form,
  ...props
}: {
  field: {
    helper: string;
    name: string;
    value: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
  };
  form: FormikProps<IntakeFormData>;
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
  console.log(props, form);
  const propsObj = props as any;
  return (
    <div className="text-black relative">
      <input className={classes.menu.container} {...field} />
      <div className="absolute">
        {propsObj.helper && <p className="subtext">{field.helper}</p>}
        <ErrorMessage name={field.name}>
          {(msg) => {
            return <div className="font-normal text-errorRed">{msg}</div>;
          }}
        </ErrorMessage>
      </div>
    </div>
  );
};

export const SelectField = ({
  field,
  form,
  props,
}: {
  form: FormikProps<any>;
  field: FieldInputProps<HTMLSelectElement>;
  props: FormFields;
}) => {
  console.log(props, form);
  // const propsObj = props as any
  return (
    <div className="relative">
      <select {...field} {...form} defaultValue={''} value={form.values[field.name]}>
        <option disabled value={''}>
          {props.placeholder}
        </option>
        {props.options?.map((o: { label: string; value: string | boolean }) => (
          <option value={o.value as string} key={o.value as string}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="absolute">
        {props.helper && <p className="subtext">{props.helper}</p>}
        <ErrorMessage name={field.name}>
          {(msg) => {
            return <div className="font-normal text-errorRed">{msg}</div>;
          }}
        </ErrorMessage>
      </div>
    </div>
  );
};
