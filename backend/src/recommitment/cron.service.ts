import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getWeekOfMonth } from 'date-fns';
import { RecommitmentService } from './recommitment.service';
import { AppLogger } from '../logger/logger.service';

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
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CronService.name);
  }

  /**
   * Cron job that runs every Monday in January.
   */
  @Cron(RecommitmentCron.EVERY_MONDAY_OF_JAN, {
    name: 'januaryMondayCron',
  })
  async januaryMondayCron() {
    const week = getWeekOfMonth(new Date());
    await this.handleJanuaryCron(week);
  }

  /**
   * Handles the cron job logic for January based on the week of the month.
   * @param {number} week - The week of the month.
   */
  private async handleJanuaryCron(week: number): Promise<void> {
    if (week === 2) {
      this.logger.log('2nd Monday in Jan - initializing recommitment cycle');
      await this.recommitmentService.handleStartRecommitment();
    } else if (week === 3) {
      this.logger.log('3rd Monday in Jan - sending reminder');
      await this.recommitmentService.handleSendAutomatedReminders();
    }
  }

  /**
   * Cron job that runs every Monday in February.
   */
  @Cron(RecommitmentCron.EVERY_MONDAY_OF_FEB, {
    name: 'februaryMondayCron',
  })
  async februaryMondayCron() {
    const week = getWeekOfMonth(new Date());
    await this.handleFebruaryMondayCron(week);
  }

  /**
   * Handles the cron job logic for Mondays in February based on the week of the month.
   * @param {number} week - The week of the month.
   */
  private async handleFebruaryMondayCron(week: number): Promise<void> {
    if (week === 2) {
      this.logger.log('2nd Monday in Feb - sending reminder');
      await this.recommitmentService.handleSendAutomatedReminders();
    } else if (week === 3) {
      this.logger.log('3rd Monday in Feb - sending reminder');
      await this.recommitmentService.handleSendAutomatedReminders();
    }
  }

  /**
   * Cron job that runs every Friday in February.
   */
  @Cron(RecommitmentCron.EVERY_FRIDAY_OF_FEB, {
    name: 'februaryFridayCron',
  })
  async februaryFridayCron() {
    const week = getWeekOfMonth(new Date());
    await this.handleFebruaryFridayCron(week);
  }

  /**
   * Handles the cron job logic for Fridays in February based on the week of the month.
   * @param {number} week - The week of the month.
   */
  private async handleFebruaryFridayCron(week: number): Promise<void> {
    if (week === 3) {
      this.logger.log('3rd Friday in Feb - end recommitment cycle');
      await this.recommitmentService.handleEndRecommitment();
    }
  }
}
