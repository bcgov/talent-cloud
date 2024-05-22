import { Ministry, Status } from '@/common';
import { Personnel } from '@/pages/dashboard';
import { FormikState, FormikProps } from 'formik';
import { Route } from '@/providers';
import { ChangeEvent } from 'react';

export type FieldType = {

  name: string;
  label: string;
  type: string;
  required: boolean;
  disabled: boolean;
  autoComplete?: string;
  options?: { label: string; value: string|boolean|number }[];
  program?: Route;
  status?: Status;

};

export type SectionProps = {
  route?: Route,
  status: Status,
  ministry: Ministry,
  props: any,
  errors: any,
  isSubmitting: boolean

}

export type SectionFieldType = {
  props: any,
  errors: any,
  field: FieldType,

  options?: { label: string, value: string | number | boolean }[],
  onChange: (
    e: ChangeEvent<HTMLSelectElement>,
    props: FormikState<Personnel> & FormikProps<Personnel>,
  ) => void
}
