
import { Field,  type FormikProps } from 'formik';
import type { FormFields } from '../types';
import type {  IntakeFormPersonnelData } from '../fields';


export const RadioGroupField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  
  

  
  return (
    <>
  
      <div id="my-radio-group"></div>
      <div role="group" aria-labelledby="my-radio-group" className="flex flex-col">
        {props?.options?.map((itm) => (
          <label>
            <Field type="radio" name="program" value={itm.value} />
            {itm.label}
          </label>
        ))}
      </div>

      
    </>
  );
};
