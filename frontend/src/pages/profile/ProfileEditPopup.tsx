import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import type { Personnel } from '../dashboard';
import { ButtonTypes } from '@/common';
import { EditProfileValidationSchema, fields, sections } from './constants';
import { Divider } from '@/components/ui/Divider';
import type { FormikHelpers, FormikProps, FormikState } from 'formik';
import { Field, Form, Formik } from 'formik';
import { Button, SectionHeader, Select, TextInput } from '@/components';
import { AxiosPrivate } from '@/utils';
import { format } from 'date-fns';

export const ProfileEditPopup = ({
  open,
  handleOpenEditPopUp,
  personnel,
  updatePersonnel,
}: {
  open: boolean;
  handleOpenEditPopUp: () => void;
  personnel: Personnel;
  updatePersonnel: (personnel: Personnel) => void;
}) => {
  const initialValues: Personnel = { ...personnel };

  delete initialValues?.availability;
  delete initialValues?.experiences;
  const stringToBoolean = (value: string): boolean => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return false;
    }
  };
  const handleSubmit = async (
    values: Personnel,
    helpers: FormikHelpers<Personnel>,
  ) => {
    // only send the fields that have been changed
    values.remoteOnly = stringToBoolean(values.remoteOnly ? 'true' : 'false');
    values.willingToTravel = stringToBoolean(
      values.willingToTravel ? 'true' : 'false',
    );

    Object.keys(personnel).forEach((key) => {
      if (values[key as keyof Personnel] === personnel[key as keyof Personnel]) {
        delete values[key as keyof Personnel];
      }
    });

    try {
      const res = await AxiosPrivate.patch(
        encodeURI(`/personnel/${personnel.id}`),
        values,
      );
      updatePersonnel(res.data);
      helpers.setSubmitting(false);
      handleOpenEditPopUp();
    } catch (e) {
      console.log(e as Error);
    }
  };

  return (
    <Dialog open={open} handler={handleOpenEditPopUp} placeholder={undefined}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-gray-200/20 w-full" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-full overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex w-full min-h-full items-center justify-center">
          {/* The actual dialog panel  */}

          <DialogBody
            placeholder={undefined}
            className="mx-auto  rounded bg-white w-full md:w-2/3 lg:w-1/2"
          >
            <DialogHeader
              placeholder={undefined}
              className="bg-grayBackground flex flex-row w-full justify-between"
            >
              <span>Edit Member Details</span>
              <button
                className="text-sm text-primaryBlue underline font-normal"
                onClick={handleOpenEditPopUp}
              >
                Close
              </button>
            </DialogHeader>

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
                  <div className="flex min-h-full items-center justify-center p-4">
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

                      <div className="w-full grid grid-cols-3 gap-6">
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
                      <div className="w-full grid grid-cols-3 gap-6">
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
                      <div className="w-full grid grid-cols-3 gap-6">
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
                      <Divider />
                    </div>
                  </div>
                  <div className="w-full border border-t-1 mx-0 px-0 shadow-md mt-16"></div>
                  <DialogFooter placeholder={undefined}>
                    <div className="flex flex-row space-x-6 ">
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
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </DialogBody>
        </div>
      </div>
    </Dialog>
  );
};
