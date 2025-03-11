import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '../database/database.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { RegionsAndLocationsModule } from '../region-location/region-location.module';
import { AuditModule } from '../audit/audit.module';
import { LoggerModule } from '../logger/logger.module';
import { MailModule } from '../mail/mail.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    DatabaseModule,
    PersonnelModule,
    RegionsAndLocationsModule,
    AuditModule,
    LoggerModule,
    MailModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
  ],
})
export class ChipsAppModule {}
