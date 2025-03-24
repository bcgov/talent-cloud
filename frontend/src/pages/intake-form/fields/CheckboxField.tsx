// formik
import type { FieldInputProps } from 'formik';
import { useFormikContext } from 'formik';

// ui
import { Checkbox } from '@headlessui/react';

// styles
import clsx from 'clsx';

// types
import type { IntakeFormValues } from '../constants/types';

export const CheckboxField = ({
  field,
  placeholder,
}: {
  field: FieldInputProps<any>;
  placeholder: string;
}) => {
  const { setFieldValue } = useFormikContext<IntakeFormValues>();
  return (
    <>
      <div className="w-full flex flex-row font-normal mt-2 text-sm gap-2 text-defaultGray text-wrap">
        <Checkbox
          onChange={(e) => setFieldValue(field.name, e ? 'true' : 'false')}
          checked={field.value === 'true'}
          defaultValue={'false'}
          name={`${field.name}`}
          className="group block size-4 rounded border border-gray-700 bg-white data-[checked]:bg-gray-700 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500 "
        >
          {({ checked, disabled }) => (
            <span
              className={clsx(
                'block size-4 rounded border',
                !checked && 'bg-white',
                checked && !disabled && 'bg-blue-800',
                checked && disabled && 'bg-gray-500',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <svg
                className={clsx(
                  'stroke-white',
                  checked ? 'opacity-100' : 'opacity-0',
                )}
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </Checkbox>
        <span>{placeholder}</span>
      </div>
    </>
  );
};
