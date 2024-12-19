import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BcwsModule } from './bcws/bcws.module';
import { DatabaseModule } from './database/database.module';
import { EmcrModule } from './emcr/emcr.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { FormModule } from './form/form.module';
import { LoggerModule } from './logger/logger.module';
import { MailModule } from './mail/mail.module';
import { PersonnelModule } from './personnel/personnel.module';
import { RegionsAndLocationsModule } from './region-location/region-location.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MailModule,
    DatabaseModule,
    LoggerModule,
    TerminusModule,
    AuthModule,
    PersonnelModule,
    BcwsModule,
    EmcrModule,
    FormModule,
    RegionsAndLocationsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
