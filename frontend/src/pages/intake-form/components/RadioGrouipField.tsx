import { RadioGroup, Radio, Label, Field as HeadlessField } from '@headlessui/react';
import clsx from 'clsx';
import type { FormikProps } from 'formik';
import { useField, useFormikContext } from 'formik';
import { Fragment } from 'react';
import type { FormFields } from '../types';
import type { IntakeFormData } from '../fields';

export const RadioGroupField = (props: FormFields & FormikProps<IntakeFormData>) => {
  console.log(props);
  const { values } = useFormikContext<IntakeFormData>();
  const [field] = useField(props.name);
  return (
    <>
      <RadioGroup
        value={values[props.name as keyof typeof values] as string}
        onChange={field.onChange}
      >
        {props.options?.map((itm: { label: string; value: string }) => (
          <HeadlessField key={itm.value} className="flex items-center gap-2">
            <Radio as={Fragment} value={itm.value}>
              {({ checked, disabled }) => (
                <span
                  className={clsx(
                    'group flex size-5 items-center justify-center rounded-full border',
                    checked ? 'bg-blue-400' : 'bg-white',
                    disabled && 'bg-gray-100',
                  )}
                >
                  {checked && <span className="size-2 rounded-full bg-white" />}
                </span>
              )}
            </Radio>
            <Label>{itm.label}</Label>
          </HeadlessField>
        ))}
      </RadioGroup>
    </>
  );
};
