import type { FormikProps } from 'formik';
import { SelectField } from './components/SelectField';
import { TextField } from './components/TextField';
import type { IntakeFormPersonnelData } from './fields';
import type { FormFields } from './types';
import { RadioGroupField } from './components/RadioGroupField';
import { CheckboxGroupField } from './components/CheckBoxGroupField';

export const renderField = (
  fieldItm: FormFields,
  fieldProps: FormikProps<IntakeFormPersonnelData>,
) => {
  switch (fieldItm.type) {
    case 'text':
      return <TextField {...fieldItm} {...fieldProps} />;
    case 'tel':
      return <TextField {...fieldItm} {...fieldProps} />;
    case 'select':
      return <SelectField {...fieldItm} {...fieldProps} />;
    case 'radio-group':
      return <RadioGroupField {...fieldItm} {...fieldProps} />;
    case 'checkbox':
      return <CheckboxGroupField {...fieldItm} {...fieldProps} />;
    default:
      return <TextField {...fieldItm} {...fieldProps} />;
  }
};
