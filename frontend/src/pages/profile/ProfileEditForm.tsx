import { type ChangeEvent, type MouseEvent } from 'react';
import type { Personnel } from '../dashboard';
import { ButtonTypes } from '@/common';
import { EditProfileValidationSchema, fields, sections } from './constants';
import { Divider } from '@/components/ui/Divider';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { Button, SectionHeader, Select, TextInput } from '@/components';
import { useGetFilters } from '@/hooks/useGetFilters';
import dayjs from 'dayjs';

export const ProfileEditForm = ({
  handleOpenEditProfilePopUp,
  personnel,
  updatePersonnel,
}: {
  open: boolean;
  handleOpenEditProfilePopUp: (e: MouseEvent<HTMLElement>) => void;
  personnel: Personnel;
  updatePersonnel: (personnel: FormikValues) => Promise<void>;
}) => {
  const { locations, regions } = useGetFilters();
  const initialValues: Personnel = {
    ...personnel,
    primaryPhone:
      personnel?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    secondaryPhone:
      personnel.secondaryPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    workPhone:
      personnel.workPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
  };

  delete initialValues?.availability;
  delete initialValues?.experiences;

  const handleChangeLocation = (
    e: ChangeEvent<HTMLSelectElement>,
    props: FormikState<Personnel> & FormikProps<Personnel>,
  ) => {
    const location = locations.find((itm) => itm.locationName === e.target.value);

    const fieldName = e.target.name.split('.')[0];

    props.setValues({
      ...props.values,
      [fieldName]: {
        id: location?.id,
        locationName: location?.locationName,
        region: location?.region,
      },
    });
  };

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => {
    // trim all the formatted characters out of the phone numbers
    values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.secondaryPhone = values?.secondaryPhone.replace(/[(]|-|[)]|\s/gi, '');
    values.workPhone = values?.workPhone.replace(/[(]|-|[)]|\s/gi, '');
    values.dateJoined = dayjs(values.dateJoined).format('MMMM D, YYYY');

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

    handleOpenEditProfilePopUp(props.event);
  };

  return (
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
          <div className="flex min-h-full px-8 pt-8 items-center justify-center">
            <div className="flex flex-col w-full items-start justify-start space-y-8">
              <SectionHeader section={sections.general.header} />
              <div className="w-1/3">
                <TextInput
                  {...props}
                  {...fields.dateJoined}
                  error={errors.dateJoined}
                />
              </div>

              <div className="w-full grid grid-cols-2  gap-6">
                <TextInput
                  {...props}
                  {...fields.firstName}
                  error={errors.firstName}
                />
                <TextInput {...props} {...fields.lastName} error={errors.lastName} />
              </div>

              <div className="w-full grid grid-cols-2 gap-6">
                <Select
                  {...props}
                  {...fields.workLocation.locationName}
                  error={errors.workLocation?.locationName}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeLocation(e, {
                      isSubmitting,
                      errors,
                      ...props,
                    })
                  }
                  options={locations.map((itm) => ({
                    label: itm.locationName,
                    value: itm.locationName,
                  }))}
                />
                <Select
                  {...props}
                  {...fields.workLocation.region}
                  error={errors.workLocation?.region}
                  disabled={true}
                  options={regions.map((itm) => ({
                    label: itm,
                    value: itm,
                  }))}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-6">
                <Select
                  {...props}
                  {...fields.homeLocation.locationName}
                  error={errors.homeLocation?.locationName}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeLocation(e, {
                      isSubmitting,
                      errors,
                      ...props,
                    })
                  }
                  options={locations.map((itm) => ({
                    label: itm.locationName,
                    value: itm.locationName,
                  }))}
                />
                <Select
                  {...props}
                  {...fields.homeLocation.region}
                  error={errors.homeLocation?.region}
                  disabled={true}
                  options={regions.map((itm) => ({
                    label: itm,
                    value: itm,
                  }))}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-6">
                <Select
                  {...props}
                  {...fields.remoteOnly}
                  error={errors.remoteOnly}
                />
                <Select
                  {...props}
                  {...fields.willingToTravel}
                  error={errors.willingToTravel}
                />
              </div>
              <Divider />
              <SectionHeader section={sections.contact.header} />
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TextInput
                  {...props}
                  {...fields.primaryPhone}
                  error={errors.primaryPhone}
                />
                <TextInput
                  {...props}
                  {...fields.secondaryPhone}
                  error={errors.secondaryPhone}
                />
                <TextInput {...props} {...fields.email} error={errors.email} />
              </div>

              <Divider />
              <SectionHeader section={sections.organization.header} />
              <div className="w-full grid grid-cols-2 gap-6">
                <TextInput
                  {...props}
                  {...fields.supervisor}
                  error={errors.supervisor}
                />
                <TextInput
                  {...props}
                  {...fields.workPhone}
                  error={errors.workPhone}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-6">
                <Select {...props} {...fields.ministry} error={errors.ministry} />
                <Select
                  {...props}
                  {...fields.unionMembership}
                  error={errors.unionMembership}
                />
              </div>
            </div>
          </div>
          <div className="w-full border border-t-1 mx-0 px-0 shadow-lg mt-16"></div>

          <div className="flex flex-row space-x-6 py-4 justify-end px-8">
            <Button
              variant={ButtonTypes.SECONDARY}
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
