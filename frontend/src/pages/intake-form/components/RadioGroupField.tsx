// formik
import { Field, useFormikContext, type FormikProps } from 'formik';

// form
import type { FormFields } from '../types';
import type { IntakeFormValues } from '../fields';

export const RadioGroupField = (
  props: FormFields & FormikProps<IntakeFormValues>,
) => {
  const { errors } = useFormikContext<IntakeFormValues>();

  return (
    <>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {props?.options?.map((itm) => (
          <label key={itm.value} className="flex flex-row gap-2 items-center">
            <Field type="radio" name={props.name} value={itm.value} />
            {itm.label}
          </label>
        ))}
      </div>

      {errors?.[props.name as keyof typeof errors] && (
        <div className="font-normal text-errorRed">
          {errors[props.name as keyof typeof errors]?.toString()}
        </div>
      )}
    </>
  );
};
