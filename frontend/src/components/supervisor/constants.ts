import { SupervisorReason } from '@/common/enums/supervisor-decision.enum';

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
