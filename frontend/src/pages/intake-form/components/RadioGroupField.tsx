import { RadioGroup, Radio, Label, Field } from '@headlessui/react';
import clsx from 'clsx';
import { useFormikContext, type FormikProps } from 'formik';

import { Fragment } from 'react';
import type { FormFields } from '../types';
import type { IntakeFormPersonnelData } from '../fields';
import { Program } from '@/common';

export const RadioGroupField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  console.log(props);
  const { values, setFieldValue } = useFormikContext<IntakeFormPersonnelData>();
  console.log(values);

  return (
    <>
      <RadioGroup
        defaultValue={values.program ?? Program.ALL}
        value={values.program}
        onChange={(value: string) => setFieldValue(props.name, value)}
      >
        {props.options?.map((itm: { label: string; value: string }) => (
          <Field key={itm.value} className="flex items-center gap-2">
            <Radio as={Fragment} value={itm.value} disabled={props?.disabled}>
              {({ checked, disabled }) => (
                <span
                  className={clsx(
                    'group flex size-5 items-center justify-center rounded-full border',
                    checked ? 'bg-blue-800' : 'bg-white',
                    disabled && checked && 'bg-gray-800',
                    disabled && !checked && 'bg-gray-200',
                  )}
                >
                  {checked && <span className="size-2 rounded-full bg-white" />}
                </span>
              )}
            </Radio>
            <Label className={clsx(props.disabled ? 'text-grey-200' : 'text-black')}>
              {itm.label}
            </Label>
          </Field>
        ))}
      </RadioGroup>
    </>
  );
};
