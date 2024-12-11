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
    label: 'Year',
    type: 'text',
    disabled: true,
  },
  program: {
    name: 'program',
    label: 'Program',
    type: 'text',
    disabled: true,
  },
  reason: {
    name: 'reason',
    label: 'Please indicate your reason for declining this member',
    type: 'select',
    required: true,
    options: [
      { label: 'Select...', value: '' },
      { label: SupervisorReason.CONFLICT, value: SupervisorReason.CONFLICT },
      { label: SupervisorReason.NEGATIVE, value: SupervisorReason.NEGATIVE },
      { label: SupervisorReason.PERFORMANCE, value: SupervisorReason.PERFORMANCE },
      { label: SupervisorReason.OTHER, value: SupervisorReason.OTHER },
    ],
    span: 'col-span-2',
  },
};
