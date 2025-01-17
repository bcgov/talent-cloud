import { SupervisorReason } from '@/common/enums/supervisor-decision.enum';
import * as Yup from 'yup';

export const supervisorDeclinedValidation = Yup.object().shape({
  memberName: Yup.string().required('Please provide the member name'),
  memberID: Yup.string().required('Please provide the member ID'),
  year: Yup.string().required('Please provide the recommitment year'),
  program: Yup.string().required('Please provide the program'),
  reason: Yup.string().required('Please select a reason for declining this member'),
  comments: Yup.string().when('reason', {
    is: (val: SupervisorReason) => val === SupervisorReason.OTHER.toString(),
    then: () =>
      Yup.string()
        .required('Please provide additional comments')
        .max(100, 'Comments must be less than 100 characters')
        .min(10, 'Comments must be at least 10 characters'),
    otherwise: () => Yup.string().notRequired(),
  }),
});

export const declineFormFields = {
  name: {
    name: 'memberName',
    label: 'Member Name',
    type: 'text',
    disabled: true,
  },
  memberId: {
    name: 'memberID',
    label: 'Member ID',
    type: 'text',
    disabled: true,
  },
  year: {
    name: 'year',
    label: 'Recommitment Year',
    type: 'text',
    disabled: true,
  },
  program: {
    name: 'program',
    label: 'Program Declining',
    type: 'text',
    disabled: true,
  },
  reason: {
    name: 'reason',
    label: 'Please indicate your reason for declining this member',
    type: 'select',
    required: true,
    options: [
      { label: 'Select an option', value: '' },
      { label: SupervisorReason.CONFLICT, value: SupervisorReason.CONFLICT },
      { label: SupervisorReason.OTHER, value: SupervisorReason.OTHER },
    ],
    span: 'col-span-2',
  },
};
