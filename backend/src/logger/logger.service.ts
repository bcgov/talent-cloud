import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { customLogger } from '../common/logger.config';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private logger;
  private context = 'LOG';

  setContext(context: string) {
    this.context = context;
  }

  constructor() {
    this.logger = customLogger;
  }

  /*eslint-disable @typescript-eslint/no-explicit-any*/
  log(message: unknown, context?: any) {
    this.logger.log(message, context ?? this.context);
  }

  error(message: unknown, context?: any) {
    this.logger.error(message, context ?? this.context);
  }

  warn(message: unknown, context?: string) {
    this.logger.warn(message, context ?? this.context);
  }
}
