import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Documentation } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT ?? '8081');
  const logger = new Logger('NestApplication');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalGuards(new AuthGuard(reflector), new RolesGuard(reflector));

  Documentation(app);

  await app.listen(port);
  logger.log(`listening on port ${port}`);
}

bootstrap();
