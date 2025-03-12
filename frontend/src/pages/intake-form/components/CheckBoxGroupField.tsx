// formik
import type { FormikProps } from 'formik';
import { useFormikContext } from 'formik';

// fields
import type { FormFields } from '../types';
import type { IntakeFormValues } from '../fields';
import { Checkbox, Fieldset } from '@headlessui/react';

export const CheckboxGroupField = (
  props: FormFields & FormikProps<IntakeFormValues>,
) => {
  const { values, setFieldValue } = useFormikContext<IntakeFormValues>();

  const handleChange = (value: any) => {
    const fieldValues = values[props.name as keyof IntakeFormValues];
    const valueSet = new Set(fieldValues as any);
    if (valueSet.has(value)) {
      valueSet.delete(value);
    } else {
      valueSet.add(value);
    }
    setFieldValue(props.name, Array.from(valueSet));
  };

  return (
    <>
      <div className="w-full flex flex-col font-normal mt-2 text-sm text-ellipsis text-nowrap gap-2 text-defaultGray truncate ">
        <Fieldset className="space-y-6">
          {props?.options?.map((itm) => (
            <div key={itm.value} className="flex flex-row space-x-2 items-center">
              <Checkbox
                onChange={() => handleChange(itm.value)}
                className="group block size-4 rounded border border-gray-700 bg-white data-[checked]:bg-gray-700 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500 "
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
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
              </Checkbox>
              <label className="font-normal">{itm.label}</label>
            </div>
          ))}
        </Fieldset>
      </div>
    </>
  );
};
