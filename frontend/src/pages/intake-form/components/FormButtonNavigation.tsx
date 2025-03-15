import { ButtonTypes } from '@/common';
import type { FormikValues } from 'formik';
import { useFormikContext } from 'formik';
import { Button } from '@/components';
import type { IntakeFormValues } from '../constants/types';

import { AlertType, useAlertContext } from '@/providers/Alert';

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
  const { showAlert } = useAlertContext();

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
            onClick={() => {
              saveUpdateForm(values);
              showAlert({
                title: 'Form Saved!',
                type: AlertType.SUCCESS,
              });
            }}
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
