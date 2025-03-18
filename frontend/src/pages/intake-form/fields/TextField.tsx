import { classes } from '@/components/filters/classes';
import type { FieldInputProps } from 'formik';
import { formatPaylistID, formatPhone } from '@/utils';

export const TextField = ({
  field,
  type,
  placeholder,
}: {
  field: FieldInputProps<any>;
  type?: string;
  placeholder?: string;
}) => {
  if (type === 'tel') {
    field.value = formatPhone(field.value);
  }
  if (field.name === 'paylistId') {
    field.value = formatPaylistID(field.value);
  }

  return (
    <input {...field} placeholder={placeholder} className={classes.menu.container} />
  );
};
