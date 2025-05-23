import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';
import { BcwsModule } from './bcws/bcws.module';
import { DatabaseModule } from './database/database.module';
import { EmcrModule } from './emcr/emcr.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggerModule } from './logger/logger.module';
import { MailModule } from './mail/mail.module';
import { PersonnelModule } from './personnel/personnel.module';
import { RecommitmentModule } from './recommitment/recommitment.module';
import { RegionsAndLocationsModule } from './region-location/region-location.module';
import { IntakeFormModule } from './intake-form/intake-form.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    RegionsAndLocationsModule,
    RecommitmentModule,
    AuditModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    IntakeFormModule,
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
