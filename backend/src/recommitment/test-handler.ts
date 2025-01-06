import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CronTestService } from './cron-test.service';
import { RecommitmentModule } from './recommitment.module';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppLogger } from '../logger/logger.service';

export const handler = async (
  email: string,
  schedule = '* * * * *',
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
  await cronTestService.scheduleTestCron(email, schedule, dryRun);

  
};
