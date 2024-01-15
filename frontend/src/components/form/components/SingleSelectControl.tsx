import type { ControlProps } from 'react-select';
import { components } from 'react-select';
import type { FieldOption } from '../interface';

export const Control = ({
  children,
  ...props
}: ControlProps<FieldOption, false>) => {
  return <components.Control {...props}>{children}</components.Control>;
};
