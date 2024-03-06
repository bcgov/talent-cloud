import { Button, TextArea } from '@/components/ui';
import type { FormikProps, FormikState, FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ButtonTypes } from '@/common';

export const EditNotes = ({
  name,
  notes,
  onSubmit,
  handleClose,
  label,
}: {
  name: string;
  notes: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
  handleClose: () => void;
  label: string;
}) => {
  const notesSchema = Yup.object().shape({
    logisticsNotes: Yup.string()
      .optional()
      .max(500, 'Notes must be less than 500 characters'),
    coordinatorNotes: Yup.string()
      .optional()
      .max(500, 'Notes must be less than 500 characters'),
  });

  const handleSubmit = async (values: FormikValues) => {
    onSubmit(values);
    handleClose();
  };

  const notesField = {
    name: name,
    placeholder: 'Enter notes here',
    required: false,
    disabled: false,
  };
  return (
    <div className="w-full">
      <Formik
        validationSchema={notesSchema}
        initialValues={notes}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          errors,
          ...props
        }: FormikState<{ [key: string]: string }> &
          FormikProps<{ [key: string]: string }>) => (
          <Form>
            <div className="flex flex-col items-center justify-center w-full">
              <TextArea {...props} label={label} {...notesField} />
            </div>
            <div className="w-full border border-t-1 mx-0 px-0 shadow-lg mt-16"></div>

            <div className="flex flex-row space-x-6 py-4 justify-end px-8">
              <Button
                variant={ButtonTypes.SECONDARY}
                type="button"
                onClick={handleClose}
                text="Cancel"
              />

              <Button
                variant={ButtonTypes.TERTIARY}
                text="Save"
                type="submit"
                disabled={isSubmitting || !props.isValid}
              />
            </div>
            <div className="w-full flex flex-row justify-end">
              {Object.values(errors).length > 0 && (
                <div className="text-error font-bold">
                  Please resolve form errors
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
