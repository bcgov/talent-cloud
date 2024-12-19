import { Injectable } from '@nestjs/common';
import axios, { AxiosBasicCredentials, AxiosInstance } from 'axios';
import { MailDto } from './mail.dto';
import { EmailTemplates, renderTemplate } from './utils';
import { Program } from '../auth/interface';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';

@Injectable()
export class MailService {
  private mailApi: AxiosInstance;
  private mailAuthApi: AxiosInstance;
  constructor() {
    this.mailApi = axios.create({
      baseURL: process.env.CHESS_API,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.mailAuthApi = axios.create({
      baseURL: process.env.CHESS_AUTH_API,
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
      console.log(e);
    }
  }
  /**
   * Get token for mail service
   * @returns
   */
  async getToken() {
    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    try {
      const clientId = process.env.CHESS_CLIENT_ID;
      const clientSecret = process.env.CHESS_CLIENT_SECRET;

      const encodedAuth: AxiosBasicCredentials = {
        username: clientId,
        password: clientSecret,
      };

      const response = await this.mailAuthApi.post(
        `/auth/realms/comsvcauth/protocol/openid-connect/token`,
        { grant_type: 'client_credentials' },
        { auth: encodedAuth },
      );

      return response?.data?.access_token;
    } catch (e) {
      console.log(e);
    }
  }

  async generateAndSendTemplate(
    template: EmailTemplates,
    personnel: PersonnelEntity[],
    program?: Program,
  ) {
    return await this.sendMail(renderTemplate(template, personnel, program));
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
      const res = await this.mailApi.post('/emailMerge', body);
      return res.data;
    } catch (e) {
      console.log('ERROR');
      console.log(e.response.data);
    }
  }
}
