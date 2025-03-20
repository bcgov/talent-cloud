// formik
import type { FieldInputProps } from 'formik';
import { Field } from 'formik';

// form
import { useIntakeForm } from '@/hooks/useIntakeForm';
import clsx from 'clsx';

export const RadioGroupField = ({
  field,
  options,
}: {
  field: FieldInputProps<any>;
  options?: any[];
}) => {
  const { currentProgram } = useIntakeForm();
  const disabled = field.name === 'program' && currentProgram ? true : false;

  return (
    <>
      <div id="my-radio-group"></div>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {options?.map((itm: any) => (
          <label key={itm.value}>
            <Field
              {...field}
              name={field.name}
              value={itm.value}
              type="radio"
              disabled={disabled}
              className={clsx(disabled && 'bg-gray-200')}
            />
            <span
              className={clsx(
                itm.value === field.value && 'text-dark-900',
                disabled && 'text-gray-400',
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
