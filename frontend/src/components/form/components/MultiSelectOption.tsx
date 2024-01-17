import { formClass } from '@/styles/fieldStyles';
import { components } from 'react-select';

export const Option = ({ children, ...props }: any) => {
  return (
    <components.Option {...props}>
      <input
      readOnly
        type={'checkbox'}
        checked={props.isSelected}
        onChange={props.onChange}
        className={formClass.checkbox}
      />
      {children}
    </components.Option>
  );
};
