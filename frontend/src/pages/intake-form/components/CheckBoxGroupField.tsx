import { Checkbox } from '@headlessui/react';
import type { FormikProps } from 'formik';
import type { IntakeFormPersonnelData } from '../fields';
import type { FormFields } from '../types';

export const CheckboxGroupField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  console.log(props);
  return (
    <div>
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </div>
  );
};
