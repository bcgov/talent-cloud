export enum RecommitmentStatus {
  // set to pending on first day of recommitment period only if currently active in the particular program
  // prompts communication with member to recommit
  PENDING = 'PENDING',

  // temporary status set after member has committed to recommit
  // initiate communication for supervisor approval
  MEMBER_COMMITTED = 'MEMBER_COMMITTED',

  // 1 of 4 final status for member for a program
  // at end of recommitment period member will be set as INACTIVE in the particular program
  MEMBER_DENIED = 'MEMBER_DENIED',

  // 1 of 4 final status for member for a program
  // automatically set if no member response by end_date of recommitment period
  // member will be set as INACTIVE in the particular program
  MEMBER_NO_RESPONSE = 'MEMBER_NO_RESPONSE',

  // 1 of 4 final status for member for a program
  // at end of recommitment member will remain ACTIVE in the particular program
  SUPERVISOR_APPROVED = 'SUPERVISOR_APPROVED',

  // 1 of 4 final status for member for a program
  // at end of recommitment period member will be set as INACTIVE in the particular program
  SUPERVISOR_DENIED = 'SUPERVISOR_DENIED',

  // 1 of 4 final status for member for a program
  // automatically set if no supervisor response by end_date of recommitment period
  // member will be set as INACTIVE in the particular program
  SUPERVISOR_NO_RESPONSE = 'SUPERVISOR_NO_RESPONSE',
}

export enum RecommitmentStatusLabel {
  // set to pending on first day of recommitment period only if currently active in the particular program
  // prompts communication with member to recommit
  PENDING = 'Pending',

  // temporary status set after member has committed to recommit
  // initiate communication for supervisor approval
  MEMBER_COMMITTED = 'Approval Required',

  // 1 of 4 final status for member for a program
  // at end of recommitment period member will be set as INACTIVE in the particular program
  MEMBER_DENIED = 'Member Declined',

  // 1 of 4 final status for member for a program
  // automatically set if no member response by end_date of recommitment period
  // member will be set as INACTIVE in the particular program
  MEMBER_NO_RESPONSE = 'No Member Response',

  // 1 of 4 final status for member for a program
  // at end of recommitment member will remain ACTIVE in the particular program
  SUPERVISOR_APPROVED = 'Recommitted',

  // 1 of 4 final status for member for a program
  // at end of recommitment period member will be set as INACTIVE in the particular program
  SUPERVISOR_DENIED = 'Denied',

  // 1 of 4 final status for member for a program
  // automatically set if no supervisor response by end_date of recommitment period
  // member will be set as INACTIVE in the particular program
  SUPERVISOR_NO_RESPONSE = 'No Supervisor Response',
}

export enum RecommitmentStatusFilterLabel {
  ACTIVE = 'Active',
  ALL = 'All',
  INACTIVE = 'Inactive',
  MEMBER_COMMITTED = 'Recommitted',
  MEMBER_DENIED = 'Member Declined - Not Returning',
  MEMBER_NO_RESPONSE = 'Missed Recommitment',
  NEW = 'New',
  OTHER = 'Other',
  PENDING = 'Pending',
  SUPERVISOR_DENIED = 'Supervisor Declined - Not Returning',
}
