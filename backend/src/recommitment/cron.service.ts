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
   * Initial Job Scheduled
   */
  @Cron(`0 0 13 1 *`, {
    name: 'initial_recommitment',
    timeZone: 'America/Vancouver',
  })
  async initialRecommitment() {
    const recurringNotificationsJob = new CronJob('0 0 * * 1', async () => {
      await this.recommitmentService.handleSendAutomatedReminders();
    });

    this.schedulerRegistry.addCronJob(
      'recommitment_follow_up_notifications',
      recurringNotificationsJob,
    );
    this.logger.warn(`Automated reminders scheduled to run every monday`);

    const endRecommitmentJob = new CronJob(`0 0 14 2 *`, async () => {
      this.schedulerRegistry.deleteCronJob(
        'recommitment_follow_up_notifications',
      );
      this.logger.warn(`Job recommitment_follow_up_notifications deleted!`);
      this.schedulerRegistry.deleteCronJob('initial_recommitment');
      this.logger.warn(`Job initial_recommitment deleted!`);

      await this.recommitmentService.handleEndRecommitment();

      this.schedulerRegistry.deleteCronJob('end_recommitment');
    });

    this.schedulerRegistry.addCronJob('end_recommitment', endRecommitmentJob);
    this.logger.warn(`End Recommitment Job scheduled to run on Feb 14th`);
    recurringNotificationsJob.start();
    endRecommitmentJob.start();
  }
}
