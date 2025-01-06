import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class CronTestService {
  constructor(
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    @Inject(MailService) private readonly mailService: MailService,
    private readonly logger: AppLogger,

    private readonly schedulerRegistry: SchedulerRegistry,
    
  ) {
    this.logger.setContext(CronTestService.name);
  }
  /**
   * Schedules a test cron job to run every 5 minutes.
   * @param {string} testEmail - The email address to send test emails to.
   * @returns {Promise<void>}
   */

  async scheduleTestCron(testEmail: string): Promise<void> {
    let week = 0;

    const job = new CronJob('* * * * *', async () => {
      this.logger.warn(`Time for job ${week} to run!`);
      if (week === 0) {
        this.logger.log('2nd Monday in Jan - initializing recommitment cycle');

        await this.recommitmentService.handleStartRecommitment();

        const { memberTemplate, supervisorTemplate } =
          await this.recommitmentService.generateBulkAnnualTemplates();

        memberTemplate.contexts = memberTemplate.contexts.filter((context) =>
          context.to.includes(testEmail),
        );
        supervisorTemplate.contexts = supervisorTemplate.contexts.filter(
          (context) => context.to.includes(testEmail),
        );

        await this.mailService.sendMail(memberTemplate);
        await this.mailService.sendMail(supervisorTemplate);
        week++;
        return;
      }

      if (week === 1) {
        this.logger.log('3rd Monday in Jan - sending reminder emails!');
        await this.triggerReminderEmailsTest(testEmail);
        week++;
        return;
      }
      if (week === 2) {
        this.logger.log('2nd Monday in Feb - sending reminder emails!');
        await this.triggerReminderEmailsTest(testEmail);
        week++;
        return;
      }
      if (week === 3) {
        this.logger.log('3rd Monday in Feb - sending reminder emails!');
        await this.triggerReminderEmailsTest(testEmail);
        week++;
        return;
      }
      if (week === 4) {
        this.logger.log(
          '3rd Friday in Feb - End Recommitment - Sending Final Emails!',
        );

        const finalEmail =
          await this.recommitmentService.handleEndRecommitment();
          this.logger.log("Generated final no-response emails for:");

          finalEmail.contexts.forEach((context) => this.logger.log(context.to));  

        finalEmail.contexts = [
          finalEmail.contexts.find((context) => context.to.includes(testEmail)),
        ];
        
        await this.mailService.sendMail(finalEmail);

        this.cancelTestCron();
      }
    });
    this.schedulerRegistry.addCronJob('testCron', job);
    this.logger.warn(`Test Cron scheduled to run every minute!`);
    job.start();
  }

  async triggerReminderEmailsTest(testEmail: string): Promise<void> {
    const {
      pendingMembersTemplate,
      committedMembersTemplateEmcr,
      committedMembersTemplateBcws,
    } = await this.recommitmentService.generateBulkReminderEmails();
    
    this.logger.log("Generated emails for pending members:");
    pendingMembersTemplate.contexts.forEach((template) => this.logger.log(template.to));

    this.logger.log("Generated emails for committed BCWS members:");
    committedMembersTemplateBcws.contexts.forEach((template) => this.logger.log(template.to));

    this.logger.log("Generated emails for committed EMCR members:");
    committedMembersTemplateEmcr.contexts.forEach((template) => this.logger.log(template.to));

    if (process.env.MODE !== 'production' && testEmail) {
      pendingMembersTemplate.contexts = pendingMembersTemplate.contexts.filter(
        (context) => context.to.includes(testEmail),
      );
      committedMembersTemplateEmcr.contexts =
        committedMembersTemplateEmcr.contexts.filter((context) =>
          context.to.includes(testEmail),
        );
      committedMembersTemplateBcws.contexts =
        committedMembersTemplateBcws.contexts.filter((context) =>
          context.to.includes(testEmail),
        );

      await this.mailService.sendMail(pendingMembersTemplate);
      await this.mailService.sendMail(committedMembersTemplateEmcr);
      await this.mailService.sendMail(committedMembersTemplateBcws);
    }
  }

  /**
   * Cancels the test cron job.
   */
  cancelTestCron(): void {
    this.schedulerRegistry.deleteCronJob('testCron');
    this.logger.warn(`Job testCron deleted!`);
  }
}
