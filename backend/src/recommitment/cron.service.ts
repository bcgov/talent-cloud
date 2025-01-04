import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getWeekOfMonth } from 'date-fns';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';
import { MailService } from '../mail/mail.service';

export const RecommitmentCron = {
  EVERY_MONDAY_OF_JAN: '0 0 * 1 1',
  EVERY_MONDAY_OF_FEB: '0 0 * 2 1',
  EVERY_FRIDAY_OF_FEB: '0 0 * 2 5',
};

@Injectable()
export class CronService {
  constructor(
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    @Inject(MailService) private readonly mailService: MailService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CronService.name);
  }

  @Cron(RecommitmentCron.EVERY_MONDAY_OF_JAN, {
    name: 'januaryMondayCron',
  })
  async januaryMondayCron() {
    const week = getWeekOfMonth(new Date());
    if (week === 2) {
      this.logger.log('2nd Monday in Jan - initializing recommitment cycle');

      await this.recommitmentService.handleStartRecommitment();

      const { memberTemplate, supervisorTemplate } =
        await this.recommitmentService.generateBulkAnnualTemplates();

      await this.mailService.sendMail(memberTemplate);
      await this.mailService.sendMail(supervisorTemplate);
    }

    if (week === 3) {
      this.logger.log('3rd Monday in Jan - sending reminder');
      await this.triggerReminderEmails();
    }
  }

  @Cron(RecommitmentCron.EVERY_MONDAY_OF_FEB, {
    name: 'februaryMondayCron',
  })
  async februaryMondayCron() {
    const week = getWeekOfMonth(new Date());

    if (week === 2) {
      await this.triggerReminderEmails();
    }

    if (week === 3) {
      this.logger.log('3rd Monday in Feb - sending reminder');
      await this.triggerReminderEmails();
    }
  }

  @Cron(RecommitmentCron.EVERY_FRIDAY_OF_FEB, {
    name: 'februaryFridayCron',
  })
  async februaryFridayCron() {
    const week = getWeekOfMonth(new Date());

    if (week === 3) {
      this.logger.log('3rd Friday in Feb - end recommitment cycle');

      const finalEmail = await this.recommitmentService.handleEndRecommitment();
      await this.mailService.sendMail(finalEmail);
    }
  }

  async triggerReminderEmails() {
    const {
      pendingMembersTemplate,
      committedMembersTemplateEmcr,
      committedMembersTemplateBcws,
    } = await this.recommitmentService.generateBulkReminderEmails();

    await this.mailService.sendMail(pendingMembersTemplate);
    await this.mailService.sendMail(committedMembersTemplateEmcr);
    await this.mailService.sendMail(committedMembersTemplateBcws);
  }
}
