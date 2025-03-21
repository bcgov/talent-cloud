export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  NEW = 'NEW',
}

export enum StatusNames {
  ACTIVE = 'Active',
  ALL = 'All',
  INACTIVE = 'Inactive',
  MEMBER_DECLINED = 'MemberDeclined',
  MISSED = 'Missed',
  NEW = 'New',
  OTHER = 'Other',
  PENDING = 'Pending',
  RECOMMITTED = 'Recommitted',
  SUPERVISOR_DECLINED = 'SupervisorDeclined',
}

export const StatusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  ALL: 'All',
  INACTIVE: 'Inactive',
  MEMBER_DECLINED: 'Member Declined - Not Returning',
  MISSED: 'Missed Deadline',
  NEW: 'New',
  OTHER: 'Other',
  PENDING: 'Pending',
  RECOMMITTED: 'Recommitted',
  SUPERVISOR_DECLINED: 'Supervisor Declined - Not Returning',
};
