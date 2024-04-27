import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BcwsModule } from './bcws/bcws.module';
import { DatabaseModule } from './database/database.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { FormModule } from './form/form.module';
import { FunctionModule } from './function/function.module';
import { LoggerModule } from './logger/logger.module';
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
    DatabaseModule,
    LoggerModule,
    TerminusModule,
    AuthModule,
    PersonnelModule,
    FunctionModule,
    FormModule,
    RegionsAndLocationsModule,
    BcwsModule,
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
