import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [DatabaseModule, LoggerModule, TerminusModule, HttpModule],
  controllers: [AppController],
})
export class AppModule {}
