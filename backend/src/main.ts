import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { AppModule } from './app.module';
import { AppLogger } from './logger/logger.service';
import { Documentation } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });
  const logger = new AppLogger();
  app.useLogger(logger);

  const port = parseInt(process.env.PORT ?? '3000');

  app.use(helmet());
  app.enableCors();
  app.set('trust proxy', 1);
  app.enableShutdownHooks();
  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const viewsPath =
    process.env.ENV === 'production' || process.env.ENV === 'test'
      ? 'views'
      : 'views/test';
  app.useStaticAssets(join(__dirname, viewsPath));
  app.setBaseViewsDir(join(__dirname, viewsPath));
  nunjucks.configure(join(__dirname, viewsPath), {
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

  Documentation(app);

  await app.listen(port);
  logger.log(`Server running on PORT ${port}`, 'Bootstrap');
}

bootstrap();
