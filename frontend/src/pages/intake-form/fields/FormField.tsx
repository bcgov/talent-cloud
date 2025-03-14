// react
import { ReactComponentElement } from 'react';

// formik
import type { FieldInputProps, FormikFormProps } from 'formik';
import { Field, ErrorMessage } from 'formik';

//util
import { renderField } from '../utils/helpers';

// styles
import clsx from 'clsx';

export const FormField = (props: {
  name: string;
  label: string | ReactComponentElement<any>;
  required?: boolean;
  type: string;
  helper?: string;
  labelHelper?: string;
  disabled?: boolean;
  options?: any[];
  placeholder?: string;
  value?: any;
  component?: (props: any) => JSX.Element;
}) => {
  const {
    name,
    type,
    options,
    placeholder,
    disabled,
    helper,
    labelHelper,
    label,
    required,
  } = props;

  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="font-bold text-red-500">*</span>}
        </label>
      )}
      {labelHelper && (
        <div className="text-xs text-defaultGray py-2">{labelHelper}</div>
      )}
      <Field
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full rounded-md py-4"
        name={name}
        label={label}
        required={required}
        type={type}
        helper={helper}
        labelHelper={labelHelper}
        placeholder={placeholder}
        disabled={disabled}
        options={options}
      >
        {({
          field,
          form,
        }: {
          field: FieldInputProps<any>;
          form: FormikFormProps;
        }) => (
          <>
            {renderField({
              field,
              form,
              props,
              options,
            })}

            {helper && <p className={clsx('subtext', 'py-2')}>{helper}</p>}

            <ErrorMessage name={name}>
              {(msg) => {
                return <div className="font-normal text-errorRed">{msg}</div>;
              }}
            </ErrorMessage>
          </>
        )}
      </Field>
    </>
  );
};
