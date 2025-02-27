import { useFormikContext } from 'formik';

export const ReviewAndSubmit = () => {
  const { values, handleChange } = useFormikContext();
  console.log(values, handleChange);
  return <></>;
};
