import { type ChangeEvent, type MouseEvent } from 'react';

import type { FormikValues } from 'formik';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';

import { Form, formConfig } from '@/components';

import type { Personnel } from '@/common';
import type { Program } from '@/common';
import type { FieldType } from './types';

export const ProfileEditForm = ({
  handleClose,
  personnel,
  updatePersonnel,
  program,
}: {
  open: boolean;
  handleClose: (e: MouseEvent<HTMLElement>) => void;
  personnel: Personnel;
  updatePersonnel: (personnel: FormikValues) => Promise<void>;
  program?: Program;
}) => {
  const { locations } = useProgramFieldData(program);

  const handleSubmit = async (values: FormikValues, ...props: any) => {
    values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.workPhone = values?.workPhone?.replace(/[(]|-|[)]|\s/gi, '');

    if (values.resetChips === 'true') {
      values.chipsProfileMissing = false;
    }

    if (values?.secondaryPhone) {
      values.secondaryPhone = values?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (values?.emergencyContactPhoneNumber) {
      values.emergencyContactPhoneNumber =
        values?.emergencyContactPhoneNumber.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (values?.bcws?.liaisonPhoneNumber) {
      values.bcws.liaisonPhoneNumber = values?.bcws.liaisonPhoneNumber?.replace(
        /[^\d]/g,
        '',
      );
    }
    if (values?.liaisonPhoneNumber) {
      values.liaisonPhoneNumber = values?.liaisonPhoneNumber?.replace(/[^\d]/g, '');
    }

    if (values.supervisorPhone) {
      values.supervisorPhone = values?.supervisorPhone?.replace(/[^\d]/g, '');
    }

    delete values.dateApplied;
    delete values.dateApproved;

    if (values?.icsTraining === 'true') {
      values.icsTraining = true;
    }
    updatePersonnel(values);
    handleClose(props.event as MouseEvent<HTMLElement>);
  };

  const fieldChangeHandler = (
    e: ChangeEvent<any>,
    field: FieldType,
    values: Partial<Personnel>,
    setValues: (values: Partial<Personnel>) => void,
  ) => {
    if (
      field.name === 'homeLocation.locationName' ||
      field.name === 'workLocation.locationName'
    ) {
      const location = locations.find((itm) => itm.locationName === e.target.value);
      const fieldName = field.name.split('.')[0];
      location &&
        setValues({
          ...values,
          [fieldName]: {
            id: location?.id,
            fireCentre: location?.fireCentre,
            locationName: location?.locationName,
            region: location?.region,
          },
        });
    }
  };

  const { initialValues, validationSchema, sections } = formConfig(
    personnel,
    locations,
    program,
  );

  return (
    <Form
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      sections={sections}
      fieldChangeHandler={fieldChangeHandler}
      handleClose={handleClose}
    />
  );
};
