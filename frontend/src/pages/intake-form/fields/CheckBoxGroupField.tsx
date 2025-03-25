// formik
import { ErrorMessage, Field, useFormikContext } from 'formik';

// types
import type { FormFields, IntakeFormValues } from '../constants/types';

export const CheckboxGroupField = ({
  field,
  options,
}: {
  field: FormFields;
  options: any;
}) => {
  
  const { setFieldValue, values , errors} = useFormikContext<IntakeFormValues>();

  const handleChange = (value: any) => {
    const valueSet = new Set(field.value)
    valueSet.delete(null)
    valueSet.delete(undefined)
    console.log(valueSet, field.value, value)
    if(valueSet.has(value)){
      valueSet.delete(value)
    } else {
      valueSet.add(value)
    }
    setFieldValue( field.name, Array.from(valueSet))
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
console.log(itm)
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
                  onChange={() =>  handleChange(itm.value)}
                  name={field.name}
                  className="cursor-pointer"
                  disabled={itm.disabled}
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
                {/* <ErrorMessage name={field.name}>
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage> */}
                {/* {errors && (errors?.[field.name as keyof typeof errors] as any[])?.map(itm => <div>{itm}</div>)} */}
              </div>
            );
          })}
      </div>
    </>
  );
};
