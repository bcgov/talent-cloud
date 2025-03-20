// react
import type { ReactComponentElement } from 'react';

// formik
import type { FormikErrors } from 'formik';
import { Field, useFormikContext } from 'formik';

// styles
import clsx from 'clsx';
import type { IntakeFormValues } from '../constants/types';

export const FormField = (props: {
  name: string;
  label: string | ReactComponentElement<any>;
  required?: boolean;
  type: string;
  helper?: string;

  disabled?: boolean;
  options?: any[];
  placeholder?: string;
  value?: any;
  colSpan?: number;
  component?: (props: any) => JSX.Element;
}) => {
  const {
    name,
    type,
    options,
    placeholder,
    disabled,
    helper,

    label,
    required,
    component,
    colSpan,
  } = props;
  const { errors } = useFormikContext<IntakeFormValues>();

  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="font-bold text-red-500">*</span>}
        </label>
      )}
      <Field
        className={clsx(
          '!border-t-blue-gray-200 focus:!border-t-gray-900 w-full py-4 text-black placeholder-gray-50',
          `${colSpan}`,
          disabled ? 'bg-gray-200' : 'bg-white',
        )}
        name={name}
        label={label}
        required={required}
        type={type}
        helper={helper}
        placeholder={placeholder}
        disabled={disabled}
        options={options}
        component={component}
      />
      {helper && <p className={clsx('subtext', 'py-2')}>{helper}</p>}
      {errors && (
        <div className="font-normal text-sm text-errorRed">
          {
            (errors as FormikErrors<{ [key: string]: string }>)[
              name as keyof typeof errors
            ]
          }
        </div>
      )}
    </>
  );
};
