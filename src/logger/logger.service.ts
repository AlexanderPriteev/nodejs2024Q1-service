import { LoggerService } from '@nestjs/common';

export class AppLogger implements LoggerService {
  log(message: any) {
    console.log('log ' + message);
  }

  fatal(message: any) {
    console.log('fatal ' + message);
  }

  error(message: any) {
    console.log('error ' + message);
  }

  warn(message: any) {
    console.log('warn ' + message);
  }
}
