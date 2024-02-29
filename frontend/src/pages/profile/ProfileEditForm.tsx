import type { MouseEvent } from 'react';
import { Dialog } from '@headlessui/react';
import type { Personnel } from '../dashboard';
import { ButtonTypes } from '@/common';
import { EditProfileValidationSchema, fields, sections } from './constants';
import { Divider } from '@/components/ui/Divider';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Field, Form, Formik } from 'formik';
import { Button, SectionHeader, Select, TextInput } from '@/components';
import { format } from 'date-fns';

export const ProfileEditForm = ({
  open,
  handleOpenEditPopUp,
  personnel,
  updatePersonnel,
}: {
  open: boolean;
  handleOpenEditPopUp: (e: MouseEvent<HTMLElement>) => void;
  personnel: Personnel;
  updatePersonnel: (personnel: FormikValues) => Promise<void>;
}) => {
  const initialValues: Personnel = { ...personnel };

  delete initialValues?.availability;
  delete initialValues?.experiences;

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => {
    // only send the fields that have been changed
    Object.keys(personnel).forEach((key) => {
      if (values[key as keyof Personnel] === personnel[key as keyof Personnel]) {
        delete values[key as keyof Personnel];
      }
    });
    if (values.remoteOnly === 'true') {
      values.remoteOnly = true;
    } else {
      values.remoteOnly = false;
    }
    if (values.willingToTravel === 'true') {
      values.willingToTravel = true;
    } else {
      values.willingToTravel = false;
    }

    helpers.setSubmitting(false);
    await updatePersonnel(values);

    handleOpenEditPopUp(props.event);
  };

  return (
    <Dialog
      open={open}
      onClose={(...props: any) => handleOpenEditPopUp(props.event)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto rounded bg-white  lg:w-2/3 xl:w-1/2">
            <Dialog.Title className="bg-grayBackground flex flex-row w-full justify-between p-4">
              <h4 className="font-bold">Edit Member Details</h4>
              <button
                className="text-sm text-primaryBlue underline font-normal"
                onClick={handleOpenEditPopUp}
              >
                Close
              </button>
            </Dialog.Title>

            <Formik
              validationSchema={EditProfileValidationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                errors,
                values,
                ...props
              }: FormikState<Personnel> & FormikProps<Personnel>) => (
                <Form>
                  <div className="flex min-h-full px-8 items-center justify-center">
                    <div className="flex flex-col w-full items-start justify-start space-y-8">
                      <SectionHeader section={sections.general.header} />
                      <div className="w-1/3">
                        <Field
                          props={props}
                          field={{
                            ...fields.dateJoined,
                            value: format(
                              values.dateJoined ?? new Date(),
                              'yyyy-MM-dd',
                            ),
                          }}
                          component={TextInput}
                        />
                      </div>

                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Field
                          props={props}
                          {...props}
                          field={fields.firstName}
                          component={TextInput}
                        />
                        <Field
                          props={props}
                          field={fields.middleName}
                          component={TextInput}
                        />
                        <Field
                          props={props}
                          field={fields.lastName}
                          component={TextInput}
                        />
                      </div>

                      <div className="w-full grid grid-cols-1 gap-6">
                        <Field
                          props={props}
                          field={fields.region}
                          component={Select}
                        />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-6">
                        <Field
                          props={props}
                          field={fields.workLocation}
                          component={Select}
                        />

                        <Field
                          props={props}
                          field={fields.homeLocation}
                          component={TextInput}
                        />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-6">
                        <Field
                          props={props}
                          field={fields.remoteOnly}
                          component={Select}
                        />

                        <Field
                          props={props}
                          field={fields.willingToTravel}
                          component={Select}
                        />
                      </div>
                      <Divider />
                      <SectionHeader section={sections.contact.header} />
                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Field
                          props={props}
                          field={fields.primaryPhone}
                          component={TextInput}
                        />
                        <Field
                          props={props}
                          field={fields.secondaryPhone}
                          component={TextInput}
                        />
                        <Field
                          props={props}
                          field={fields.email}
                          component={TextInput}
                        />
                      </div>
                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Field
                          props={props}
                          field={fields.mailingAddress}
                          component={TextInput}
                        />
                        <Field
                          props={props}
                          field={fields.city}
                          component={TextInput}
                        />
                        <Field
                          props={props}
                          field={fields.postalCode}
                          component={TextInput}
                        />
                      </div>

                      <Divider />
                      <SectionHeader section={sections.organization.header} />
                      <div className="w-full grid grid-cols-1">
                        <Field
                          props={props}
                          field={fields.supervisor}
                          component={TextInput}
                        />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-6">
                        <Field
                          props={props}
                          field={fields.ministry}
                          component={Select}
                        />
                        <Field
                          props={props}
                          field={fields.classification}
                          component={Select}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full border border-t-1 mx-0 px-0 shadow-lg mt-16"></div>

                  <div className="flex flex-row space-x-6 py-4 justify-end px-8">
                    <Button
                      variant={ButtonTypes.SECONDARY}
                      type="button"
                      onClick={handleOpenEditPopUp}
                      text="Cancel"
                    />

                    <Button
                      variant={ButtonTypes.TERTIARY}
                      text="Update"
                      type="submit"
                      disabled={isSubmitting ?? Object.values(errors).length > 0}
                    />
                  </div>
                  <div className="w-full flex flex-row justify-end">
                    {Object.values(errors).length > 0 && (
                      <div className="text-error font-bold">
                        Please resolve errors:{' '}
                        {Object.values(errors).map((itm: any) => (
                          <div key={itm}>{itm}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
            {/* </DialogBody> */}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
