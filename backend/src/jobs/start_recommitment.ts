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

  const startDate = new Date(datePST(new Date()));

  await recommitmentCycleRepository.save(
    recommitmentCycleRepository.create(
      new RecommitmentCycleEntity(
        startDate,
        new Date(process.env.END_DATE),
        new Date().getFullYear(),
      ),
    ),
  );
  const recommitmentService = app.get(RecommitmentService);
  const testEmails = process.env.TEST_EMAILS.split(',');
  
  if (process.env.ENV !== 'production') {
    const data = await recommitmentService.handleStartRecommitment(
      true,
      testEmails,
    );
    logger.log(JSON.stringify(data));
    logger.log('Recommitment job completed', 'Recommitment');
  } else {
    const data = await recommitmentService.handleStartRecommitment();
    logger.log(JSON.stringify(data));
    logger.log('Recommitment job completed', 'Recommitment');
  }

  return app.close();
};

handler();
