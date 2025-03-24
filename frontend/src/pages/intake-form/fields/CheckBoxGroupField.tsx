// formik
import { Field, useFormikContext } from 'formik';

// types
import type { FormFields, IntakeFormValues } from '../constants/types';

export const CheckboxGroupField = ({
  field,
  options,
}: {
  field: FormFields;
  options: any;
}) => {
  const { setValues, values } = useFormikContext<IntakeFormValues>();

  const handleChange = (value: any) => {
    if (
      !values[field.name as keyof typeof values] ||
      (values[field.name as keyof typeof values] as any[])[0] === '' ||
      (values[field.name as keyof typeof values] as any[])[0] === undefined
    ) {
      setValues({ ...values, [field.name]: [value] });
    } else {
      if ((values[field.name as keyof typeof values] as any[]).includes(value)) {
        setValues({
          ...values,
          [field.name]: (values[field.name as keyof typeof values] as any[]).filter(
            (itm) => itm !== value,
          ),
        });
      } else {
        setValues({
          ...values,
          [field.name]: [
            ...(values[field.name as keyof typeof values] as any[]),
            value,
          ],
        });
      }
    }
  };

  return (
    <>
      <div
        role="group"
        aria-labelledby="checkbox-group"
        className="w-full flex flex-col font-normal mt-2 text-sm gap-2 text-defaultGray text-wrap"
      >
        {options &&
          options.map((itm: any, index: number) => {
            const checked =
              field.name === 'functions'
                ? (values?.[field.name as keyof typeof values] as any)
                    .map((value: any) => value?.id)
                    ?.includes(itm?.value?.id)
                : (values?.[field.name as keyof typeof values] as any).includes(
                    itm.value,
                  );

            return (
              <div
                key={itm.label + index.toString()}
                className="flex flex-row space-x-4 items-center "
              >
                <Field
                  id={`${field.name}.${index}`}
                  checked={checked}
                  label={''}
                  type={'checkbox'}
                  onChange={() => handleChange(itm.value)}
                  name={`${field.name}.${index}`}
                  className="cursor-pointer"
                />
                <label htmlFor={`${field?.name}.${index}`} className="font-normal">
                  {itm.label}
                  {itm.required && (
                    <>
                      <span className="text-red-400">* </span>
                      <span className="subtext">(Required)</span>
                    </>
                  )}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
};
