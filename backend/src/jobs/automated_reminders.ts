import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { AppModule } from '../app.module';
import { datePST } from '../common/helpers';
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
    const viewsPath = process.env.VIEWS;
    const ministry = process.env.RECOMMITMENT_MINISTRY || undefined;
    const testRun = process.env.TEST_RUN === 'true';

    logger.log(`Views path: ${viewsPath}`, 'Start Recommitment');
    logger.log(`Recommiting for ministry ${ministry}`, 'Start Recommitment');
    logger.log(`Test run: ${testRun}`, 'Start Recommitment');
    logger.log(`Test Emails: ${testEmails}`, 'Start Recommitment');

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

    const today = datePST(new Date());
    const recommitment_cycle =
      await recommitmentService.checkRecommitmentPeriod();
    if (
      today < recommitment_cycle.endDate &&
      today > recommitment_cycle.startDate
    ) {
      await recommitmentService.handleSendAutomatedReminders(
        testRun,
        testEmails,
        ministry,
      );
      logger.log('Job completed', 'Automated Reminder');
      return;
    } else {
      logger.log('Not in recommitment period', 'Automated Recommitment');
      return;
    }
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
})();
