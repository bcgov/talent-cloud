import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class CronTestService {
  private week: number = 0;

  constructor(
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    private readonly logger: AppLogger,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.setContext(CronTestService.name);
  }

  /**
   * Schedules a test cron job to run based on the provided schedule.
   * @param {string} testEmail - The email address to send test emails to.
   * @param {string} schedule - The cron schedule string.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @returns {Promise<void>}
   */
  async scheduleTestCron(
    testEmail: string,
    schedule: string,
    dryRun: boolean,
  ): Promise<void> {
    const job = new CronJob(schedule, async () => {
      this.logger.warn(`Time for job ${this.week} to run!`);
      await this.handleCronJob(testEmail, dryRun);
    });

    this.schedulerRegistry.addCronJob('testCron', job);
    this.logger.warn(`Test Cron scheduled to run based on the provided schedule!`);
    job.start();
  }

  /**
   * Handles the execution of the cron job based on the current week.
   * @param {string} testEmail - The email address to send test emails to.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @returns {Promise<void>}
   */
  private async handleCronJob(testEmail: string, dryRun: boolean): Promise<void> {
    switch (this.week) {
      case 0:
        this.logger.log('2nd Monday in Jan - initializing recommitment cycle');
        await this.recommitmentService.handleStartRecommitment(dryRun, testEmail);
        break;
      case 1:
        this.logger.log('3rd Monday in Jan - sending reminder emails!');
        await this.recommitmentService.handleSendAutomatedReminders(dryRun, testEmail);
        break;
      case 2:
        this.logger.log('2nd Monday in Feb - sending reminder emails!');
        await this.recommitmentService.handleSendAutomatedReminders(dryRun, testEmail);
        break;
      case 3:
        this.logger.log('3rd Monday in Feb - sending reminder emails!');
        await this.recommitmentService.handleSendAutomatedReminders(dryRun, testEmail);
        break;
      case 4:
        this.logger.log('3rd Friday in Feb - End Recommitment - Sending Final Emails!');
        await this.recommitmentService.handleEndRecommitment(dryRun, testEmail);
        this.cancelTestCron();
        return;
    }
    this.week++;
  }

  /**
   * Cancels the test cron job.
   */
  cancelTestCron(): void {
    this.schedulerRegistry.deleteCronJob('testCron');
    this.logger.warn(`Job testCron deleted!`);
  }
}
