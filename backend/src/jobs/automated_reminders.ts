import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { AppModule } from '../app.module';
import { AppLogger } from '../logger/logger.service';
import { RecommitmentService } from '../recommitment/recommitment.service';
import { datePST } from '../common/helpers';

export const handler = async () => {
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
    noCache: true,
    express: app,
  });

  app.engine('njk', nunjucks.render);
  app.set('view cache', true);
  app.setViewEngine('njk');

  const recommitmentService = app.get(RecommitmentService);
  const recommitment_cycle =
    await recommitmentService.checkRecommitmentPeriod();

  const today = datePST(new Date())

  logger.log(`Automated Reminders Job: ${today}`, 'Recommitment');

  if (
    today < recommitment_cycle.endDate ||
    today > recommitment_cycle.startDate
  ) {
    if (process.env.ENV !== 'production') {
      
      const testEmails = process.env.TEST_EMAIL.split(',');
      
      if(!testEmails) {
        logger.error('No test emails found', 'Recommitment');
        return await app.close();
      }
      
      const data = await recommitmentService.handleSendAutomatedReminders(
        true,
        testEmails,
      );

      logger.log('Supervisor TEST emails:', 'Recommitment');
      logger.log(`TxId: ${data.supervisor.txId}`, 'Recommitment');
      
      data.supervisor?.messages?.forEach((supervisor) => {
        logger.log(`Supervisor: ${supervisor.to}`, 'Recommitment');
      });

      logger.log('Member TEST emails:', 'Recommitment');
      logger.log(`TxId: ${data.member.txId}`, 'Recommitment');
      
      data.member?.messages?.forEach((member) => {
        logger.log(`Member: ${member.to}`, 'Recommitment');
      });
      
      logger.log('Automated Reminder job completed', 'Recommitment');
    
      return await app.close();

    } else {
    
      const data = await recommitmentService.handleSendAutomatedReminders();
    
      logger.log(
        `Supervisor emails sent: ${data.supervisor.messages.length}`,
        'Recommitment',
      );
    
      logger.log(`TxId: ${data.supervisor.txId}`, 'Recommitment');

      logger.log(
        `Member emails sent: ${data.member.messages.length}`,
        'Recommitment',
      );
    
      logger.log(`TxId: ${data.member.txId}`, 'Recommitment');
    
      logger.log('Automated Reminder job completed', 'Recommitment');
    
      return await app.close();
    }
  } else {
    
    logger.warn('Not in recommitment period');
    
    return await app.close();
  }
};

handler();
