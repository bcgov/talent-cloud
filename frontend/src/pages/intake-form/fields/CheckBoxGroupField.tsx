// formik
import type { FieldInputProps } from 'formik';
import { useFormikContext } from 'formik';

// fields

import { Checkbox } from '@headlessui/react';

import clsx from 'clsx';
import type { IntakeFormValues } from '../constants/types';

export const CheckboxGroupField = ({
  field,
  options,
}: {
  field: FieldInputProps<any>;
  options?: any[];
}) => {
  const { setFieldValue } = useFormikContext<IntakeFormValues>();

  const handleChange = (value: any) => {
    const valueSet = new Set(field.value);
    if (valueSet.has(value)) {
      valueSet.delete(value);
    } else {
      valueSet.add(value);
    }
    setFieldValue(field.name, Array.from(valueSet));
  };

  return (
    <>
      <div className="w-full flex flex-col font-normal mt-2 text-sm text-ellipsis text-nowrap gap-2 text-defaultGray truncate ">
        <>
          {options?.map((itm, index) => (
            <div
              key={itm.value.toString()}
              className="flex flex-row space-x-2 items-center"
            >
              <Checkbox
                checked={field.value.includes(itm.value)}
                onChange={() => handleChange(itm.value)}
                name={`${field.name}.${index}`}
                className="group block size-4 rounded border border-gray-700 bg-white data-[checked]:bg-gray-700 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500 "
              >
                {({ checked, disabled }) => (
                  <span
                    className={clsx(
                      'block size-4 rounded border',
                      !checked && 'bg-white',
                      checked && !disabled && 'bg-blue-500',
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
              <label className="font-normal">{itm.label}</label>
            </div>
          ))}
        </>
      </div>
    </>
  );
};
