// formik
import type { FieldInputProps, FormikFormProps } from 'formik';

// types & values
import type { FormComponent, FormFields, FormSection } from '../constants/types';

import { BannerType } from '@/common/enums/banner-enum';

// ui
import { Accordion } from '../components/Accordion';
import { Banner } from '@/components/ui/Banner';
import { CheckboxGroupField } from '../fields/CheckBoxGroupField';
import { RadioGroupField } from '../fields/RadioGroupField';
import { SelectField } from '../fields/SelectField';
import { TextField } from '../fields/TextField';
import { DateField } from '../fields/DateField';
import { MultiSelectField } from '../fields/MultiSelectField';

export const renderField = ({
  field,
  form,
  props,
  options,
}: {
  field: FieldInputProps<any>;
  form: FormikFormProps;
  props: FormFields;
  options?: any[];
}) => {
  switch (props.type) {
    case 'select':
      return <SelectField field={field} props={props} options={options ?? []} />;
    case 'radio-group':
      return (
        <RadioGroupField
          field={field}
          form={form}
          props={props}
          options={options ?? []}
        />
      );
    case 'checkbox-group':
      return <CheckboxGroupField field={field} options={options ?? []} />;
    case 'date':
      return <DateField field={field} />;
    case 'multiselect':
      return (
        <MultiSelectField field={field} props={props} options={options ?? []} />
      );
    case 'multiselect-group':
    case 'text':
    case 'tel':
    default:
      return <TextField field={field} props={props} />;
  }
};

export const intakeFormComponents = ['infoBox', 'componentBox', 'accordion'];

export const renderIntakeFormComponent = (fieldItm: FormComponent) => {
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
