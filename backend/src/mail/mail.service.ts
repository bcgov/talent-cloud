import { Injectable } from '@nestjs/common';
import axios, { AxiosBasicCredentials, AxiosInstance } from 'axios';
import { format } from 'date-fns';
import * as nunjucks from 'nunjucks';
import { EmailTemplates, envs, TemplateType } from './constants';
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
    template: EmailTemplates,
    templateType: TemplateType,
    records: RecommitmentRO[],
    endDate: Date,
    program?: Program,
  ) {
    return new MailDto({
      subject: '{{subject}}',
      body: nunjucks.render(template, {
        program: '{{program}}',
        reason: '{{reason}}',
        date: '{{date}}',
        member: '{{member}}',
        year: '{{year}}',
        emcr_contact: '{{emcr_contact}}',
        bcws_contact: '{{bcws_contact}}',
        supervisor: '{{supervisor}}',
        ...envs,
      }),
      attachments: [],
      contexts: records.map((record) => ({
        to: [
          templateType === TemplateType.MEMBER
            ? record.personnel?.email
            : record.personnel.supervisorEmail,
        ],
        cc: [],
        bcc: [],
        tag:
          templateType === TemplateType.MEMBER
            ? `${template}_${record.personnel?.id}`
            : `${template}_${record.personnel?.supervisorEmail}`,
        delayTS: 0,
        context: {
          program: program?.toUpperCase(),
          year: record.year,
          date: format(endDate, 'MMMM do, yyyy'),
          member: `${record.personnel.firstName} ${record.personnel.lastName}`,
          reason:
            template === EmailTemplates.MEMBER_DECLINED
              ? record.supervisorReason
              : record.memberReason,
          subject:
            templateType === TemplateType.SUPERVISOR
              ? `${record.personnel.supervisorFirstName} ${record.personnel.supervisorLastName}`
              : `${record.personnel.firstName} ${record.personnel.lastName}`,
          supervisor: `${record.personnel.supervisorFirstName} ${record.personnel.supervisorLastName}`,
          emcr_contact: 'EMCR.CORETEAM@gov.bc.ca',
          bcws_contact: 'BCWS.CORETEAM@gov.bc.ca',
          ...envs,
        },
      })),
    });
  }

  /**
   * Send email, passing in the email data with body template and values
   * @param body MailDto
   * @returns
   */

  async sendMail(body: MailDto) {
    const token = await this.getToken();

    this.mailApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      const { data } = await this.mailApi.post('/emailMerge', body);
      return data;
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error(e.status);
      throw new Error(e);
    }
  }
}
