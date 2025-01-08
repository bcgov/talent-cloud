import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { AppModule } from '../app.module';
import { AppLogger } from '../logger/logger.service';
import { RecommitmentService } from '../recommitment/recommitment.service';

export const startRecommitment = async (testEmail: string) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = new AppLogger();
  app.useLogger(logger);

  app.useStaticAssets(join(__dirname, '..', 'views'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  nunjucks.configure(join(__dirname, '..', 'views'), {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: process.env.NODE_ENV === 'local' ? true : false,
    express: app,
  });

  app.engine('njk', nunjucks.render);
  app.set('view cache', true);
  app.setViewEngine('njk');

  const recommitmentService = app.get(RecommitmentService);
  const recommitment_cycle = await recommitmentService.checkRecommitmentPeriod()
  const today = new Date()
  
  if (today < recommitment_cycle.endDate || today > recommitment_cycle.startDate) {
    testEmail
    ? await recommitmentService.handleSendAutomatedReminders(true, testEmail)
    : await recommitmentService.handleSendAutomatedReminders();
  } else {
    logger.warn('Not in recommitment period')
  }
};
