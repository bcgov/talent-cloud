import { type ChangeEvent, type MouseEvent } from 'react';

import type { FormikHelpers, FormikValues } from 'formik';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';

import { Form, memberFormConfig } from '@/components';

import type { Member } from '@/common';
import type { Program } from '@/common';
import type { FieldType } from './types';

export const MemberProfileEditForm = ({
  handleClose,
  member,
  updateMember,
  sectionKey,
  program,
}: {
  open: boolean;
  handleClose: (e: MouseEvent<HTMLElement>) => void;
  member: Member;
  updateMember: (member: FormikValues) => Promise<void>;
  sectionKey: string;
  program?: Program;
}) => {
  const { locations } = useProgramFieldData(program);

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<Member>,
    ...props: any
  ) => {
    // trim all the formatted characters out of the phone numbers
    if (values?.primaryPhone && values?.primaryPhone !== member.primaryPhone) {
      values.primaryPhone = values?.primaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (values?.workPhone && values?.workPhone !== member.workPhone) {
      values.workPhone = values?.workPhone?.replace(/[(]|-|[)]|\s/gi, '');
    }

    if (values?.secondaryPhone && values?.secondaryPhone !== member.secondaryPhone) {
      values.secondaryPhone = values?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (
      values?.emergencyContactPhoneNumber &&
      values?.emergencyContactPhoneNumber !== member.emergencyContactPhoneNumber
    ) {
      values.emergencyContactPhoneNumber =
        values?.emergencyContactPhoneNumber.replace(/[(]|-|[)]|\s/gi, '');
    }
    if (
      values?.bcws?.liaisonPhoneNumber &&
      values?.bcws?.liaisonPhoneNumber !== member.bcws?.liaisonPhoneNumber
    ) {
      values.bcws.liaisonPhoneNumber = values?.bcws.liaisonPhoneNumber?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      );
    }

    if (
      values?.supervisorPhone &&
      values?.supervisorPhone !== member.supervisorPhone
    ) {
      values.supervisorPhone = values?.supervisorPhone?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      );
    }

    delete values.dateApplied;
    delete values.dateApproved;
    delete values.employeeId; // Cannot be changed
    delete values.paylistId; // Cannot be changed    
    if (values?.icsTraining === 'true') {
      values.icsTraining = true;
    }

    updateMember(values);
    helpers.setSubmitting(false);
    handleClose(props.event as MouseEvent<HTMLElement>);
  };

  const fieldChangeHandler = (
    e: ChangeEvent<any>,
    field: FieldType,
    values: Member,
    setValues: (values: Member) => void,
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
    member,
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
