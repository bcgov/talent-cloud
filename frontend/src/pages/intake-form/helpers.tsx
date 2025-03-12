// formik
import type { FormikProps } from 'formik';

// types & values
import type { FormFields, FormSection } from './types';
import type { IntakeFormValues } from './fields';
import { BannerType } from '@/common/enums/banner-enum';

// ui
import { Accordion } from './components/Accordion';
import { Banner } from '@/components/ui/Banner';
import { CheckboxGroupField } from './components/CheckBoxGroupField';
import { RadioGroupField } from './components/RadioGroupField';
import { SelectField } from './components/SelectField';
import { TextField } from './components/TextField';

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

export const intakeFormComponents = ['infoBox', 'componentBox', 'accordion'];
export const renderIntakeFormComponent = (fieldItm: FormFields) => {
  switch (fieldItm.type) {
    case 'infoBox':
      return (
        <div className="col-span-2">
          <Banner
            title={fieldItm.name}
            content={fieldItm.label}
            type={BannerType.INFO}
          />
        </div>
      );
    case 'accordion':
      return (
        <div className="col-span-2">
          {fieldItm.component && (
            <Accordion title={fieldItm.label}>{fieldItm.component}</Accordion>
          )}
        </div>
      );
    case 'componentBox':
      return <div className="col-span-2">{fieldItm.component}</div>;
    default:
      return <></>;
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
