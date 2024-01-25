import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { FunctionModule } from './function/function.module';
import { LoggerModule } from './logger/logger.module';
import { PersonnelModule } from './personnel/personnel.module';

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
    HttpModule,
    AuthModule,
    PersonnelModule,
    FunctionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
