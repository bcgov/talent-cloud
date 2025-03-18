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
    // field group should be rendered as a component rather than a field, all rendered components from the renderField function will be wrapped in a field component
    // case 'field-group':
    //   return <FieldGroup field={props} />;
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
            title={fieldItm.label}
            content={fieldItm.content}
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
      return <div className="col-span-2">{fieldItm.component()}</div>;
    default:
      return <></>;
  }
};

export const handleFilterProgram = (
  itm: FormFields | FormSection,
  program: string | null,
) => {
  if (program === 'all') {
    return true;
  } else if (itm.program === program || itm.program === 'all' || !itm.program) {
    return true;
  } else {
    return false;
  }
};

export const dynamicFields: { [key: string]: any } = {
  tools: {
    toolId: '',
    toolProficiency: '',
  },
  certifications: {
    certificationId: '',
    expiry: '',
  },
  languages: {
    language: '',
    languageProficiency: '',
  },
};
