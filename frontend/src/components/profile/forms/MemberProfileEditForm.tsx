import { type ChangeEvent, type MouseEvent } from 'react';

import type { FormikHelpers, FormikValues } from 'formik';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';

import { Form, memberFormConfig } from '@/components';

import type { Personnel } from '@/common';
import type { Program } from '@/common';
import type { FieldType } from './types';

export const MemberProfileEditForm = ({
  handleClose,
  personnel,
  updatePersonnel,
  sectionKey,
  program,
}: {
  open: boolean;
  handleClose: (e: MouseEvent<HTMLElement>) => void;
  personnel: Personnel;
  updatePersonnel: (personnel: FormikValues) => Promise<void>;
  sectionKey: string;
  program?: Program;
}) => {
  const { locations } = useProgramFieldData(program);

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<Personnel>,
    ...props: any
  ) => {
    // trim all the formatted characters out of the phone numbers
    values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    values.workPhone = values?.workPhone?.replace(/[(]|-|[)]|\s/gi, '');

    if (values?.secondaryPhone) {
      values.secondaryPhone = values?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (values?.emergencyContactPhoneNumber) {
      values.emergencyContactPhoneNumber =
        values?.emergencyContactPhoneNumber.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (values?.liaisonPhoneNumber) {
      values.liaisonPhoneNumber = values?.liaisonPhoneNumber?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      );
    }

    if (values.supervisorPhone) {
      values.supervisorPhone = values?.supervisorPhone?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      );
    }

    if (values.travelPreference) {
      if (values.bcws) {
        values.bcws = {
          travelPreference: values.travelPreference,
          ...values.bcws,
        };
      } else {
        values.bcws = {
          travelPreference: values.travelPreference,
        };
      }
      if (values.emcr) {
        values.emcr = {
          travelPreference: values.travelPreference,
          ...values.emcr,
        };
      } else {
        values.emcr = {
          travelPreference: values.travelPreference,
        };
      }
    }

    if (values.liaisonFirstName || values.liaisonLastName || values.liaisonEmail) {
      if (!values.bcws) {
        values.bcws = {};
      }
      
      if (values.liaisonFirstName) {
        values.bcws.liaisonFirstName = values.liaisonFirstName;
      }
      if (values.liaisonLastName) {
        values.bcws.liaisonLastName = values.liaisonLastName;
      }
      if (values.liaisonEmail) {
        values.bcws.liaisonEmail = values.liaisonEmail;
    }
  
      delete values.liaisonFirstName;
      delete values.liaisonLastName;
      delete values.liaisonEmail;
    }

    delete values.dateApplied;
    delete values.dateApproved;
    delete values.employeeId; // Cannot be changed
    delete values.paylistId; // Cannot be changed

    // only send the fields that have been changed
    Object.keys(personnel).forEach((key) => {
      if (values[key as keyof Personnel] === personnel[key as keyof Personnel]) {
        delete values[key as keyof Personnel];
      }
      if (values[key as keyof Personnel] === '') {
        values[key as keyof Personnel] = null;
      }
    });

    if (values?.icsTraining === 'true') {
      values.icsTraining = true;
    }

    updatePersonnel(values);
    helpers.setSubmitting(false);
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

  const { initialValues, validationSchema, sections } = memberFormConfig(
    personnel,
    locations,
  );

  return (
    <Form
      validationSchema={
        validationSchema[sectionKey as keyof typeof validationSchema]
      }
      initialValues={initialValues[sectionKey as keyof typeof initialValues]}
      onSubmit={handleSubmit}
      sections={sections[sectionKey as keyof typeof sections]}
      fieldChangeHandler={fieldChangeHandler}
      handleClose={handleClose}
      showHeaders={false}
    />
  );
};
