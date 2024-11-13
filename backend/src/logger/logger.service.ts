import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  private logger;
  context = 'LOG';

  setContext(context: string) {
    this.context = context;
  }

  // constructor() {
  //   this.logger = customLogger;
  // }
  debug(message: unknown, context?: string) {
    this.logger.debug(message, context ?? this.context);
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
