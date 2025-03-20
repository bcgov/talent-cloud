import { ButtonTypes } from '@/common';
import type { FormikErrors, FormikValues } from 'formik';
import { useFormikContext } from 'formik';
import { Button } from '@/components';
import type { IntakeFormValues } from '../constants/types';

import { AlertType, useAlertContext } from '@/providers/Alert';
import { useNavigate } from 'react-router';

export const FormButtonNavigation = ({
  saveUpdateForm,
  handlePrevious,
  handleNext,
  disableNext,
  disablePrevious,
}: {
  saveUpdateForm: (values: FormikValues) => void;
  handlePrevious: (
    validateForm: () => Promise<FormikErrors<IntakeFormValues>>,
  ) => Promise<void>;
  handleNext: (
    validateForm: () => Promise<FormikErrors<IntakeFormValues>>,
  ) => Promise<void>;
  disableNext: boolean;
  disablePrevious: boolean;
}) => {
  const { values, validateForm } = useFormikContext<IntakeFormValues>();
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();
  return (
    <div>
      <div className="border border-t-grey-200"></div>
      <div className="flex flex-row justify-between px-32 py-8">
        <div className="flex flex-row space-x-6">
          <Button
            text="Cancel"
            variant={ButtonTypes.TEXT}
            // TODO: Save and navigate? Delete form?
            onClick={() => navigate('/')}
          />
          <Button
            text="Save For Later"
            variant={ButtonTypes.OUTLINED}
            onClick={() => {
              saveUpdateForm(values);
              showAlert({
                title: 'Form Saved!',
                type: AlertType.SUCCESS,
                message: 'Form Data Has been Saved',
              });
            }}
          />
        </div>
        <div className="flex flex-row space-x-6">
          <Button
            text="Previous"
            disabled={disablePrevious}
            variant={ButtonTypes.OUTLINED}
            onClick={async () => await handlePrevious(validateForm)}
          />
          <Button
            text="Next"
            variant={ButtonTypes.SOLID}
            disabled={disableNext}
            onClick={async () => await handleNext(validateForm)}
          />
        </div>
      </div>
    </div>
  );
};
