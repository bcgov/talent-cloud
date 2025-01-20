import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { AppModule } from '../app.module';
import { recommitmentCycleHandler } from './seed-recommitment';
import { datePST } from '../common/helpers';
import { datasource } from '../database/datasource';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { AppLogger } from '../logger/logger.service';

import { RecommitmentService } from '../recommitment/recommitment.service';

(async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      rawBody: true,
      bufferLogs: true,
    });

    const logger = new AppLogger();

    const recommitmentService = app.get(RecommitmentService);

    const viewsPath =
      process.env.ENV === 'prod' || process.env.ENV === 'test'
        ? 'views'
        : 'views/test';

    app.useStaticAssets(join(__dirname, '..', viewsPath));
    app.setBaseViewsDir(join(__dirname, '..', viewsPath));
    nunjucks.configure(join(__dirname, '..', viewsPath), {
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

    if (process.env.TEST_RUN === 'true') {
      await recommitmentCycleHandler();
      await testRun(recommitmentService, datasource);
      await app.close();
    } else {
      logger.log('Starting recommitment job', 'Recommitment');
      const data = await recommitmentService.handleStartRecommitment();
      logger.log(
        `Supervisor emails sent: ${data?.supervisor?.messages?.length}`,
        'Recommitment',
      );
      logger.log(`TxId: ${data?.supervisor?.txId}`, 'Recommitment');

      logger.log(
        `Member emails sent: ${data?.member?.messages?.length}`,
        'Recommitment',
      );
      logger.log(`TxId: ${data?.member?.txId}`, 'Recommitment');
      logger.log('Recommitment job completed', 'Recommitment');
      return await app.close();
    }
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
})();

const testRun = async (
  recommitmentService: RecommitmentService,
  datasource: DataSource,
) => {
  const logger = new AppLogger();
  logger.log('Starting recommitment job' + process.env.ENV, 'Recommitment');

  const recommitmentCycleRepository = datasource.getRepository(
    RecommitmentCycleEntity,
  );
  const startDate = datePST(new Date());

  const endDateSplit = process.env?.END_RECOMMITMENT_SCHEDULE?.split(' ');
  const endHour = endDateSplit[1];
  const endDateTest = endDateSplit[2];
  const endMonth = endDateSplit[3];
  const endMinute = endDateSplit[0];

  const endDate = new Date(
    startDate.getFullYear(),
    parseInt(endMonth) - 1,
    parseInt(endDateTest),
    parseInt(endHour),
    parseInt(endMinute),
    0,
  );

  logger.log(startDate, 'START DATE - TEST');
  logger.log(endDate, 'END DATE - TEST');
  await recommitmentCycleRepository.save(
    recommitmentCycleRepository.create(
      new RecommitmentCycleEntity(startDate, endDate, new Date().getFullYear()),
    ),
  );

  const testEmails = process.env.TEST_EMAIL.split(',');
  if (!testEmails) {
    logger.error('No test emails found', 'Recommitment');
  }
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
};
