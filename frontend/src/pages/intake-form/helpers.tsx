import type { FormikProps } from 'formik';
import { SelectField } from './components/SelectField';
import { TextField } from './components/TextField';
import type { IntakeFormData } from './fields';
import type { FormFields } from './types';
import { RadioGroupField } from './components/RadioGrouipField';

export const renderField = (
  fieldItm: FormFields,
  fieldProps: FormikProps<IntakeFormData>,
) => {
  switch (fieldItm.type) {
    case 'text':
      return <TextField {...fieldItm} {...fieldProps} />;
    case 'tel':
      return <TextField {...fieldItm} {...fieldProps} />;
    case 'select':
      return <SelectField {...fieldItm} {...fieldProps} />;
    case 'radio':
      return <RadioGroupField {...fieldItm} {...fieldProps} />;
    default:
      return <TextField {...fieldItm} {...fieldProps} />;
  }
};
