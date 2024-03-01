import type { MouseEvent } from 'react';
import { Dialog } from '@headlessui/react';
import type { Personnel } from '../dashboard';
import { ButtonTypes } from '@/common';
import { EditProfileValidationSchema, fields, sections } from './constants';
import { Divider } from '@/components/ui/Divider';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { Button, SectionHeader, Select, TextInput } from '@/components';

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
  const initialValues: Personnel = {
    ...personnel,
    primaryPhone:
      personnel?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    secondaryPhone: personnel.secondaryPhone
      ? personnel.secondaryPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      : '',
  };

  delete initialValues?.availability;
  delete initialValues?.experiences;

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => {
    // trim all the formatted characters out of the phone numbers
    values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.secondaryPhone = values?.secondaryPhone.replace(/[(]|-|[)]|\s/gi, '');

    // only send the fields that have been changed
    Object.keys(personnel).forEach((key) => {
      if (values[key as keyof Personnel] === personnel[key as keyof Personnel]) {
        delete values[key as keyof Personnel];
      }
    });
    if (values.remoteOnly === 'true') {
      values.remoteOnly = true;
    }
    if (values.remoteOnly === 'false') {
      values.remoteOnly = false;
    }

    if (values.willingToTravel === 'true') {
      values.willingToTravel = true;
    }
    if (values.willingToTravel === 'false') {
      values.willingToTravel = false;
    }

    // TODO success toast?
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
                ...props
              }: FormikState<Personnel> & FormikProps<Personnel>) => (
                <Form>
                  <div className="flex min-h-full px-8 items-center justify-center">
                    <div className="flex flex-col w-full items-start justify-start space-y-8">
                      <SectionHeader section={sections.general.header} />
                      <div className="w-1/3">
                        <TextInput {...props} {...fields.dateJoined} />
                      </div>

                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TextInput {...props} {...fields.firstName} />

                        <TextInput {...props} {...fields.middleName} />
                        <TextInput {...props} {...fields.lastName} />
                      </div>

                      <div className="w-full grid grid-cols-1 gap-6">
                        <Select {...props} {...fields.region} />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-6">
                        <Select {...props} {...fields.workLocation} />

                        <TextInput {...props} {...fields.homeLocation} />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-6">
                        <Select {...props} {...fields.remoteOnly} />

                        <Select {...props} {...fields.willingToTravel} />
                      </div>
                      <Divider />
                      <SectionHeader section={sections.contact.header} />
                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TextInput {...props} {...fields.primaryPhone} />
                        <TextInput {...props} {...fields.secondaryPhone} />
                        <TextInput {...props} {...fields.email} />
                      </div>
                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TextInput {...props} {...fields.mailingAddress} />
                        <TextInput {...props} {...fields.city} />
                        <TextInput {...props} {...fields.postalCode} />
                      </div>

                      <Divider />
                      <SectionHeader section={sections.organization.header} />
                      <div className="w-full grid grid-cols-1">
                        <TextInput {...props} {...fields.supervisor} />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-6">
                        <TextInput {...props} {...fields.ministry} />
                        <Select {...props} {...fields.classification} />
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
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
