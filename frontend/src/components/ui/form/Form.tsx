import { type MouseEvent } from 'react';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Form as FormikForm, Formik } from 'formik';
import { ButtonTypes } from '@/common';
import { Button } from '@/components';
import { FormSection } from './FormSection';
import type { Personnel } from '@/common';
import type { SectionType } from '@/components/profile/forms/constants';
import { FormField } from './FormField';

type FormProps = {
  initialValues: any;
  onSubmit: (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => void;
  validationSchema: any;
  handleClose: (e: MouseEvent<HTMLElement>) => void;
  sections?: SectionType[];
  fields?: any;
  showHeaders?: boolean;
  fieldChangeHandler?: (e: any, field: any, values: any, setValues: any) => void;
};

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  handleClose,
  sections,
  showHeaders = true,
  fieldChangeHandler,
  fields,
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
            {sections ? (
              <div className="flex flex-col w-full items-start justify-start space-y-8">
                {fieldChangeHandler &&
                  sections?.map((section) => (
                    <FormSection
                      key={section.header}
                      header={section.header}
                      fields={section.fields}
                      fieldChangeHandler={fieldChangeHandler}
                      showHeader={showHeaders}
                    />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(fields)?.map((key: string) => (
                  <div key={key} className={fields[key]?.span ?? 'col-span-1'}>
                    {!fields[key].hidden && (
                      <FormField
                        key={fields[key].name}
                        field={fields[key]}
                        handleChange={fields[key].onChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
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
