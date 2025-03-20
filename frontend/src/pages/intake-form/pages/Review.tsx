import { ButtonTypes } from '@/common';
import { Button } from '@/components';
import { useFormikContext } from 'formik';
import type { IntakeFormValues } from '../constants/types';

export const Review = () => {
  const { submitForm, errors } = useFormikContext<IntakeFormValues>();

  return (
    <div>
      {JSON.stringify(errors)}
      <Button variant={ButtonTypes.SOLID} text={'Submit'} onClick={submitForm} />
    </div>
  );
};
