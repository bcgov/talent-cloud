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
}: {
  saveUpdateForm: (values: IntakeFormValues) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
  step: number;
}) => {
  const { values, submitForm, isValid, isSubmitting } =
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
              loading={isSubmitting}
              disabled={!isValid || step === 5 || isSubmitting}
              onClick={submitForm}
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
