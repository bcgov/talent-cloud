// formik
import { FormikProps } from 'formik';

// fields
import { FormFields } from '../types';
import { IntakeFormPersonnelData } from '../fields';

export const CheckboxGroupField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  return (
    <div className="w-full h-full flex flex-col font-normal h-10 mt-2 text-sm text-ellipsis text-nowrap gap-2 text-defaultGray truncate ">
      {props?.options?.map((itm) => {
        return (
          <div key={itm.name}>
            <input type="checkbox" name={itm.name} value={itm.value} />{' '}
            <label className="font-normal">{itm.label}</label>
          </div>
        );
      })}
    </div>
  );
};
