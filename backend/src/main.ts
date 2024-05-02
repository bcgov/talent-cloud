import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { TokenGuard } from './auth/token.guard';
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

  const reflector = app.get(Reflector);
  // first verify the user is logged in with idir, then update the request user object with the relevant program, then, if applicable, update the request user object with the relevant role (only EMCR uses this currently)
  app.useGlobalGuards(
    new AuthGuard(reflector, logger),
    new RolesGuard(reflector, logger),
    new TokenGuard(reflector, logger),
  );

  Documentation(app);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
