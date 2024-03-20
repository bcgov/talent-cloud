import { LoggerService } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const globalLoggerFormat: winston.Logform.Format = winston.format.timestamp({
  format: 'YYYY-MM-DD hh:mm:ss.SSS',
});

const localLoggerFormat: winston.Logform.Format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.align(),
  utilities.format.nestLike('API', { prettyPrint: true, colors: true }),
);

export const customLogger: LoggerService = WinstonModule.createLogger({
  transports: [new winston.transports.Console({ level: 'info' })],
  format: winston.format.combine(globalLoggerFormat, localLoggerFormat),
  exitOnError: false,
});
