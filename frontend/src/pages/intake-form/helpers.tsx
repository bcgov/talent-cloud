import type { FormikProps } from 'formik';
import { SelectField } from './components/SelectField';
import { TextField } from './components/TextField';
import type { IntakeFormValues } from './fields';
import type { FormFields, FormSection } from './types';
import { RadioGroupField } from './components/RadioGroupField';
import { CheckboxGroupField } from './components/CheckBoxGroupField';

export const renderField = (
  fieldItm: FormFields,
  fieldProps: FormikProps<IntakeFormValues>,
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
    case 'checkbox-group':
      return <CheckboxGroupField {...fieldItm} {...fieldProps} />;
    case 'multiselect-group':
    default:
      return <TextField {...fieldItm} {...fieldProps} />;
  }
};

export const handleFilterProgram = (
  itm: FormFields | FormSection,
  program: string | null,
) => {
  if (!program) {
    return false;
  }
  if (program === 'all') {
    return itm;
  }
  if (itm.program === program) {
    return itm;
  }
};

export const dynamicFields: { [key: string]: any } = {
  tools: {
    tool: {
      name: '',
      proficiency: '',
    },
    toolProficiency: '',
  },
  certifications: {
    certificate: {
      name: '',
      expiry: '',
    },
    expiry: '',
  },
  languages: {
    language: '',
    languageProficiency: '',
  },
};
