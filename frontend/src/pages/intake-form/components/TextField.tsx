import { classes } from '@/components/filters/classes';
import { useField, type FormikProps } from 'formik';

import type { FormFields } from '../types';
import type { IntakeFormPersonnelData } from '../fields';
import clsx from 'clsx';

export const TextField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  const [field] = useField(props.name);

  return (
    <div className="text-black relative">
      <input
        className={clsx(classes.menu.container, 'text-black')}
        {...props}
        {...field}
      />
    </div>
  );
};
