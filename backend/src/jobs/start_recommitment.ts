import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { AppModule } from '../app.module';
import { AppLogger } from '../logger/logger.service';
import { datasource } from '../database/datasource';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { datePST } from '../common/helpers';

import { RecommitmentService } from '../recommitment/recommitment.service';

export const handler = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = new AppLogger();
  app.useLogger(logger);
  logger.log('Starting recommitment job', 'Recommitment');
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

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const recommitmentCycleRepository = datasource.getRepository(
    RecommitmentCycleEntity,
  );

  const startDate = datePST(new Date());

  let endDate;
  if (process.env.ENV !== 'production') {
    const endDateSplit = process.env.END_RECOMMITMENT_SCHEDULE.replace(
      /"/g,
      '',
    ).split(' ');
    const endHour = endDateSplit[1];
    const endDateTest = endDateSplit[2];
    const endMonth = endDateSplit[3];
    const endMinute = endDateSplit[0];

    endDate = new Date(
      startDate.getFullYear(),
      parseInt(endMonth) - 1,
      parseInt(endDateTest),
      parseInt(endHour),
      parseInt(endMinute),
      0,
    );
    logger.log(startDate, 'START DATE - TEST');
    logger.log(endDate, 'END DATE - TEST');
  } else {
    const endDateSplit = process.env.END_RECOMMITMENT_SCHEDULE.replace(
      /"/g,
      '',
    ).split(' ');
    const endHour = endDateSplit[1];
    const endDateProd = endDateSplit[2];
    const endMonth = endDateSplit[3];
    const endMinute = endDateSplit[0];

    endDate = new Date(
      startDate.getFullYear(),
      parseInt(endMonth) - 1,
      parseInt(endDateProd),
      parseInt(endHour),
      parseInt(endMinute),
      0,
    );
    logger.log(startDate, 'START DATE - PROD');
    logger.log(endDate, 'END DATE - PROD');
  }
  await recommitmentCycleRepository.save(
    recommitmentCycleRepository.create(
      new RecommitmentCycleEntity(startDate, endDate, new Date().getFullYear()),
    ),
  );
  const recommitmentService = app.get(RecommitmentService);

  if (process.env.ENV !== 'production') {
    const testEmails = process.env.TEST_EMAIL.split(',');
    logger.log(testEmails, 'Recommitment');
    const data = await recommitmentService.handleStartRecommitment(
      true,
      testEmails,
    );
    logger.log('Supervisor TEST emails:');
    logger.log(`TxtId: ${data.supervisor.txId}`);

    data.supervisor?.messages?.forEach((supervisor) => {
      logger.log(`Supervisor: ${supervisor.to}`);
    });
    logger.log('Member TEST emails:');
    logger.log(`TxtId: ${data.member.txId}`);
    data.member?.messages?.forEach((member) => {
      logger.log(`Member: ${member.to}`);
    });
    logger.log('Recommitment job completed', 'Recommitment');
    return await app.close();
  } else {
    const data = await recommitmentService.handleStartRecommitment();
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
    logger.log('Recommitment job completed', 'Recommitment');
    return await app.close();
  }
};

handler();
