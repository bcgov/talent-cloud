import { Field, useFormikContext, type FormikProps } from 'formik';
import type { FormFields } from '../types';
import type { IntakeFormPersonnelData } from '../fields';

export const RadioGroupField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  const { values } = useFormikContext<IntakeFormPersonnelData>();
  return (
    <>
      <div id="my-radio-group">{values?.program}</div>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {props?.options?.map((itm) => (
          <label key={itm.value}>
            <Field type="radio" name="program" value={itm.value} />
            {itm.label}
          </label>
        ))}
      </div>
    </>
  );
};
