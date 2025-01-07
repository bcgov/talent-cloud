import { Inject, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';
import { format } from 'date-fns';
import { start } from 'repl';

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

  

  @Cron(`* * * * *`, {
    name: 'initial_recommitment',
    timeZone: 'America/Vancouver',
  })
  testCron() { 
    this.logger.warn(`Test Cron Job is running every minute!`);

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

  /**
   * Schedules a test cron job to run based on the provided schedule.
   * @param {string} testEmail - The email address to send test emails to.
   * @param {string} schedule - The cron schedule string.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @returns {Promise<void>}
   */
  initiateRecommitment(
    testEmail: string,
    schedule: string,
    dryRun: boolean,
    endDate: number,
    endHour: number,
    endMonth: number,
    startDate: number,
    startHour: number,
    startMonth: number,
  ): void {
    
    const startRecommitmentJob = new CronJob(`0 ${endHour} ${endDate} ${endMonth} *`, async () => {
      this.logger.warn(
        `Initializing Recommitment Job Scheduled for ${format(startMonth, 'LLLL')} ${startDate} at ${startHour}:00`,
      );
      await this.recommitmentService.handleStartRecommitment(
        dryRun,
        testEmail,
      );
    })

    this.schedulerRegistry.addCronJob(
      'initialize_recommitment',
      startRecommitmentJob,
    );

    this.logger.warn(`Initial Recommitment Job Scheduled to Run: ${schedule}`);    

    const recurringNotificationsJob = new CronJob(schedule, async () => {
      await this.recommitmentService.handleSendAutomatedReminders(
        dryRun,
        testEmail,
      );
    });

    this.schedulerRegistry.addCronJob(
      'recommitment_follow_up_notifications',
      recurringNotificationsJob,
    );
    this.logger.warn(`Automated reminders scheduled to run: ${schedule}`);

    const endRecommitmentJob = new CronJob(
      `0 ${endHour} ${endDate} ${endMonth} *`,
      async () => {
        this.schedulerRegistry.deleteCronJob(
          'recommitment_follow_up_notifications',
        );
        this.schedulerRegistry.deleteCronJob('initialize_recommitment');
        this.logger.warn(`Job recommitment_follow_up_notifications deleted!`);
        await this.recommitmentService.handleEndRecommitment(dryRun, testEmail);
        this.schedulerRegistry.deleteCronJob('end_recommitment');
      },
    );

    this.schedulerRegistry.addCronJob('end_recommitment', endRecommitmentJob);
    this.logger.warn(
      `End Recommitment Job scheduled to run on ${format(endMonth, 'LLLL')} ${endDate} at ${endHour}:00`,
    );
  }

  /**
   * Cancels the test cron job.
   */
  cancelTestCron(): void {
    this.schedulerRegistry.deleteCronJob('testCron');
    this.logger.warn(`Job testCron deleted!`);
  }
}
