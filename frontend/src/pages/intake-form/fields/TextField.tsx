import { classes } from '@/components/filters/classes';
import { useFormikContext, type FieldInputProps } from 'formik';
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
  const { setFieldValue } = useFormikContext();
  return (
    <input
      value={field.value ?? ''}
      onChange={(e) => setFieldValue(field.name, e.target.value)}
      placeholder={placeholder}
      className={clsx(disabled ? classes.menu.disabled : classes.menu.formContainer)}
      disabled={disabled}
    />
  );
};
