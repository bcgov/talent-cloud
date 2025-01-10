export enum TemplateType {
  MEMBER = 'member',
  SUPERVISOR = 'supervisor',
}

export enum EmailTags {
  MEMBER_DECLINED = 'MEMBER_DECLINED',
  MEMBER_DENIED_BY_SUPERVISOR = 'MEMBER_DENIED_BY_SUPERVISOR',
  MEMBER_APPROVED = 'MEMBER_APPROVED',
  MEMBER_FOLLOW_UP = 'MEMBER_FOLLOW_UP',
  MEMBER_NO_RESPONSE = 'MEMBER_NO_RESPONSE',
  MEMBER_ANNUAL = 'MEMBER_ANNUAL',
  MEMBER_REACTIVATE = 'MEMBER_REACTIVATE',
  MEMBER_SUPERVISOR_NO_RESPONSE = 'MEMBER_SUPERVISOR_NO_RESPONSE',
  SUPERVISOR_ANNUAL = 'SUPERVISOR_ANNUAL',
  SUPERVISOR_REQUEST = 'SUPERVISOR_REQUEST',
  SUPERVISOR_REMINDER = 'SUPERVISOR_REMINDER',
}

export enum EmailTemplates {
  MEMBER_DECLINED = 'member/member-declined.njk',
  MEMBER_DENIED_BY_SUPERVISOR = 'member/member-denied.njk',
  MEMBER_APPROVED = 'member/member-approved.njk',
  MEMBER_FOLLOW_UP = 'member/member-follow-up.njk',
  MEMBER_NO_RESPONSE = 'member/member-no-response.njk',
  MEMBER_ANNUAL = 'member/member-annual-reminder.njk',
  MEMBER_REACTIVATE = 'member/member-reactivate.njk',
  MEMBER_SUPERVISOR_NO_RESPONSE = 'member/member-supervisor-no-response.njk',
  SUPERVISOR_ANNUAL = 'supervisor/supervisor-annual-reminder.njk',
  SUPERVISOR_REQUEST = 'supervisor/supervisor-request.njk',
  SUPERVISOR_REMINDER = 'supervisor/supervisor-follow-up-reminder.njk',
}

export enum EmailSubjects {
  MEMBER_DECLINED = 'CORE Team: You have declined your {{year}} recommitment', 
  MEMBER_DENIED_BY_SUPERVISOR = 'Your CORE Recommitment Status for {{year}} has been updated',
  MEMBER_APPROVED = 'You CORE Recommitment for {{year}} has been approved by your supervisor',
  MEMBER_FOLLOW_UP = 'ACTION REQUIRED: Reminder to Update your CORE Recommitment status for {{year}}',
  MEMBER_NO_RESPONSE = 'CORE TEAM: Notice for Change in Member Status',
  MEMBER_ANNUAL = 'ACTION REQUIRED: Annual Recommitment Reminder for the {{year}} Core Program',
  MEMBER_REACTIVATE = 'ACTION REQUIRED: Update your CORE Recommitment status for {{year}}',
  MEMBER_SUPERVISOR_NO_RESPONSE = 'CORE TEAM: Notice for Member Status Change',
  SUPERVISOR_ANNUAL = 'CORE Team {{year}} Annual Recommitment Period Has Started',
  SUPERVISOR_REQUEST = 'ACTION REQUIRED: Supervisor Approval Needed for {{year}} CORE Member Recommitment',
  SUPERVISOR_REMINDER = 'ACTION REQUIRED: Supervisor Approval Still Needed for {{year}} CORE Member Recommitment',
}
export const envs = {
  dev: process.env.MODE === 'development',
  test: process.env.MODE === 'test',
  production: process.env.MODE === 'production',
  local: process.env.MODE === 'local',
};
