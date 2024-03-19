import { LoggerService } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const globalLoggerFormat: winston.Logform.Format = winston.format.timestamp({
  format: 'YYYY-MM-DD hh:mm:ss.SSS',
});

const localLoggerFormat: winston.Logform.Format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.align(),
  utilities.format.nestLike('API', { prettyPrint: true, colors: true }),
);

export const customLogger: LoggerService = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({ level: 'silly' }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'logs-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'errors-%DATE%.log',
      datePattern: 'YYYY-MM',
      zippedArchive: true,
    }),
  ],
  format: winston.format.combine(globalLoggerFormat, localLoggerFormat),
  exitOnError: false,
});
