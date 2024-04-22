import { type ChangeEvent, type MouseEvent } from 'react';
import type { Personnel } from '../dashboard';
import { ButtonTypes } from '@/common';
import { EditProfileValidationSchema, fields, sections } from './constants';
import { Divider } from '@/components/ui/Divider';
import type { FormikHelpers, FormikProps, FormikState, FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { Button, SectionHeader, Select, TextInput } from '@/components';
import { useGetFilters } from '@/hooks/useGetFilters';
import { datePST } from '@/utils';

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
    applicationDate: datePST(personnel.applicationDate as Date, true),
    primaryPhone:
      personnel?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    secondaryPhone:
      personnel.secondaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
    workPhone:
      personnel.workPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ?? '',
  };

  delete initialValues?.availability;
  delete initialValues?.experiences;

  const handleChangeLocation = (
    e: ChangeEvent<HTMLSelectElement>,
    props: FormikState<Personnel> & FormikProps<Personnel>,
  ) => {
    const fieldName = e.target.name.split('.')[0];
    if (!e.target.value) {
      props.setValues({
        ...props.values,
        [fieldName]: {
          id: undefined,
          locationName: '',
          region: '',
        },
      });
    } else {
      const location = locations.find((itm) => itm.locationName === e.target.value);

      props.setValues({
        ...props.values,
        [fieldName]: {
          id: location?.id,
          locationName: location?.locationName,
          region: location?.region,
        },
      });
    }
  };

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
    // trim all the formatted characters out of the phone numbers
    values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.secondaryPhone = values?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.workPhone = values?.workPhone?.replace(/[(]|-|[)]|\s/gi, '');

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

    if (values.icsTraining === 'true') {
      values.icsTraining = true;
    }
    if (values.icsTraining === 'false') {
      values.icsTraining = false;
    }

    if (values.approvedBySupervisor === 'true') {
      values.approvedBySupervisor = true;
    }
    if (values.approvedBySupervisor === 'false') {
      values.approvedBySupervisor = false;
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
              <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-6">
                <TextInput
                  {...props}
                  {...fields.applicationDate}
                  error={errors.applicationDate}
                />
                <Select
                  {...props}
                  {...fields.icsTraining}
                  error={errors.icsTraining}
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-6">
                <TextInput
                  {...props}
                  {...fields.firstName}
                  error={errors.firstName}
                />
                <TextInput {...props} {...fields.lastName} error={errors.lastName} />
              </div>

              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Select
                  {...props}
                  {...fields.workLocation.locationName}
                  error={errors.workLocation}
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
                  error={errors.workLocation}
                  disabled={true}
                  options={regions.map((itm) => ({
                    label: itm,
                    value: itm,
                  }))}
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-1">
                  <TextInput
                    {...props}
                    {...fields.workPhone}
                    error={errors.workPhone}
                  />
                </div>
                <div className="col-span-1  lg:col-span-2">
                  <TextInput {...props} {...fields.email} error={errors.email} />
                </div>
              </div>
              <Divider />
              <SectionHeader section={sections.organization.header} />
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Select {...props} {...fields.ministry} error={errors.ministry} />
                <Select
                  {...props}
                  {...fields.unionMembership}
                  error={errors.unionMembership}
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TextInput
                  {...props}
                  {...fields.supervisorFirstName}
                  error={errors.supervisorFirstName}
                />
                <TextInput
                  {...props}
                  {...fields.supervisorLastName}
                  error={errors.supervisorLastName}
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TextInput
                  {...props}
                  {...fields.supervisorEmail}
                  error={errors?.supervisorEmail}
                />
                <Select
                  {...props}
                  {...fields.approvedBySupervisor}
                  error={errors.approvedBySupervisor}
                />
              </div>
            </div>
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
