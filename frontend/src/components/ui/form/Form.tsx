import { type MouseEvent } from 'react';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Form as FormikForm, Formik } from 'formik';
import { ButtonTypes } from '@/common';
import { Button } from '@/components';
import { FormSection } from './FormSection';
import type { SectionType } from '@/pages/profile/ProfileEditForm/constants';
import type { Personnel } from '@/pages/dashboard';

type FormProps = {
  initialValues: any;
  onSubmit: (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => void;
  validationSchema: any;
  handleClose: (e: MouseEvent<HTMLElement>) => void;
  sections: SectionType[];
  fieldChangeHandler: (e: any, field: any, values: any, setValues: any) => void;
};

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  handleClose,
  sections,
  fieldChangeHandler,
}: FormProps) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(
        values: FormikValues,
        helpers: FormikHelpers<Personnel>,
        ...props: any
      ) => onSubmit(values, helpers, ...props)}
    >
      {({
        isSubmitting,
        isValid,
      }: FormikState<any> & FormikProps<any> & FormikProps<any>) => (
        <FormikForm>
          <div className="w-full min-h-full px-8 pt-8 items-center justify-center">
            <div className="flex flex-col w-full items-start justify-start space-y-8">
              {sections.map((section) => (
                <FormSection
                  key={section.header}
                  header={section.header}
                  fields={section.fields}
                  fieldChangeHandler={fieldChangeHandler}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row space-x-6 py-4 justify-end px-8">
            <Button
              variant={ButtonTypes.PRIMARY}
              type="button"
              onClick={handleClose}
              text="Cancel"
            />

            <Button
              variant={ButtonTypes.TERTIARY}
              text="Save"
              type="submit"
              disabled={isSubmitting || !isValid}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
