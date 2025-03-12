import { classes } from '@/components/filters/classes';
import { type FormikProps } from 'formik';

import type { FormFields } from '../types';
import type { IntakeFormValues } from '../fields';
import clsx from 'clsx';

export const TextField = (props: FormFields & FormikProps<IntakeFormValues>) => {
  return (
    <div className="text-black relative w-full">
      <input className={clsx(classes.menu.container, 'text-black')} {...props} />
    </div>
  );
};
