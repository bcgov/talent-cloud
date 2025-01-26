import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosBasicCredentials, AxiosInstance } from 'axios';
import { format } from 'date-fns';
import * as nunjucks from 'nunjucks';
import { Repository } from 'typeorm';
import {
  EmailSubjects,
  EmailTags,
  EmailTemplates,
  envs,
  TemplateType,
} from './constants';
import { MailDto } from './mail.dto';
import { MailRO } from './mail.ro';
import { Program } from '../auth/interface';
import { MailBatchEntity } from '../database/entities/mail-batch.entity';
import { MailEntity } from '../database/entities/mail.entity';
import { AppLogger } from '../logger/logger.service';
import { RecommitmentRO } from '../personnel/ro/recommitment.ro';

@Injectable()
export class MailService {
  private mailApi: AxiosInstance;
  private mailAuthApi: AxiosInstance;
  constructor(
    private readonly logger: AppLogger,
    @InjectRepository(MailEntity)
    private mailRepository: Repository<MailEntity>,
    @InjectRepository(MailBatchEntity)
    private mailBatchRepository: Repository<MailBatchEntity>,
  ) {
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

  /**
   * Get the status of sent emails
   * @returns
   */
  async checkMailStatus() {
    const token = await this.getToken();

    const incompleteMail = await this.mailRepository.find({
      where: { completed: false },
      relations: ['tx'],
    });

    const txIds = Array.from(new Set(incompleteMail.map((itm) => itm.txId)));

    this.mailApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    for await (const txId of txIds) {
      const response = await this.mailApi.get(`/status?txId=${txId}`);

      for await (const itm of response.data) {
        if (itm.status === 'completed') {
          await this.mailRepository.update(
            { txId, msgId: itm.msgId },
            { completed: true },
          );
        }
      }
    }
    return await this.mailRepository.find({ where: { completed: false } });
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
    ministry = 'ALL',
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
        tag: `${tag}_${ministry}_${process.env.ENV}`,
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

  async sendMail(mail: MailDto, templateType?: EmailTags): Promise<MailRO> {
    if (mail.contexts.length === 0) {
      this.logger.log('No emails to send');
      return;
    }
    const token = await this.getToken();
    this.mailApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const isValid = (email: string) => {
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
      if (!isValidEmail) {
        this.logger.error(`Invalid email address: ${email}`);
      }
      return isValidEmail;
    };

    const mailContext = mail.contexts.filter((itm) => !itm.to.includes(null));

    mail.contexts = mailContext.filter((itm) => isValid(itm.to[0]));

    const invalidEmails = mailContext.filter((itm) => !isValid(itm.to[0]));

    if (mail.contexts.length === 0) {
      this.logger.log('No valid emails to send');
      return;
    }

    try {
      const res = await this.mailApi.post('/emailMerge', mail);
      this.logger.log(res.data);

      await this.mailBatchRepository.save(
        this.mailBatchRepository.create({
          txId: res.data.txId,
          tag: mail.contexts[0].tag,
          template: templateType,
        }),
      );

      const mails = res.data.messages.map((msg) => {
        return this.mailRepository.create({
          ...msg,
        });
      });

      const invalidMail = invalidEmails.map((itm) => {
        return this.mailRepository.create({
          email: itm.to[0],
          msgId: `${res.data.txId}_invalid`,
          sent: false,
          txId: res.data.txId,
        });
      });

      await this.mailRepository.save({ ...mails, ...invalidMail });

      return res.data;
    } catch (e) {
      e?.response?.data?.errors?.map((itm) => this.logger.log(itm));
      this.logger.error(e?.message);
      this.logger.error(e?.status);
      throw new Error(e);
    }
  }
}
