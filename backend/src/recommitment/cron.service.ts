import { Inject, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class CronService {
  constructor(
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    private readonly logger: AppLogger,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.setContext(CronService.name);
  }

  /**
   * Initial Job Scheduled for 6am on Jan 13th or otherwise specified
   */
  @Cron(process.env.START_DATE ?? '0 8 13 1 *', {
    name: 'initial_recommitment',
    timeZone: 'America/Vancouver',
  })
  async initialRecommitment() {
    this.logger.log(`Initial Recommitment Job started! for ${process.env.START_DATE ?? '0 6 13 1 *'}`);
    // Start Recommitment. If not in production, use test email and do not send emails to members
    // TODO set the start and end date dynamically
    process.env.ENV === 'production'
      ? await this.recommitmentService.handleStartRecommitment(false, null, '2025-01-13 08:00:00', '2025-02-14 17:00:00')
      : await this.recommitmentService.handleStartRecommitment(
          true,
          process.env.TEST_EMAIL,
        );

    // Job to send follow up reminder for members/supervisors during recommitment
    const recurringNotificationsJob = new CronJob(
      process.env.SCHEDULE ?? '0 8 * * 1',
      async () => {
        // Start Recommitment. If not in production, use test email and do not send emails to members
        process.env.ENV === 'production'
          ? await this.recommitmentService.handleSendAutomatedReminders()
          : await this.recommitmentService.handleSendAutomatedReminders(
              true,
              process.env.TEST_EMAIL,
            );
      },
    );
    
    // Schedule recurring notifications to run every monday at 8am or otherwise specified
    this.schedulerRegistry.addCronJob(
      'recommitment_follow_up_notifications',
      recurringNotificationsJob,
    );

    this.logger.warn(`Automated reminders scheduled to run every monday or otherwise`);
    recurringNotificationsJob.start();
  }
  /**
   * End Recommitment on Feb 14th or otherwise
   * Cancel daily recurring job
   */
  @Cron(process.env.END_DATE ?? '0 17 14 2 *', {
    name: 'initial_recommitment',
    timeZone: 'America/Vancouver',
  })
  async endRecommitment() {
    this.logger.log(`Recommitment Ended on ${process.env.END_DATE ?? '0 17 14 2 *'}`);
    // delete the recurring job
    this.schedulerRegistry.deleteCronJob(
      'recommitment_follow_up_notifications',
    );
    this.logger.warn(`Job recommitment_follow_up_notifications deleted!`);

    // End Recommitment. If not in production, use test email and do not send emails to members
    process.env.ENV === 'production'
      ? await this.recommitmentService.handleEndRecommitment()
      : await this.recommitmentService.handleEndRecommitment(
          true,
          process.env.TEST_EMAIL,
        );
  }

  /**
   * Check the status of all jobs in the scheduler registry
   * Runs once daily at 8am
   */
  @Cron('0 8 * * *', {
    name: 'verify_daily_jobs',
    timeZone: 'America/Vancouver',
  })
  async verifyDailyJobs() {
    this.logger.warn(`This job runs once daiy at 8am`);

    this.logger.warn(`All jobs in the scheduler registry:`);
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key) => {
      let next: unknown;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        this.logger.error(`Error: ${e}`);
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
}
