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

    const testEmails = process.env?.TEST_EMAIL?.split(',') || undefined;
    const viewsPath = process.env?.VIEWS_PATH || 'views';

    const testRun = process.env?.TEST_RUN === 'true' || false;

    logger.log(`Views path: ${viewsPath}`, 'End Recommitment');

    logger.log(`Test run: ${testRun}`, 'End Recommitment');
    logger.log(`Test Emails: ${testEmails}`, 'End Recommitment');

    app.useStaticAssets(join(__dirname, '..', viewsPath));
    app.setBaseViewsDir(join(__dirname, '..', viewsPath));
    nunjucks.configure(join(__dirname, '..', viewsPath), {
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

    return await recommitmentService.handleEndRecommitment(testRun, testEmails);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
})();
