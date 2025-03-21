import { ButtonTypes } from '@/common';
import type { FormikValues } from 'formik';
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
  step,
  handleSetCompletedStep,
}: {
  saveUpdateForm: (values: FormikValues) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
  step: number;
  handleSetCompletedStep: (step: number) => void;
}) => {
  const { values, submitForm, isValid, validateForm } =
    useFormikContext<IntakeFormValues>();
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
            disabled={step === 5}
            // TODO: Save and navigate? Delete form?
            onClick={() => navigate('/')}
          />
          <Button
            text="Save For Later"
            variant={ButtonTypes.OUTLINED}
            disabled={step === 5}
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
            disabled={disablePrevious || step === 5}
            variant={ButtonTypes.OUTLINED}
            onClick={() => {
              handlePrevious;
              saveUpdateForm(values);
            }}
          />
          {step === 4 || step === 5 ? (
            <Button
              text="Submit"
              variant={ButtonTypes.SOLID}
              disabled={!isValid || step === 5}
              onClick={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length > 0) {
                  showAlert({
                    type: AlertType.ERROR,
                    message: 'Please resolve validation errors.',
                  });
                } else {
                  handleSetCompletedStep(4);
                  await submitForm();
                }
              }}
            />
          ) : (
            <Button
              text="Next"
              variant={ButtonTypes.SOLID}
              disabled={disableNext}
              onClick={() => {
                handleNext();
                saveUpdateForm(values);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
