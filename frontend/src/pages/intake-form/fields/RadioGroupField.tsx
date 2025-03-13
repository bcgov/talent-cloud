// formik
import type { FieldInputProps, FormikFormProps } from 'formik';
import { Field } from 'formik';

// form
import type { FormFields } from '../constants/types';

export const RadioGroupField = ({
  field,
  options,
}: {
  field: FieldInputProps<any>;
  form: FormikFormProps;
  props: FormFields;
  options?: any[];
}) => {
  return (
    <>
      <div id="my-radio-group"></div>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {options?.map((itm: any) => (
          <label key={itm.value}>
            <Field type="radio" name={field.name} value={itm.value} />
            <span className="px-2">{itm.label}</span>
          </label>
        ))}
      </div>
    </>
  );
};
