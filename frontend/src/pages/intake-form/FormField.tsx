import type { FormikProps } from 'formik';
import { Field, ErrorMessage } from 'formik';
import type { IntakeFormPersonnelData } from './fields';
import { renderField } from './helpers';
import type { FormFields } from './types';

export const FormField = ({ field }: { field: FormFields }) => {
  const {
    name,
    label,
    required,
    type,
    placeholder,
    options,
    helper,
    colspan,
    hideLabel,
  } = field;
  return (
    <div key={name} className={colspan ? `col-span-${colspan}` : ''}>
      <label htmlFor={name} className={hideLabel ? 'invisible' : ''}>
        {label}
        {required && <span className="font-bold text-red-500">*</span>}
      </label>
      <Field
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full rounded-md"
        name={name}
        type={type}
        placeholder={placeholder}
        options={options}
        helper={helper}
      >
        {(fieldProps: FormikProps<IntakeFormPersonnelData>) =>
          renderField(field, fieldProps)
        }
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
