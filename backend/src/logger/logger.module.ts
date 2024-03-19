import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { AppLogger } from './logger.service';
import 'winston-daily-rotate-file';

@Module({
  imports: [WinstonModule.forRoot({
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile({
        level: 'debug',
        filename: 'logs-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
      }),
      new transports.DailyRotateFile({
        level: 'error',
        filename: 'errors-%DATE%.log',
        datePattern: 'YYYY-MM',
        zippedArchive: true,
      }),
    ]
  })],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
