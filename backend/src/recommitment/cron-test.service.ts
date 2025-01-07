import { Inject, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';
import { format } from 'date-fns';

@Injectable()
export class CronTestService {
  constructor(
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    private readonly logger: AppLogger,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.setContext(CronTestService.name);
  }

  @Cron('0 8 * * *', {
    name: 'verify_daily_jobs',
    timeZone: 'America/Vancouver',
  })
  verifyJobs() {
    this.logger.warn(`This job runs once daily at 8am`);

    this.logger.warn(`All jobs in the scheduler registry:`);
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }

  @Cron('0 5 * * *', {
    name: 'verify_daily_jobs',
    timeZone: 'America/Vancouver',
  })
  testRecommitmentDaily() {
    this.logger.warn(
      `This job runs once daily at 5am in the test and dev envs only`,
    );
    if (process.env.MODE === 'test' || process.env.MODE === 'dev') {
      const startRecommitmentJob = new CronJob(`0 6 * 1 *`, async () => {
        this.logger.warn(
          `Initializing Recommitment Job Scheduled for ${format(
            new Date().getMonth() + 1,
            'LLLL',
          )} ${new Date().getDate()} at ${new Date().getHours()}:00`,
        );
        await this.recommitmentService.handleStartRecommitment(
          true,
          process.env.TEST_EMAIL,
        );
      });

      this.schedulerRegistry.addCronJob(
        'initialize_recommitment',
        startRecommitmentJob,
      );

      this.logger.warn(
        `Scheduled TEST Recommitment for: ${format(
          new Date().getMonth() + 1,
          'LLLL',
        )} ${new Date().getDate()} at ${new Date().getHours()}:00`,
      );

      const recurringNotificationsJob = new CronJob('0 * * * *', async () => {
        await this.recommitmentService.handleSendAutomatedReminders(
          true,
          process.env.TEST_EMAIL,
        );
      });

      this.schedulerRegistry.addCronJob(
        'recommitment_follow_up_notifications',
        recurringNotificationsJob,
      );
      this.logger.warn(`Automated reminders scheduled to run once per hour`);

      const endRecommitmentJob = new CronJob(
        `0 11 ${new Date().getDate} 1 *`,
        async () => {
          this.schedulerRegistry.deleteCronJob(
            'recommitment_follow_up_notifications',
          );
          this.logger.warn(`Job recommitment_follow_up_notifications deleted!`);

          this.schedulerRegistry.deleteCronJob('initialize_recommitment');
          this.logger.warn(`Job initialize_recommitment deleted!`);

          await this.recommitmentService.handleEndRecommitment(
            true,
            process.env.TEST_EMAIL,
          );
          this.schedulerRegistry.deleteCronJob('end_recommitment');
          this.logger.warn(`Job end_recommitment deleted!`);
        },
      );

      this.schedulerRegistry.addCronJob('end_recommitment', endRecommitmentJob);
      this.logger.warn(
        `End Recommitment Job scheduled to run on ${format(
          new Date().getMonth() + 1,
          'LLLL',
        )} ${new Date().getDate()} at ${new Date().getHours()}:00`,
      );
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
