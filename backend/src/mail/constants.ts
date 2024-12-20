export enum TemplateType {
  MEMBER = 'member',
  SUPERVISOR = 'supervisor',
}

export enum EmailTemplates {
  MEMBER_DECLINED = 'member/member-declined.njk',
  MEMBER_DENIED = 'member/member-denied.njk',
  MEMBER_APPROVED = 'member/member-approved.njk',
  MEMBER_FOLLOW_UP = 'member/member-follow-up.njk',
  MEMBER_NO_RESPONSE = 'member/member-no-response.njk',
  MEMBER_ANNUAL = 'member/member-annual-reminder.njk',
  MEMBER_REACTIVATE = 'member/member-reactivate.njk',
  SUPERVISOR_ANNUAL = 'supervisor/supervisor-annual-reminder.njk',
  SUPERVISOR_REQUEST = 'supervisor/supervisor-request.njk',
  SUPERVISOR_REMINDER = 'supervisor/supervisor-follow-up-reminer.njk',
}
export const envs = {
  dev: process.env.MODE === 'development',
  test: process.env.MODE === 'test',
  production: process.env.MODE === 'production',
  local: process.env.MODE === 'local',
};
