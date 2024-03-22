import { LoggerService } from '@nestjs/common';
import { Logger, createLogger } from 'winston';
import { loggerConfig } from './logger.config';

export class AppLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger(loggerConfig);
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  fatal(message: string) {
    this.logger.log('fatal', message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
