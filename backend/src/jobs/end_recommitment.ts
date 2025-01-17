import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { AppModule } from '../app.module';
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
    const recommitment_cycle =
      await recommitmentService.checkRecommitmentPeriod();
    if (!datasource.isInitialized) {
      await datasource.initialize();
    }
    const recommitmentCycleRepository = datasource.getRepository(
      RecommitmentCycleEntity,
    );

    await recommitmentCycleRepository.update(
      { year: recommitment_cycle.year },
      { endDate: datePST(new Date()) },
    );

    if (process.env.TEST_RUN === 'true') {
      await testRun(recommitmentService);
      return await app.close();
    } else {
      const data = await recommitmentService.handleEndRecommitment();

      logger.log(
        `Supervisor emails sent: ${data.supervisor?.messages?.length}`,
        'Recommitment',
      );

      logger.log(`TxId: ${data?.supervisor?.txId}`, 'Recommitment');

      logger.log(
        `Member emails sent: ${data.member?.messages?.length}`,
        'Recommitment',
      );

      logger.log(`TxId: ${data.member?.txId}`, 'Recommitment');

      logger.log('Recommitment job completed', 'Recommitment');

      return await app.close();
    }
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
})();

const testRun = async (recommitmentService: RecommitmentService) => {
  const logger = new AppLogger();
  const testEmails = process.env?.TEST_EMAIL?.split(',');

  if (!testEmails) {
    logger.error('No test emails found', 'Recommitment');

    return;
  }

  logger.log(testEmails, 'Recommitment');

  const data = await recommitmentService.handleEndRecommitment(
    true,
    testEmails,
  );

  logger.log('Supervisor TEST emails:', 'Recommitment');
  logger.log(`TxId: ${data?.supervisor?.txId}`, 'Recommitment');

  data.supervisor?.messages?.forEach((supervisor) => {
    logger.log(`Supervisor: ${supervisor?.to}`, 'Recommitment');
  });

  logger.log('Member TEST emails:', 'Recommitment');
  logger.log(`TxId: ${data?.member?.txId}`, 'Recommitment');

  data.member?.messages?.forEach((member) => {
    logger.log(`Member: ${member?.to}`, 'Recommitment');
  });

  logger.log('Recommitment job completed', 'Recommitment');
};
