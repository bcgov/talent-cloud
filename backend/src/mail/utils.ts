import * as nunjucks from 'nunjucks';
import { MailDto } from './mail.dto';
import { Program } from '../auth/interface';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';

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

const renderMemberDeclinedTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_DECLINED, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    year: '{{year}}',
    link: '{{link}}',
  });
};

const renderMemberDeniedTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_DENIED, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};

const renderMemberApprovedTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_APPROVED, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};

const renderMemberFollowUpTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_FOLLOW_UP, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};

const renderMemberNoResponseTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_NO_RESPONSE, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};

const renderMemberAnnualRecommitmentTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_ANNUAL, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};
const renderMemberReactivateRecommitmentTemplate = () => {
  return nunjucks.render(EmailTemplates.MEMBER_REACTIVATE, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};

const renderSupervisorAnnualRecommitmentTemplate = () => {
  return nunjucks.render(EmailTemplates.SUPERVISOR_ANNUAL, {
    program: '{{program}}',
    member: '{{member}}',
    year: '{{year}}',
  });
};
const renderSupervisorRequestRecommitmentTemplate = () => {
  return nunjucks.render(EmailTemplates.SUPERVISOR_REQUEST, {
    year: '{{year}}',
    emcr_contact: '{{emcr_contact}}',
    bcws_contact: '{{bcws_contact}}',
    member: '{{member}}',
    program: '{{program}}',
    link: '{{link}}',
  });
};
const renderSupervisorFollowUpTemplate = () => {
  return nunjucks.render(EmailTemplates.SUPERVISOR_REMINDER, {
    program: '{{program}}',
    reason: '{{reason}}',
    date: '{{date}}',
    member: '{{member}}',
    link: '{{link}}',
  });
};

export const renderTemplate = (
  template: EmailTemplates,
  personnel: PersonnelEntity[],
  program?: Program,
) => {
  let baseUrl;
  if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://coreteam.gov.bc.ca';
  } else if (process.env.NODE_ENV === 'development') {
    baseUrl = 'https://tcloud-client-cd4869-dev.apps.gold.devops.gov.bc.ca';
  } else if (process.env.NODE_ENV === 'test') {
    baseUrl = 'https://tcloud-client-cd4869-test.apps.gold.devops.gov.bc.ca';
  } else {
    baseUrl = 'localhost:3000';
  }
  const memberUrl = `${baseUrl}/profile`;
  const supervisorUrl = `${baseUrl}/supervisor`;
  switch (template) {
    case EmailTemplates.MEMBER_DECLINED:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberDeclinedTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_declined_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            reason:
              program === Program.BCWS
                ? person?.recommitment.memberReasonBcws
                : person?.recommitment.memberReasonEmcr,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.MEMBER_DENIED:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberDeniedTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_denied_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            reason:
              program === Program.BCWS
                ? person?.recommitment.supervisorReasonBcws
                : person?.recommitment.supervisorReasonEmcr,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.MEMBER_APPROVED:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberApprovedTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_approved_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.MEMBER_FOLLOW_UP:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberFollowUpTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_follow_up${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.MEMBER_NO_RESPONSE:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberNoResponseTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_no_response_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.MEMBER_ANNUAL:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberAnnualRecommitmentTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_annual_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.MEMBER_REACTIVATE:
      return new MailDto({
        subject: 'Hello {{member}}',
        body: renderMemberReactivateRecommitmentTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.email],
          cc: [],
          bcc: [],
          tag: `member_reactivate_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.firstName} ${person.lastName}`,
            link: memberUrl,
          },
        })),
      });
    case EmailTemplates.SUPERVISOR_ANNUAL:
      return new MailDto({
        subject: 'Hello {{supervisor}}',
        body: renderSupervisorAnnualRecommitmentTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.supervisorEmail],
          cc: [],
          bcc: [],
          tag: `supervisor_annual_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.supervisorFirstName} ${person.supervisorLastName}`,
            supervisor: `${person.supervisorFirstName} ${person.supervisorLastName}`,
            link: supervisorUrl,
          },
        })),
      });
    case EmailTemplates.SUPERVISOR_REQUEST:
      return new MailDto({
        subject: 'Hello {{supervisor}}',
        body: renderSupervisorRequestRecommitmentTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.supervisorEmail],
          cc: [],
          bcc: [],
          tag: `supervisor_request_${person.id}`,
          delayTS: 0,
          context: {
            year: person.recommitment.recommitmentCycle.year,
            member: `${person.firstName} ${person.lastName}`,
            emcr_contact: 'fakeemail@gov.bc.ca',
            bcws_contact: 'fakeemail@gov.bc.ca',
            program: program,
            date: person.recommitment.recommitmentCycle.endDate,
            subject: `${person.supervisorFirstName} ${person.supervisorLastName}`,
            supervisor: `${person.supervisorFirstName} ${person.supervisorLastName}`,
            link: supervisorUrl,
          },
        })),
      });
    case EmailTemplates.SUPERVISOR_REMINDER:
    default:
      return new MailDto({
        subject: 'Hello {{supervisor}}',
        body: renderSupervisorFollowUpTemplate(),
        attachments: [],
        contexts: personnel.map((person) => ({
          to: [person.supervisorEmail],
          cc: [],
          bcc: [],
          tag: `supervisor_follow_up_${person.id}`,
          delayTS: 0,
          context: {
            program: program,
            year: person.recommitment.recommitmentCycle.year,
            date: person.recommitment.recommitmentCycle.endDate,
            member: `${person.firstName} ${person.lastName}`,
            subject: `${person.supervisorFirstName} ${person.supervisorLastName}`,
            supervisor: `${person.supervisorFirstName} ${person.supervisorLastName}`,
            link: supervisorUrl,
          },
        })),
      });
  }
};
