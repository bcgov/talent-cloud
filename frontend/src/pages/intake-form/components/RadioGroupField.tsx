// formik
import { Field, type FormikProps } from 'formik';

// form
import type { FormFields } from '../types';
import type { IntakeFormPersonnelData } from '../fields';

export const RadioGroupField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  return (
    <>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {props?.options?.map((itm) => (
          <label key={itm.value}>
            <Field type="radio" name={props.name} value={itm.value} />
            {itm.label}
          </label>
        ))}
      </div>
    </>
  );
};
