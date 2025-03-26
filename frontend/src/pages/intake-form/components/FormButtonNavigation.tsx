import { ButtonTypes } from '@/common';
import { useFormikContext } from 'formik';
import { Button } from '@/components';
import type { IntakeFormValues } from '../constants/types';
import { AlertType, useAlertContext } from '@/providers/Alert';
import { logoutUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';

export const FormButtonNavigation = ({
  saveUpdateForm,
  handlePrevious,
  handleNext,
  disableNext,
  disablePrevious,
  step,
  handleRemoveErrorStep,
  handleSetCompletedStep,
  handleSetErrors
}: {
  saveUpdateForm: (values: IntakeFormValues) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
  step: number;

  handleSetCompletedStep: (step: number) => void;
  handleRemoveErrorStep: (step: number) => void;
  handleSetErrors:(step: number)=> void
}) => {
  const { values, submitForm, isValid, validateForm, isValidating, isSubmitting } =
    useFormikContext<IntakeFormValues>();
  const { showAlert } = useAlertContext();

  const { keycloak } = useKeycloak();
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
            onClick={() => window.location.replace(logoutUrl(keycloak))}
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
            onClick={handlePrevious}
          />
          {[5, 4].includes(step) ? (
            <Button
              text="Submit"
              variant={ButtonTypes.SOLID}
              loading={isValidating || isSubmitting}
              disabled={!isValid || step === 5 || isValidating || isSubmitting}
              onClick={async () => {
                const errors = await validateForm();
                if (errors && Object.keys(errors).length > 0) {
                  handleSetErrors(4)
                  return showAlert({
                    type: AlertType.ERROR,
                    message: 'Please resolve validation errors.',
                  });
                }
                handleRemoveErrorStep(4);
                handleSetCompletedStep(4);
                await submitForm();
              }}
            />
          ) : (
            <Button
              text="Next"
              variant={ButtonTypes.SOLID}
              disabled={disableNext}
              onClick={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};
