import { classes } from '@/components/filters/classes';
import type { FormikProps } from 'formik';

import type { FormFields } from '../types';
import type { IntakeFormPersonnelData } from '../fields';

export const TextField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  console.log(props);

  return (
    <div className="text-black relative">
      <input className={classes.menu.container} {...props} />
    </div>
  );
};
