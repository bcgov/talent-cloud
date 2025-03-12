// formik
import type { FormikProps } from 'formik';
import { Field, ErrorMessage, useFormikContext, useField } from 'formik';

// form
import type { IntakeFormValues } from './fields';

//util
import { renderField } from './helpers';

// types
import type { FormFields } from './types';

export const FormField = ({
  formField,
  getOptions,
  handleChange,
}: {
  formField: FormFields;
  getOptions?: (
    props: any,
    program?: string,
  ) => {
    label: string;
    value: string;
    disabled?: boolean | undefined;
    name?: string | undefined;
  }[];
  handleChange?: (props: any) => void;
}) => {
  const { name, label, required, type, placeholder, helper, labelHelper, style } =
    formField;

  const { values } = useFormikContext<IntakeFormValues>();

  if (getOptions) {
    formField.options = getOptions(formField, values?.program);
  }

  const [field] = useField(name);

  return (
    <div key={name} className={style}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="font-bold text-red-500">*</span>}
        </label>
      )}
      {labelHelper && <div className="text-xs text-defaultGray">{labelHelper}</div>}
      <Field
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full rounded-md"
        name={name}
        type={type}
        placeholder={placeholder}
        options={formField.options}
        helper={helper}
        onChange={handleChange ? handleChange : field.onChange}
      >
        {(fieldProps: FormikProps<IntakeFormValues>) => {
          if (handleChange) {
            fieldProps.handleChange = handleChange;
          }
          return renderField(formField, fieldProps);
        }}
      </Field>

      {helper && <p className="subtext">{helper}</p>}
      <ErrorMessage name={name}>
        {(msg) => {
          return <div className="font-normal text-errorRed">{msg}</div>;
        }}
      </ErrorMessage>
    </div>
  );
};
