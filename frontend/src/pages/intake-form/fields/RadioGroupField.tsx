// formik
import type { FieldInputProps } from 'formik';
import { Field, useFormikContext } from 'formik';

// form
import clsx from 'clsx';
import type { IntakeFormValues } from '../constants/types';

export const RadioGroupField = ({
  field,
  options,
  disabled
}: {
  field: FieldInputProps<any>;
  options?: any[];
  disabled?: boolean
}) => {

  const { setFieldValue } = useFormikContext<IntakeFormValues>();

  return (
    <>
      <div id="my-radio-group"></div>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {options?.map((itm: any, index: number) => (
          <label key={itm?.value + index?.toString()} className="font-normal">
            <Field
              {...field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(field.name, e.target.value)
              }
              value={itm.value}
              type="radio"
              disabled={disabled}
              className={clsx(disabled && 'bg-gray-200')}
            />
            <span
              className={clsx(
                itm.value === field.value && 'text-dark-900 font-normal',
                
                'px-2',
              )}
            >
              {itm.label}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};
