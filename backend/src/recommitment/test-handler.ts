import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CronTestService } from './cron-test.service';
import { RecommitmentModule } from './recommitment.module';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppLogger } from '../logger/logger.service';
import { datePST } from '../common/helpers';

export const handler = async (
  email: string,
  schedule = '0 * * * *',
  hours = 5,
  dryRun = true,
) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new AppLogger();
  app.useLogger(logger);

  logger.setContext('RecommitmentTestHandler');
  logger.log('Starting recommitment test cron job');
  logger.log(`Email: ${email}`);
  logger.log(`Schedule: ${schedule}`);
  logger.log(`Dry Run: ${dryRun}`);

  app.useStaticAssets(join(__dirname, 'mail', 'views'));
  nunjucks.configure('src/mail/views', {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: process.env.NODE_ENV === 'local' ? true : false,
    express: app,
  });

  app.engine('njk', nunjucks.render);
  app.setViewEngine('njk');
  app.set('view cache', true);

  const cronTestService = app.select(RecommitmentModule).get(CronTestService);

  const today = datePST(new Date());

  const startDate = today.getDate();
  const startHour = today.getHours();
  const startMonth = today.getMonth() + 1;
  const finalHour = startHour + hours;
  const endDate = today.getDate();
  const endHour = finalHour > 24 ? finalHour - 24 : finalHour;
  const endMonth = today.getMonth() + 1;

  await cronTestService.initiateRecommitment(
    email,
    schedule,
    dryRun,
    endDate,
    endHour,
    endMonth,
    startDate,
    startHour,
    startMonth,
  );
};
