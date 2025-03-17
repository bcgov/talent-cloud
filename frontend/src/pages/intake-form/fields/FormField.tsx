// react
import { ReactComponentElement } from 'react';

// formik
import type { FieldInputProps, FormikFormProps } from 'formik';
import { Field, ErrorMessage } from 'formik';

//util
import { handleFilterProgram, renderField } from '../utils/helpers';

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
  selectedProgram?: string;
  colspan?: number;
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
    selectedProgram,
    colspan,
  } = props;

  return (
    <>
      {handleFilterProgram(props, selectedProgram as string) && (
        <div
          key={name}
          className={colspan ? `col-span-${colspan}` : 'col-span-1'}
        >
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
                  program: selectedProgram,
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
        </div>
      )}
    </>
  );
};
