import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import clsx from 'clsx';

import type { FormFields } from '../constants/types';

export const TextField = ({
  field,
  ...props
}: {
  field: FieldInputProps<any>;
  props: FormFields;
}) => {
  return (
    <div className="text-black relative w-full">
      <input
        className={clsx(classes.menu.container, 'text-black')}
        {...props}
        {...field}
      />
    </div>
  );
};
