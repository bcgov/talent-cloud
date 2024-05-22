import { type ChangeEvent, type MouseEvent } from 'react';
import type {  Personnel } from '../../dashboard';
import { ButtonTypes } from '@/common';
import { BCWSProfileValidationSchema, EMCRProfileValidationSchema, EditProfileValidationSchema, BCWSPendingValidationSchema  } from './constants';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { Button } from '@/components';
import { datePST } from '@/utils';
import { Route } from '@/providers';
import {  Status } from '@/common';
import { Sections } from './ProfileEditSections';

export const ProfileEditForm = ({
  handleOpenEditProfilePopUp,
  personnel,
  updatePersonnel,
  route
}: {
  open: boolean;
  handleOpenEditProfilePopUp: (e: MouseEvent<HTMLElement>) => void;
  personnel: Personnel;
  updatePersonnel: (personnel: FormikValues) => Promise<void>;
  route?: Route
}) => {



  const initialValues: Personnel = {
    ...personnel,
    dateApplied: datePST(personnel.dateApplied as Date, true),
    primaryPhone:
      personnel?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    secondaryPhone:
      personnel.secondaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    workPhone:
      personnel.workPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
  };

  delete initialValues?.availability;
  delete initialValues?.experiences;
  delete initialValues?.certifications;
  delete initialValues?.roles;
  delete initialValues?.languages;
  delete initialValues?.tools;


  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => {
    // trim all the formatted characters out of the phone numbers
    values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.secondaryPhone = values?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.workPhone = values?.workPhone?.replace(/[(]|-|[)]|\s/gi, '');

    // only send the fields that have been changed
    Object.keys(personnel).forEach((key) => {
      if (values[key as keyof Personnel] === personnel[key as keyof Personnel]) {
        delete values[key as keyof Personnel];
      }
    });

    // disabled field
    delete values.dateApplied;
    delete values.dateApproved;
    // TODO success toast?
    helpers.setSubmitting(false);
    await updatePersonnel(values);

    handleOpenEditProfilePopUp(props.event);
  };

  const validationSchema = () => {
    switch ([route, personnel.status === Status.PENDING]) {
      case [Route.BCWS, true]:
        return { ...EditProfileValidationSchema, ...BCWSPendingValidationSchema }
      case [Route.BCWS, false]:
        return { ...EditProfileValidationSchema, ...BCWSProfileValidationSchema }
      case [Route.EMCR, true]:
        return { ...EMCRProfileValidationSchema, ...EMCRProfileValidationSchema }
      case [Route.EMCR, false]:
        return EMCRProfileValidationSchema
      default:
        return EditProfileValidationSchema
    }
  }


  return (
    <Formik
      validationSchema={validationSchema()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        errors,
        ...props
      }: FormikState<Personnel> & FormikProps<Personnel> & FormikProps<Personnel>) => (
        <Form>
          <div className="flex min-h-full px-8 pt-8 items-center justify-center">
            <Sections
              props={props}
              errors={errors}
              isSubmitting={isSubmitting}
              route={route}
              ministry={personnel.ministry}
              status={personnel.status} />
          </div>
          <div className="w-full border border-t-1 mx-0 px-0 shadow-lg mt-16"></div>

          <div className="flex flex-row space-x-6 py-4 justify-end px-8">
            <Button
              variant={ButtonTypes.PRIMARY}
              type="button"
              onClick={handleOpenEditProfilePopUp}
              text="Cancel"
            />

            <Button
              variant={ButtonTypes.TERTIARY}
              text="Save"
              type="submit"
              disabled={isSubmitting || !props.isValid}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};





