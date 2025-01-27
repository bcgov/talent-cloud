import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module';
import { AppLogger } from '../logger/logger.service';
import { MailService } from '../mail/mail.service';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = new AppLogger();

  try {
    const mailService = app.get(MailService);
    const mail = await mailService.checkMailStatus();
    logger.log(
      `Number of emails not marked as completed: ${mail.length}`,
      'Mail Status',
    );
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
