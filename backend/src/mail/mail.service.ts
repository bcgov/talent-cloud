import { Injectable } from '@nestjs/common';
import axios, { AxiosBasicCredentials, AxiosInstance } from 'axios';
import { format } from 'date-fns';
import * as nunjucks from 'nunjucks';
import {
  EmailSubjects,
  EmailTags,
  EmailTemplates,
  envs,
  TemplateType,
} from './constants';
import { MailDto } from './mail.dto';
import { Program } from '../auth/interface';
import { AppLogger } from '../logger/logger.service';
import { RecommitmentRO } from '../personnel/ro/recommitment.ro';

@Injectable()
export class MailService {
  private mailApi: AxiosInstance;
  private mailAuthApi: AxiosInstance;
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(MailService.name);
    this.mailApi = axios.create({
      baseURL: process.env.CHES_API,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.mailAuthApi = axios.create({
      baseURL: process.env.CHES_AUTH_API,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  // TODO - finish building this out
  async getUnsentMail(tag: string) {
    const token = await this.getToken();
    try {
      this.mailApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await this.mailApi.get(`/status?tag=${tag}`);
      return response.data;
    } catch (e) {
      this.logger.error(e);
    }
  }
  /**
   * Get token for mail service
   * @returns
   */
  async getToken() {
    this.logger.log('Getting token');
    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    try {
      const clientId = process.env.CHES_CLIENT_ID;
      const clientSecret = process.env.CHES_CLIENT_SECRET;

      const encodedAuth: AxiosBasicCredentials = {
        username: clientId,
        password: clientSecret,
      };

      const response = await this.mailAuthApi.post(
        `/auth/realms/comsvcauth/protocol/openid-connect/token`,
        { grant_type: 'client_credentials' },
        { auth: encodedAuth },
      );
      this.logger.log('Got token');

      return response?.data?.access_token;
    } catch (e) {
      this.logger.error(e);
    }
  }

  /**
   * Generate email template
   * @param template
   * @param templateType
   * @param records
   * @param endDate
   * @param program
   * @returns
   */
  generateTemplate(
    tag: EmailTags,
    templateType: TemplateType,
    records: RecommitmentRO[],
    endDate: Date,
    program?: Program,
  ) {
    return new MailDto({
      subject: EmailSubjects[tag],
      body: nunjucks.render(EmailTemplates[tag], {
        program: '{{program}}',
        year: '{{year}}',
        date: '{{date}}',
        member: '{{member}}',
        reason: '{{reason}}',

        emcr_contact: '{{emcr_contact}}',
        bcws_contact: '{{bcws_contact}}',
        supervisor: '{{supervisor}}',
        emcr: program === Program.EMCR,
        bcws: program === Program.BCWS,
        ...envs,
      }),
      attachments: [],
      contexts: records.map((record) => ({
        to: [
          templateType === TemplateType.MEMBER
            ? record.personnel?.email
            : record.personnel?.supervisorEmail,
        ],
        cc: [],
        bcc: [],
        tag: tag,
        delayTS: 0,
        context: {
          program:
            program === Program.ALL ? 'EMCR/BCWS' : program?.toUpperCase(),
          year: `${record.year}`,
          date: format(endDate, 'MMMM do, yyyy'),
          member: `${record.personnel?.firstName} ${record.personnel?.lastName}`,
          reason:
            tag === EmailTags.MEMBER_DECLINED
              ? `${record.memberReason}`
              : `${record.supervisorReason}`,
          supervisor: `${record.personnel?.supervisorFirstName} ${record.personnel?.supervisorLastName}`,
          emcr_contact: 'EMCR.CORETEAM@gov.bc.ca',
          bcws_contact: 'BCWS.CORETEAM@gov.bc.ca',
          emcr: program === Program.EMCR,
          bcws: program === Program.BCWS,
          ...envs,
        },
      })),
    });
  }

  /**
   * Send email, passing in the email data with body template and values
   * @param mail MailDto
   * @returns
   */

  async sendMail(mail: MailDto) {
    const token = await this.getToken();
    this.mailApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (mail.contexts.length === 0) {
      this.logger.log('No emails to send');
      return { data: 'No emails to  send' };
    }
    const mailContext = mail.contexts.filter((itm) => !itm.to.includes(null));
    mail.contexts = mailContext;

    try {
      const { data } = await this.mailApi.post('/emailMerge', mail);
      return data;
    } catch (e) {
      e.response.data?.errors?.map((itm) => this.logger.log(itm));
      this.logger.error(e.message);
      this.logger.error(e.status);
      throw new Error(e);
    }
  }
}
