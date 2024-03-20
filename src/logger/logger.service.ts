import { LoggerService } from '@nestjs/common';

export class AppLogger implements LoggerService {
  private _colorReset = '\u001b[0m';
  private _colorError = '\u001b[31m';
  private _colorWarn = '\u001b[33m';
  private _colorLog = '\u001b[38;5;246m';

  log(message: string, isQuery?: boolean) {
    console.log(`${this._colorLog}LOG:${this._colorReset} ${message}`);
  }

  error(message: string) {
    console.log(`${this._colorError}ERROR:${this._colorReset} ${message}`);
  }

  fatal(message: string) {
    console.log(this._colorError + message + this._colorReset);
  }

  warn(message: string) {
    console.log(this._colorWarn + message + this._colorReset);
  }
}
