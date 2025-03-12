import { ButtonTypes } from '@/common';
import type { FormikValues } from 'formik';
import { useFormikContext } from 'formik';
import type { IntakeFormValues } from './fields';
import { Button } from '@/components';

export const FormButtonNavigation = ({
  saveUpdateForm,
  handlePrevious,
  handleNext,
  disableNext,
  disablePrevious,
}: {
  saveUpdateForm: (values: FormikValues) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
}) => {
  const { values } = useFormikContext<IntakeFormValues>();
  return (
    <div>
      <div className="border border-t-grey-200"></div>
      <div className="flex flex-row justify-between px-32 py-8">
        <div className="flex flex-row space-x-6">
          <Button
            text="Cancel"
            variant={ButtonTypes.TEXT}
            // TODO: Save and navigate? Delete form?
            onClick={() => console.log('clicked')}
          />
          <Button
            text="Save For Later"
            variant={ButtonTypes.OUTLINED}
            onClick={() => saveUpdateForm(values)}
          />
        </div>
        <div className="flex flex-row space-x-6">
          <Button
            text="Previous"
            disabled={disablePrevious}
            variant={ButtonTypes.OUTLINED}
            onClick={handlePrevious}
          />
          <Button
            text="Next"
            variant={ButtonTypes.SOLID}
            disabled={disableNext}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};
