import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { formatPaylistID, formatPhone } from '@/utils';
import clsx from 'clsx';

export const TextField = ({
  field,
  type,
  placeholder,
  disabled,
}: {
  field: FieldInputProps<any>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
  if (type === 'tel') {
    field.value = formatPhone(field.value);
  }
  if (field.name === 'paylistId') {
    field.value = formatPaylistID(field.value);
  }

  return (
    <input
      {...field}
      placeholder={placeholder}
      className={clsx(disabled ? classes.menu.disabled : classes.menu.container)}
      disabled={disabled}
    />
  );
};
